# Crypto Trade Frontend

A modern React-based frontend for the Crypto Trade application, built with Material-UI and featuring a dark theme optimized for cryptocurrency trading.

## Features

- **Dashboard**: Overview of portfolio value, top cryptocurrencies, and recent trades
- **Trading**: Order placement interface with order book and recent trades
- **Portfolio**: Detailed portfolio view with asset allocation and performance charts
- **Settings**: User preferences, trading settings, and security options

## Tech Stack

- **React 18** - Frontend framework
- **Material-UI (MUI)** - UI component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization and charts
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── Dashboard.js    # Portfolio overview
│   ├── Trading.js      # Trading interface
│   ├── Portfolio.js    # Detailed portfolio view
│   └── Settings.js     # User settings
├── services/           # API services and utilities
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── utils/              # Utility functions
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Design System

The application uses a dark theme with a crypto-focused color palette:

- **Primary Green**: #00d4aa (crypto green)
- **Secondary Red**: #ff6b6b (alert/negative)
- **Background**: #0a0a0a (main background)
- **Paper**: #1a1a1a (card/component background)

## Features Overview

### Dashboard
- Real-time portfolio value display
- Top cryptocurrency prices and changes
- Recent trading activity
- Quick statistics and performance metrics

### Trading
- Order placement (buy/sell)
- Real-time order book display
- Recent trades feed
- Multiple trading pairs support

### Portfolio
- Detailed asset holdings
- Portfolio allocation visualization
- Performance charts and analytics
- Asset-specific performance tracking

### Settings
- User profile management
- Trading preferences
- Notification settings
- Security options

## Future Enhancements

- Real-time data integration
- Advanced charting capabilities
- Mobile responsiveness improvements
- Real-time notifications
- API integration with backend services
- User authentication and authorization
- Advanced trading features (stop-loss, take-profit)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Crypto Trade application suite.