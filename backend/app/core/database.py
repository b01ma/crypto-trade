"""
Firebase database configuration and utilities.
"""
import json
from typing import Optional, Dict, Any
import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import settings


class FirebaseManager:
    """Firebase database manager."""
    
    def __init__(self):
        self.db: Optional[firestore.Client] = None
        self._initialize_firebase()
    
    def _initialize_firebase(self):
        """Initialize Firebase Admin SDK."""
        try:
            # Check if Firebase is already initialized
            if firebase_admin._apps:
                self.db = firestore.client()
                return
            
            # Firebase service account configuration
            if all([
                settings.FIREBASE_PROJECT_ID,
                settings.FIREBASE_PRIVATE_KEY_ID,
                settings.FIREBASE_PRIVATE_KEY,
                settings.FIREBASE_CLIENT_EMAIL,
                settings.FIREBASE_CLIENT_ID,
                settings.FIREBASE_CLIENT_X509_CERT_URL
            ]):
                # Use service account credentials
                cred_dict = {
                    "type": "service_account",
                    "project_id": settings.FIREBASE_PROJECT_ID,
                    "private_key_id": settings.FIREBASE_PRIVATE_KEY_ID,
                    "private_key": settings.FIREBASE_PRIVATE_KEY.replace('\\n', '\n'),
                    "client_email": settings.FIREBASE_CLIENT_EMAIL,
                    "client_id": settings.FIREBASE_CLIENT_ID,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                    "client_x509_cert_url": settings.FIREBASE_CLIENT_X509_CERT_URL
                }
                
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                self.db = firestore.client()
            else:
                # Use default credentials (for local development)
                firebase_admin.initialize_app()
                self.db = firestore.client()
                
        except Exception as e:
            print(f"Firebase initialization error: {e}")
            self.db = None
    
    def get_collection(self, collection_name: str):
        """Get a Firestore collection reference."""
        if not self.db:
            raise Exception("Firebase not initialized")
        return self.db.collection(collection_name)
    
    async def get_document(self, collection_name: str, document_id: str) -> Optional[Dict[str, Any]]:
        """Get a document from Firestore."""
        try:
            doc_ref = self.get_collection(collection_name).document(document_id)
            doc = doc_ref.get()
            return doc.to_dict() if doc.exists else None
        except Exception as e:
            print(f"Error getting document: {e}")
            return None
    
    async def set_document(self, collection_name: str, document_id: str, data: Dict[str, Any]) -> bool:
        """Set a document in Firestore."""
        try:
            doc_ref = self.get_collection(collection_name).document(document_id)
            doc_ref.set(data)
            return True
        except Exception as e:
            print(f"Error setting document: {e}")
            return False
    
    async def get_collection_data(self, collection_name: str, limit: Optional[int] = None) -> list:
        """Get all documents from a collection."""
        try:
            collection_ref = self.get_collection(collection_name)
            query = collection_ref
            if limit:
                query = query.limit(limit)
            
            docs = query.stream()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            print(f"Error getting collection data: {e}")
            return []
    
    async def add_document(self, collection_name: str, data: Dict[str, Any]) -> Optional[str]:
        """Add a new document to a collection."""
        try:
            doc_ref = self.get_collection(collection_name).add(data)
            return doc_ref[1].id
        except Exception as e:
            print(f"Error adding document: {e}")
            return None


# Global Firebase manager instance
firebase_manager = FirebaseManager()
