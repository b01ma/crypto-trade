# Crypto Trade Backend

A Python FastAPI backend for the Crypto Trade application, providing RESTful APIs for cryptocurrency trading, portfolio management, and ML-based trading signals.

## Features

- **Health Monitoring**: System health checks and service status
- **Market Data**: Real-time kline/candlestick data from Binance
- **Trading Signals**: ML-based BUY/SELL/HOLD predictions
- **Portfolio Management**: Real-time balance tracking from Binance
- **Test Trading**: Safe testnet trading for strategy validation
- **Settings Management**: Strategy parameter storage in Firebase
- **Data Persistence**: Firebase Firestore integration

## Tech Stack

- **FastAPI** - Modern, fast web framework for building APIs
- **Python Binance** - Binance API client for trading and market data
- **Firebase Admin** - Google Firebase integration for data storage
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server for running the application

## API Endpoints

### Health & Status
- `GET /api/v1/health` - Check backend health and service status

### Market Data
- `GET /api/v1/klines?symbol=BTCUSDT&interval=1m&limit=500` - Get candlestick data
- `GET /api/v1/orderbook/{symbol}?limit=100` - Get order book data

### Trading Signals
- `GET /api/v1/signal/latest?symbol=BTCUSDT` - Get latest ML prediction

### Trading
- `POST /api/v1/trade/once` - Execute test trade on Binance testnet
- `GET /api/v1/trades?user_id=test_user&limit=50` - Get trade history

### Portfolio
- `GET /api/v1/portfolio` - Get current portfolio balances

### Settings
- `POST /api/v1/settings` - Save strategy parameters
- `GET /api/v1/settings/{user_id}` - Get strategy parameters

## Installation

### Prerequisites

- Python 3.8+
- Firebase project with Firestore enabled
- Binance account with API keys (optional for testnet)

### Setup

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your actual configuration values
   ```

5. **Run the application:**
   ```bash
   python run.py
   # Or
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

# Binance API (optional for testnet)
BINANCE_API_KEY=your-binance-api-key
BINANCE_SECRET_KEY=your-binance-secret-key
BINANCE_TESTNET=true

# ML Service (optional)
ML_SERVICE_URL=http://localhost:5000
ML_MODEL_VERSION=v1.0
```

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Go to Project Settings > Service Accounts
4. Generate a new private key and download the JSON file
5. Extract the values and add them to your `.env` file

### Binance Setup

1. Create a Binance account
2. Go to API Management
3. Create a new API key
4. Enable "Enable Spot & Margin Trading" for testnet
5. Add the API key and secret to your `.env` file

## Usage

### Starting the Server

```bash
# Development mode with auto-reload
python run.py

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Example API Calls

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Get BTC klines
curl "http://localhost:8000/api/v1/klines?symbol=BTCUSDT&interval=1m&limit=100"

# Get latest signal
curl "http://localhost:8000/api/v1/signal/latest?symbol=BTCUSDT"

# Get portfolio
curl http://localhost:8000/api/v1/portfolio

# Place test trade
curl -X POST "http://localhost:8000/api/v1/trade/once" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTCUSDT",
    "side": "BUY",
    "order_type": "MARKET",
    "quantity": 0.001
  }'
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── core/
│   │   ├── config.py          # Configuration settings
│   │   └── database.py        # Firebase database manager
│   ├── services/
│   │   ├── binance_service.py # Binance API integration
│   │   ├── firebase_service.py # Firebase operations
│   │   └── ml_service.py      # ML prediction service
│   ├── api/
│   │   └── endpoints.py       # API route definitions
│   └── models/                # Pydantic models
├── requirements.txt           # Python dependencies
├── env.example               # Environment variables template
├── run.py                   # Startup script
└── README.md               # This file
```

## Development

### Adding New Endpoints

1. Add new routes to `app/api/endpoints.py`
2. Create Pydantic models for request/response validation
3. Implement business logic in appropriate service files
4. Update this README with new endpoint documentation

### Error Handling

The API uses FastAPI's built-in exception handling:
- `HTTPException` for client errors (400, 404, etc.)
- Service-level error handling with fallbacks
- Comprehensive logging for debugging

### Testing

```bash
# Run with pytest (when tests are added)
pytest

# Manual testing with curl
curl http://localhost:8000/api/v1/health
```

## Deployment

### Docker (Recommended)

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment-Specific Configuration

- **Development**: Use `.env` file with local settings
- **Production**: Use environment variables or secure secret management
- **Testing**: Use test-specific configuration

## Security Considerations

- API keys are stored in environment variables
- CORS is configured for specific origins
- Testnet trading only (no real money at risk)
- Input validation using Pydantic models
- Error messages don't expose sensitive information

## Monitoring & Logging

- Health check endpoint for monitoring
- Service status reporting
- Error logging to console
- Firebase operation logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Crypto Trade application suite.
