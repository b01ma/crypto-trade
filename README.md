# Crypto Trade Application

A full-stack cryptocurrency trading application built with React frontend and Python FastAPI backend, featuring real-time market data, ML-based trading signals, and portfolio management.

## 🚀 Features

### Frontend (React)
- **📊 Dashboard** - Portfolio overview with real-time value tracking
- **💹 Trading Interface** - Order placement with live order book
- **📈 Portfolio Management** - Detailed asset allocation and performance charts
- **⚙️ Settings** - User preferences and strategy configuration
- **🌙 Dark Theme** - Professional crypto trading aesthetic
- **📱 Responsive Design** - Works on desktop and mobile devices

### Backend (Python FastAPI)
- **🔍 Health Monitoring** - System health checks and service status
- **📊 Market Data** - Real-time kline/candlestick data from Binance
- **🤖 ML Signals** - AI-powered BUY/SELL/HOLD predictions
- **💼 Portfolio API** - Real-time balance tracking from Binance
- **🧪 Test Trading** - Safe testnet trading for strategy validation
- **💾 Data Persistence** - Firebase Firestore integration
- **📖 Auto Documentation** - Swagger UI for API exploration

## 🏗️ Architecture

```
crypto-trade/
├── frontend/          # React application
│   ├── src/
│   │   ├── pages/     # Dashboard, Trading, Portfolio, Settings
│   │   ├── components/ # Reusable UI components
│   │   ├── services/  # API integration
│   │   └── utils/     # Utility functions
│   └── package.json
├── backend/           # Python FastAPI application
│   ├── app/
│   │   ├── api/       # API endpoints
│   │   ├── services/  # Binance, Firebase, ML services
│   │   └── core/      # Configuration and database
│   └── requirements.txt
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Frontend framework
- **Material-UI (MUI)** - UI component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization and charts
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - Modern, fast web framework
- **Python Binance** - Binance API integration
- **Firebase Admin** - Google Firebase integration
- **Pydantic** - Data validation and settings
- **Uvicorn** - ASGI server

### External Services
- **Binance API** - Market data and trading
- **Firebase Firestore** - Data persistence
- **ML Service** - Trading signal predictions

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+
- Firebase project with Firestore
- Binance account (optional for testnet)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd crypto-trade
```

### 2. Start the Backend
```bash
cd backend
./start.sh
# Or manually:
# source venv/bin/activate
# pip install -r requirements.txt
# cp env.example .env
# # Edit .env with your credentials
# python run.py
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📋 Configuration

### Backend Configuration
Create a `.env` file in the `backend/` directory:

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

## 📚 API Endpoints

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

## 🎯 Usage Examples

### Frontend Pages

#### Dashboard
- View portfolio value and performance
- Monitor top cryptocurrencies
- Track recent trading activity
- Quick statistics overview

#### Trading
- Place buy/sell orders
- View real-time order book
- Monitor recent trades
- Multiple trading pairs support

#### Portfolio
- Detailed asset holdings
- Portfolio allocation visualization
- Performance charts and analytics
- Asset-specific metrics

#### Settings
- User profile management
- Trading preferences
- Notification settings
- Security options

### API Usage Examples

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

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Backend Development
```bash
cd backend
source venv/bin/activate
python run.py      # Start development server
python test_endpoints.py  # Test API endpoints
```

### Adding New Features

#### Frontend
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `src/App.js`
4. Add API calls in `src/services/`

#### Backend
1. Add new endpoints in `app/api/endpoints.py`
2. Create service classes in `app/services/`
3. Add Pydantic models for validation
4. Update this README with new endpoints

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
python test_endpoints.py
```

### Manual Testing
- Use the Swagger UI at http://localhost:8000/docs
- Test the React frontend at http://localhost:3000
- Check health endpoint: http://localhost:8000/api/v1/health

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your hosting service
```

### Backend Deployment
```bash
cd backend
# Use Docker or deploy to cloud service
# Ensure environment variables are set
```

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔒 Security Considerations

- API keys stored in environment variables
- CORS configured for specific origins
- Testnet trading only (no real money at risk)
- Input validation using Pydantic models
- Error messages don't expose sensitive information
- Firebase security rules for data access

## 📊 Monitoring & Logging

- Health check endpoint for monitoring
- Service status reporting
- Error logging to console
- Firebase operation logging
- Real-time data validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Frontend Issues**: Check React and Material-UI documentation
- **Backend Issues**: Check FastAPI and Firebase documentation
- **API Issues**: Use the Swagger UI at `/docs` for testing
- **General Issues**: Create an issue in the repository

## 🔮 Future Enhancements

- Real-time WebSocket connections
- Advanced charting capabilities
- Mobile app development
- Real-time notifications
- Advanced ML model integration
- Multi-exchange support
- Social trading features
- Advanced risk management tools

## 📞 Contact

For questions or support, please open an issue in the repository or contact the development team.

---

**Happy Trading! 🚀📈**