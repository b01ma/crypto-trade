"""
ML service for trading signal predictions.
"""
from typing import Dict, Optional, Any
import requests
from app.core.config import settings


class MLService:
    """ML service for trading predictions."""
    
    def __init__(self):
        self.base_url = settings.ML_SERVICE_URL
        self.model_version = settings.ML_MODEL_VERSION
    
    async def get_prediction(self, symbol: str, timeframe: str = "1m") -> Optional[Dict[str, Any]]:
        """Get ML prediction for a symbol."""
        if not self.base_url:
            # Return mock prediction if ML service URL is not configured
            return self._get_mock_prediction(symbol)
        
        try:
            url = f"{self.base_url}/predict"
            payload = {
                "symbol": symbol,
                "timeframe": timeframe,
                "model_version": self.model_version
            }
            
            response = requests.post(url, json=payload, timeout=30)
            response.raise_for_status()
            
            return response.json()
        except Exception as e:
            print(f"Error getting ML prediction: {e}")
            # Fallback to mock prediction
            return self._get_mock_prediction(symbol)
    
    def _get_mock_prediction(self, symbol: str) -> Dict[str, Any]:
        """Generate mock prediction for testing."""
        import random
        
        signals = ["BUY", "SELL", "HOLD"]
        signal = random.choice(signals)
        
        # Generate confidence based on signal
        if signal == "HOLD":
            confidence = random.uniform(0.5, 0.7)
        else:
            confidence = random.uniform(0.6, 0.9)
        
        return {
            "symbol": symbol,
            "signal": signal,
            "confidence": round(confidence, 3),
            "model_version": self.model_version,
            "timestamp": "2024-01-01T00:00:00Z",
            "is_mock": True
        }
    
    async def get_latest_signal(self, symbol: str = None) -> Optional[Dict[str, Any]]:
        """Get the latest trading signal."""
        if symbol:
            return await self.get_prediction(symbol)
        
        # If no symbol specified, get signal for BTCUSDT by default
        return await self.get_prediction("BTCUSDT")
    
    async def batch_predict(self, symbols: list, timeframe: str = "1m") -> Dict[str, Dict[str, Any]]:
        """Get predictions for multiple symbols."""
        predictions = {}
        
        for symbol in symbols:
            prediction = await self.get_prediction(symbol, timeframe)
            if prediction:
                predictions[symbol] = prediction
        
        return predictions
    
    async def get_model_info(self) -> Dict[str, Any]:
        """Get information about the ML model."""
        if not self.base_url:
            return {
                "model_version": self.model_version,
                "status": "mock",
                "description": "Mock ML service for testing"
            }
        
        try:
            url = f"{self.base_url}/model/info"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            return response.json()
        except Exception as e:
            print(f"Error getting model info: {e}")
            return {
                "model_version": self.model_version,
                "status": "error",
                "error": str(e)
            }


# Global ML service instance
ml_service = MLService()
