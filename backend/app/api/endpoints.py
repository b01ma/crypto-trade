"""
API endpoints for the crypto trading backend.
"""
from typing import Dict, List, Optional, Any
from fastapi import APIRouter, HTTPException, Query, Body
from pydantic import BaseModel
from datetime import datetime

from app.services.binance_service import binance_service
from app.services.firebase_service import firebase_service
from app.services.ml_service import ml_service

# Create router
router = APIRouter()


# Pydantic models for request/response
class TradeRequest(BaseModel):
    symbol: str
    side: str  # BUY or SELL
    order_type: str  # MARKET or LIMIT
    quantity: float
    price: Optional[float] = None


class SettingsRequest(BaseModel):
    user_id: str
    strategy_params: Dict[str, Any]


class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    services: Dict[str, str]


class KlineResponse(BaseModel):
    symbol: str
    interval: str
    klines: List[Dict[str, Any]]
    count: int
    last_updated: str


class SignalResponse(BaseModel):
    symbol: str
    signal: str
    confidence: float
    model_version: str
    timestamp: str


class PortfolioResponse(BaseModel):
    balances: List[Dict[str, Any]]
    total_value_usdt: float
    last_updated: str


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check if the backend is alive and services are working."""
    services_status = {
        "binance": "unknown",
        "firebase": "unknown",
        "ml_service": "unknown"
    }
    
    # Check Binance service
    try:
        account_info = await binance_service.get_account_info()
        services_status["binance"] = "connected" if account_info else "disconnected"
    except Exception:
        services_status["binance"] = "error"
    
    # Check Firebase service
    try:
        # Try to get a simple document
        test_doc = await firebase_service.db.get_document("health_check", "test")
        services_status["firebase"] = "connected"
    except Exception:
        services_status["firebase"] = "error"
    
    # Check ML service
    try:
        model_info = await ml_service.get_model_info()
        services_status["ml_service"] = "connected" if model_info else "disconnected"
    except Exception:
        services_status["ml_service"] = "error"
    
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0",
        services=services_status
    )


@router.get("/klines", response_model=KlineResponse)
async def get_klines(
    symbol: str = Query(..., description="Trading pair symbol (e.g., BTCUSDT)"),
    interval: str = Query("1m", description="Kline interval (1m, 5m, 15m, 1h, 4h, 1d)"),
    limit: int = Query(500, description="Number of klines to return (max 1000)")
):
    """Get kline/candlestick data from Firebase or Binance."""
    try:
        # First try to get from Firebase
        klines = await firebase_service.get_klines(symbol, interval, limit)
        
        # If no data in Firebase, fetch from Binance and save
        if not klines:
            klines = await binance_service.get_klines(symbol, interval, limit)
            if klines:
                # Save to Firebase for future use
                await firebase_service.save_klines(symbol, interval, klines)
        
        return KlineResponse(
            symbol=symbol,
            interval=interval,
            klines=klines,
            count=len(klines),
            last_updated=datetime.utcnow().isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching klines: {str(e)}")


@router.get("/signal/latest", response_model=SignalResponse)
async def get_latest_signal(
    symbol: str = Query("BTCUSDT", description="Trading pair symbol")
):
    """Get the latest ML prediction signal."""
    try:
        # First try to get from Firebase
        signal = await firebase_service.get_latest_signal(symbol)
        
        # If no signal in Firebase, get from ML service
        if not signal:
            prediction = await ml_service.get_latest_signal(symbol)
            if prediction:
                # Save to Firebase
                await firebase_service.save_ml_signal(
                    symbol=prediction["symbol"],
                    signal=prediction["signal"],
                    confidence=prediction["confidence"],
                    model_version=prediction.get("model_version", "v1.0")
                )
                signal = prediction
        
        if not signal:
            raise HTTPException(status_code=404, detail="No signal found")
        
        return SignalResponse(
            symbol=signal["symbol"],
            signal=signal["signal"],
            confidence=signal["confidence"],
            model_version=signal.get("model_version", "v1.0"),
            timestamp=signal.get("timestamp", datetime.utcnow().isoformat())
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching signal: {str(e)}")


@router.post("/trade/once")
async def trigger_trade(trade_request: TradeRequest):
    """Trigger a test trade on Binance testnet."""
    try:
        # Place test order
        order = await binance_service.place_test_order(
            symbol=trade_request.symbol,
            side=trade_request.side,
            order_type=trade_request.order_type,
            quantity=trade_request.quantity,
            price=trade_request.price
        )
        
        if not order:
            raise HTTPException(status_code=400, detail="Failed to place test order")
        
        # Save trade to Firebase
        trade_data = {
            "user_id": "test_user",  # In real app, get from auth
            "symbol": trade_request.symbol,
            "side": trade_request.side,
            "order_type": trade_request.order_type,
            "quantity": trade_request.quantity,
            "price": trade_request.price,
            "order_id": order.get("orderId"),
            "status": "test",
            "testnet": True
        }
        
        trade_id = await firebase_service.save_trade(trade_data)
        
        return {
            "success": True,
            "message": "Test trade executed successfully",
            "order": order,
            "trade_id": trade_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing trade: {str(e)}")


@router.get("/portfolio", response_model=PortfolioResponse)
async def get_portfolio():
    """Get portfolio balances from Binance API."""
    try:
        # Get balances from Binance
        balances = await binance_service.get_portfolio_balances()
        
        # Calculate USDT values for each balance
        total_value_usdt = 0
        for balance in balances:
            if balance['asset'] == 'USDT':
                balance['usdt_value'] = balance['total']
            else:
                # Get current price in USDT
                symbol = f"{balance['asset']}USDT"
                price = await binance_service.get_ticker_price(symbol)
                if price:
                    balance['usdt_value'] = balance['total'] * price
                else:
                    balance['usdt_value'] = 0
            
            total_value_usdt += balance['usdt_value']
        
        # Save portfolio snapshot to Firebase
        portfolio_data = {
            "balances": balances,
            "total_value_usdt": total_value_usdt
        }
        await firebase_service.save_portfolio_snapshot("test_user", portfolio_data)
        
        return PortfolioResponse(
            balances=balances,
            total_value_usdt=total_value_usdt,
            last_updated=datetime.utcnow().isoformat()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching portfolio: {str(e)}")


@router.post("/settings")
async def save_settings(settings_request: SettingsRequest):
    """Save strategy parameters to Firestore."""
    try:
        success = await firebase_service.save_strategy_settings(
            user_id=settings_request.user_id,
            settings=settings_request.strategy_params
        )
        
        if not success:
            raise HTTPException(status_code=500, detail="Failed to save settings")
        
        return {
            "success": True,
            "message": "Settings saved successfully",
            "user_id": settings_request.user_id,
            "timestamp": datetime.utcnow().isoformat()
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving settings: {str(e)}")


@router.get("/settings/{user_id}")
async def get_settings(user_id: str):
    """Get strategy parameters from Firestore."""
    try:
        settings = await firebase_service.get_strategy_settings(user_id)
        
        if not settings:
            raise HTTPException(status_code=404, detail="Settings not found")
        
        return {
            "success": True,
            "user_id": user_id,
            "settings": settings.get("settings", {}),
            "last_updated": settings.get("updated_at")
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching settings: {str(e)}")


# Additional utility endpoints
@router.get("/trades")
async def get_trades(
    user_id: str = Query("test_user", description="User ID"),
    limit: int = Query(50, description="Number of trades to return")
):
    """Get recent trades."""
    try:
        trades = await firebase_service.get_trades(user_id, limit)
        return {
            "success": True,
            "trades": trades,
            "count": len(trades)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching trades: {str(e)}")


@router.get("/orderbook/{symbol}")
async def get_orderbook(
    symbol: str,
    limit: int = Query(100, description="Number of orders to return")
):
    """Get order book for a symbol."""
    try:
        orderbook = await binance_service.get_order_book(symbol, limit)
        if not orderbook:
            raise HTTPException(status_code=404, detail="Order book not found")
        
        return {
            "success": True,
            "symbol": symbol,
            "orderbook": orderbook
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching order book: {str(e)}")
