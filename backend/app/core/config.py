"""
Configuration settings for the crypto trading backend.
"""
import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Crypto Trade Backend"
    VERSION: str = "1.0.0"
    
    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = False
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:3000",  # React frontend
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]
    
    # Firebase Settings
    FIREBASE_PROJECT_ID: Optional[str] = None
    FIREBASE_PRIVATE_KEY_ID: Optional[str] = None
    FIREBASE_PRIVATE_KEY: Optional[str] = None
    FIREBASE_CLIENT_EMAIL: Optional[str] = None
    FIREBASE_CLIENT_ID: Optional[str] = None
    FIREBASE_CLIENT_X509_CERT_URL: Optional[str] = None
    FIREBASE_DATABASE_URL: Optional[str] = None
    
    # Binance API Settings
    BINANCE_API_KEY: Optional[str] = None
    BINANCE_SECRET_KEY: Optional[str] = None
    BINANCE_TESTNET: bool = True  # Use testnet by default
    
    # ML Service Settings
    ML_SERVICE_URL: Optional[str] = None
    ML_MODEL_VERSION: str = "v1.0"
    
    # Redis Settings (for caching)
    REDIS_URL: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
