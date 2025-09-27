"""
Firebase service for data storage and retrieval.
"""
from typing import Dict, List, Optional, Any
from datetime import datetime
from app.core.database import firebase_manager


class FirebaseService:
    """Firebase service for data operations."""
    
    def __init__(self):
        self.db = firebase_manager
    
    async def save_klines(self, symbol: str, interval: str, klines: List[Dict[str, Any]]) -> bool:
        """Save klines data to Firebase."""
        try:
            collection_name = f"klines_{symbol}_{interval}"
            data = {
                'symbol': symbol,
                'interval': interval,
                'klines': klines,
                'last_updated': datetime.utcnow().isoformat(),
                'count': len(klines)
            }
            
            # Save to Firebase with timestamp as document ID
            doc_id = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
            return await self.db.set_document(collection_name, doc_id, data)
        except Exception as e:
            print(f"Error saving klines: {e}")
            return False
    
    async def get_klines(self, symbol: str, interval: str, limit: int = 500) -> List[Dict[str, Any]]:
        """Get klines data from Firebase."""
        try:
            collection_name = f"klines_{symbol}_{interval}"
            docs = await self.db.get_collection_data(collection_name, limit=1)
            
            if docs:
                latest_doc = docs[0]
                klines = latest_doc.get('klines', [])
                return klines[-limit:] if len(klines) > limit else klines
            
            return []
        except Exception as e:
            print(f"Error getting klines: {e}")
            return []
    
    async def save_ml_signal(self, symbol: str, signal: str, confidence: float, 
                           model_version: str = "v1.0") -> bool:
        """Save ML prediction signal to Firebase."""
        try:
            data = {
                'symbol': symbol,
                'signal': signal.upper(),  # BUY, SELL, HOLD
                'confidence': confidence,
                'model_version': model_version,
                'timestamp': datetime.utcnow().isoformat(),
                'created_at': datetime.utcnow().isoformat()
            }
            
            # Save to signals collection
            doc_id = f"{symbol}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"
            return await self.db.set_document('ml_signals', doc_id, data)
        except Exception as e:
            print(f"Error saving ML signal: {e}")
            return False
    
    async def get_latest_signal(self, symbol: str = None) -> Optional[Dict[str, Any]]:
        """Get the latest ML signal."""
        try:
            collection_ref = self.db.get_collection('ml_signals')
            
            # Query for latest signal
            if symbol:
                query = collection_ref.where('symbol', '==', symbol).order_by('timestamp', direction='DESCENDING').limit(1)
            else:
                query = collection_ref.order_by('timestamp', direction='DESCENDING').limit(1)
            
            docs = query.stream()
            for doc in docs:
                return doc.to_dict()
            
            return None
        except Exception as e:
            print(f"Error getting latest signal: {e}")
            return None
    
    async def save_strategy_settings(self, user_id: str, settings: Dict[str, Any]) -> bool:
        """Save strategy parameters to Firebase."""
        try:
            data = {
                'user_id': user_id,
                'settings': settings,
                'updated_at': datetime.utcnow().isoformat()
            }
            
            return await self.db.set_document('strategy_settings', user_id, data)
        except Exception as e:
            print(f"Error saving strategy settings: {e}")
            return False
    
    async def get_strategy_settings(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get strategy parameters from Firebase."""
        try:
            return await self.db.get_document('strategy_settings', user_id)
        except Exception as e:
            print(f"Error getting strategy settings: {e}")
            return None
    
    async def save_trade(self, trade_data: Dict[str, Any]) -> Optional[str]:
        """Save trade data to Firebase."""
        try:
            trade_data['timestamp'] = datetime.utcnow().isoformat()
            trade_data['created_at'] = datetime.utcnow().isoformat()
            
            return await self.db.add_document('trades', trade_data)
        except Exception as e:
            print(f"Error saving trade: {e}")
            return None
    
    async def get_trades(self, user_id: str = None, limit: int = 100) -> List[Dict[str, Any]]:
        """Get trades from Firebase."""
        try:
            collection_ref = self.db.get_collection('trades')
            
            if user_id:
                query = collection_ref.where('user_id', '==', user_id).order_by('timestamp', direction='DESCENDING').limit(limit)
            else:
                query = collection_ref.order_by('timestamp', direction='DESCENDING').limit(limit)
            
            docs = query.stream()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            print(f"Error getting trades: {e}")
            return []
    
    async def save_portfolio_snapshot(self, user_id: str, portfolio_data: Dict[str, Any]) -> bool:
        """Save portfolio snapshot to Firebase."""
        try:
            data = {
                'user_id': user_id,
                'portfolio': portfolio_data,
                'timestamp': datetime.utcnow().isoformat(),
                'created_at': datetime.utcnow().isoformat()
            }
            
            doc_id = f"{user_id}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"
            return await self.db.set_document('portfolio_snapshots', doc_id, data)
        except Exception as e:
            print(f"Error saving portfolio snapshot: {e}")
            return False
    
    async def get_latest_portfolio(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get latest portfolio snapshot."""
        try:
            collection_ref = self.db.get_collection('portfolio_snapshots')
            query = collection_ref.where('user_id', '==', user_id).order_by('timestamp', direction='DESCENDING').limit(1)
            
            docs = query.stream()
            for doc in docs:
                return doc.to_dict()
            
            return None
        except Exception as e:
            print(f"Error getting latest portfolio: {e}")
            return None


# Global Firebase service instance
firebase_service = FirebaseService()
