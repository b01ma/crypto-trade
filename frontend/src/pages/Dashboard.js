import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance, ShowChart } from '@mui/icons-material';

const Dashboard = () => {
  // Mock data - in a real app, this would come from your backend/API
  const portfolioValue = 125430.50;
  const totalGain = 15430.50;
  const gainPercentage = 14.02;
  const isPositive = gainPercentage > 0;

  const topCryptos = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 2.5, changePercent: 0.58 },
    { symbol: 'ETH', name: 'Ethereum', price: 2650.00, change: -45.00, changePercent: -1.67 },
    { symbol: 'ADA', name: 'Cardano', price: 0.45, change: 0.02, changePercent: 4.65 },
    { symbol: 'SOL', name: 'Solana', price: 98.50, change: 3.20, changePercent: 3.36 },
  ];

  const recentTrades = [
    { id: 1, pair: 'BTC/USDT', type: 'Buy', amount: 0.5, price: 43000, time: '2 hours ago' },
    { id: 2, pair: 'ETH/USDT', type: 'Sell', amount: 2.0, price: 2700, time: '5 hours ago' },
    { id: 3, pair: 'ADA/USDT', type: 'Buy', amount: 1000, price: 0.43, time: '1 day ago' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#00d4aa', mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Portfolio Overview */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountBalance sx={{ mr: 1, color: '#00d4aa' }} />
                <Typography variant="h6">Portfolio Value</Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                ${portfolioValue.toLocaleString()}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                {isPositive ? <TrendingUp sx={{ color: '#00d4aa', mr: 1 }} /> : <TrendingDown sx={{ color: '#ff6b6b', mr: 1 }} />}
                <Typography variant="h6" sx={{ color: isPositive ? '#00d4aa' : '#ff6b6b' }}>
                  {isPositive ? '+' : ''}${totalGain.toLocaleString()} ({isPositive ? '+' : ''}{gainPercentage}%)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ShowChart sx={{ mr: 1, color: '#00d4aa' }} />
                <Typography variant="h6">Quick Stats</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Active Trades</Typography>
                  <Typography variant="h5" sx={{ color: '#00d4aa' }}>12</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Win Rate</Typography>
                  <Typography variant="h5" sx={{ color: '#00d4aa' }}>68%</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Cryptocurrencies */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, background: '#1a1a1a' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#00d4aa' }}>
              Top Cryptocurrencies
            </Typography>
            <List>
              {topCryptos.map((crypto) => (
                <ListItem key={crypto.symbol} divider>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {crypto.symbol}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {crypto.name}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Typography variant="subtitle1">
                            ${crypto.price.toLocaleString()}
                          </Typography>
                          <Chip
                            label={`${crypto.changePercent > 0 ? '+' : ''}${crypto.changePercent}%`}
                            size="small"
                            sx={{
                              backgroundColor: crypto.changePercent > 0 ? '#00d4aa' : '#ff6b6b',
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Trades */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, background: '#1a1a1a' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#00d4aa' }}>
              Recent Trades
            </Typography>
            <List>
              {recentTrades.map((trade) => (
                <ListItem key={trade.id} divider>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {trade.pair}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {trade.time}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Chip
                            label={trade.type}
                            size="small"
                            sx={{
                              backgroundColor: trade.type === 'Buy' ? '#00d4aa' : '#ff6b6b',
                              color: 'white',
                              fontWeight: 'bold',
                              mb: 1
                            }}
                          />
                          <Typography variant="body2">
                            {trade.amount} @ ${trade.price}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
