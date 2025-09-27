"""
Binance API service for trading and portfolio management.
"""
from typing import Dict, List, Optional, Any
from binance.client import Client
from binance.exceptions import BinanceAPIException
from app.core.config import settings


class BinanceService:
    """Binance API service wrapper."""
    
    def __init__(self):
        self.client: Optional[Client] = None
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize Binance client."""
        try:
            if settings.BINANCE_API_KEY and settings.BINANCE_SECRET_KEY:
                self.client = Client(
                    api_key=settings.BINANCE_API_KEY,
                    api_secret=settings.BINANCE_SECRET_KEY,
                    testnet=settings.BINANCE_TESTNET
                )
            else:
                # Use public client for data only
                self.client = Client(testnet=settings.BINANCE_TESTNET)
        except Exception as e:
            print(f"Binance client initialization error: {e}")
            self.client = None
    
    async def get_account_info(self) -> Optional[Dict[str, Any]]:
        """Get account information including balances."""
        if not self.client:
            return None
        
        try:
            account_info = self.client.get_account()
            return account_info
        except BinanceAPIException as e:
            print(f"Binance API error: {e}")
            return None
    
    async def get_portfolio_balances(self) -> List[Dict[str, Any]]:
        """Get portfolio balances."""
        account_info = await self.get_account_info()
        if not account_info:
            return []
        
        # Filter out zero balances and format for frontend
        balances = []
        for balance in account_info.get('balances', []):
            free = float(balance['free'])
            locked = float(balance['locked'])
            total = free + locked
            
            if total > 0:  # Only include non-zero balances
                balances.append({
                    'asset': balance['asset'],
                    'free': free,
                    'locked': locked,
                    'total': total,
                    'usdt_value': 0  # Will be calculated separately
                })
        
        return balances
    
    async def get_klines(self, symbol: str, interval: str, limit: int = 500) -> List[Dict[str, Any]]:
        """Get kline/candlestick data."""
        if not self.client:
            return []
        
        try:
            klines = self.client.get_klines(
                symbol=symbol,
                interval=interval,
                limit=limit
            )
            
            # Format klines for frontend
            formatted_klines = []
            for kline in klines:
                formatted_klines.append({
                    'open_time': kline[0],
                    'open': float(kline[1]),
                    'high': float(kline[2]),
                    'low': float(kline[3]),
                    'close': float(kline[4]),
                    'volume': float(kline[5]),
                    'close_time': kline[6],
                    'quote_asset_volume': float(kline[7]),
                    'number_of_trades': kline[8],
                    'taker_buy_base_asset_volume': float(kline[9]),
                    'taker_buy_quote_asset_volume': float(kline[10])
                })
            
            return formatted_klines
        except BinanceAPIException as e:
            print(f"Error getting klines: {e}")
            return []
    
    async def get_ticker_price(self, symbol: str) -> Optional[float]:
        """Get current price for a symbol."""
        if not self.client:
            return None
        
        try:
            ticker = self.client.get_symbol_ticker(symbol=symbol)
            return float(ticker['price'])
        except BinanceAPIException as e:
            print(f"Error getting ticker price: {e}")
            return None
    
    async def place_test_order(self, symbol: str, side: str, order_type: str, 
                             quantity: float, price: Optional[float] = None) -> Optional[Dict[str, Any]]:
        """Place a test order (testnet only)."""
        if not self.client or not settings.BINANCE_TESTNET:
            return None
        
        try:
            order_params = {
                'symbol': symbol,
                'side': side.upper(),
                'type': order_type.upper(),
                'quantity': quantity
            }
            
            if price and order_type.upper() == 'LIMIT':
                order_params['price'] = price
                order_params['timeInForce'] = 'GTC'
            
            order = self.client.create_test_order(**order_params)
            return order
        except BinanceAPIException as e:
            print(f"Error placing test order: {e}")
            return None
    
    async def get_recent_trades(self, symbol: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Get recent trades for a symbol."""
        if not self.client:
            return []
        
        try:
            trades = self.client.get_recent_trades(symbol=symbol, limit=limit)
            return trades
        except BinanceAPIException as e:
            print(f"Error getting recent trades: {e}")
            return []
    
    async def get_order_book(self, symbol: str, limit: int = 100) -> Optional[Dict[str, Any]]:
        """Get order book for a symbol."""
        if not self.client:
            return None
        
        try:
            order_book = self.client.get_order_book(symbol=symbol, limit=limit)
            return order_book
        except BinanceAPIException as e:
            print(f"Error getting order book: {e}")
            return None


# Global Binance service instance
binance_service = BinanceService()
