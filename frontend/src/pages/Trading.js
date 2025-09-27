import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider
} from '@mui/material';
import { TrendingUp, TrendingDown, SwapHoriz } from '@mui/icons-material';

const Trading = () => {
  const [tradeType, setTradeType] = useState('buy');
  const [cryptoPair, setCryptoPair] = useState('BTC/USDT');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  // Mock order book data
  const orderBook = {
    asks: [
      { price: 43250.50, amount: 0.5, total: 21625.25 },
      { price: 43251.00, amount: 1.2, total: 51901.20 },
      { price: 43251.50, amount: 0.8, total: 34601.20 },
      { price: 43252.00, amount: 2.1, total: 90829.20 },
      { price: 43252.50, amount: 1.5, total: 64878.75 },
    ],
    bids: [
      { price: 43250.00, amount: 1.0, total: 43250.00 },
      { price: 43249.50, amount: 0.7, total: 30274.65 },
      { price: 43249.00, amount: 1.3, total: 56223.70 },
      { price: 43248.50, amount: 0.9, total: 38923.65 },
      { price: 43248.00, amount: 2.0, total: 86496.00 },
    ]
  };

  const recentTrades = [
    { id: 1, price: 43250.25, amount: 0.5, time: '14:32:15', type: 'buy' },
    { id: 2, price: 43249.80, amount: 1.2, time: '14:32:10', type: 'sell' },
    { id: 3, price: 43250.00, amount: 0.8, time: '14:32:05', type: 'buy' },
    { id: 4, price: 43249.50, amount: 2.1, time: '14:31:58', type: 'sell' },
    { id: 5, price: 43250.75, amount: 0.3, time: '14:31:45', type: 'buy' },
  ];

  const handleTrade = () => {
    // In a real app, this would send the trade to your backend
    console.log('Placing trade:', { tradeType, cryptoPair, amount, price });
    alert(`Trade placed: ${tradeType.toUpperCase()} ${amount} ${cryptoPair} at $${price}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#00d4aa', mb: 4 }}>
        Trading
      </Typography>
      
      <Grid container spacing={3}>
        {/* Trading Panel */}
        <Grid item xs={12} md={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#00d4aa' }}>
                Place Order
              </Typography>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Order Type</InputLabel>
                <Select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value="buy">
                    <Box display="flex" alignItems="center">
                      <TrendingUp sx={{ mr: 1, color: '#00d4aa' }} />
                      Buy
                    </Box>
                  </MenuItem>
                  <MenuItem value="sell">
                    <Box display="flex" alignItems="center">
                      <TrendingDown sx={{ mr: 1, color: '#ff6b6b' }} />
                      Sell
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Trading Pair</InputLabel>
                <Select
                  value={cryptoPair}
                  onChange={(e) => setCryptoPair(e.target.value)}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value="BTC/USDT">BTC/USDT</MenuItem>
                  <MenuItem value="ETH/USDT">ETH/USDT</MenuItem>
                  <MenuItem value="ADA/USDT">ADA/USDT</MenuItem>
                  <MenuItem value="SOL/USDT">SOL/USDT</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                margin="normal"
                type="number"
                sx={{ color: 'white' }}
              />

              <TextField
                fullWidth
                label="Price (USDT)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                margin="normal"
                type="number"
                sx={{ color: 'white' }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleTrade}
                sx={{
                  mt: 3,
                  py: 1.5,
                  background: tradeType === 'buy' 
                    ? 'linear-gradient(45deg, #00d4aa 30%, #00a085 90%)'
                    : 'linear-gradient(45deg, #ff6b6b 30%, #ff5252 90%)',
                  '&:hover': {
                    background: tradeType === 'buy'
                      ? 'linear-gradient(45deg, #00a085 30%, #00d4aa 90%)'
                      : 'linear-gradient(45deg, #ff5252 30%, #ff6b6b 90%)',
                  }
                }}
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {cryptoPair}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Book */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, background: '#1a1a1a' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#00d4aa' }}>
              Order Book
            </Typography>
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Asks (Sell Orders) */}
                  {orderBook.asks.map((ask, index) => (
                    <TableRow key={`ask-${index}`}>
                      <TableCell sx={{ color: '#ff6b6b' }}>${ask.price}</TableCell>
                      <TableCell>{ask.amount}</TableCell>
                      <TableCell>{ask.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Divider sx={{ borderColor: '#00d4aa' }} />
                    </TableCell>
                  </TableRow>
                  
                  {/* Bids (Buy Orders) */}
                  {orderBook.bids.map((bid, index) => (
                    <TableRow key={`bid-${index}`}>
                      <TableCell sx={{ color: '#00d4aa' }}>${bid.price}</TableCell>
                      <TableCell>{bid.amount}</TableCell>
                      <TableCell>{bid.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Trades */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, background: '#1a1a1a' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#00d4aa' }}>
              Recent Trades
            </Typography>
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTrades.map((trade) => (
                    <TableRow key={trade.id}>
                      <TableCell sx={{ color: trade.type === 'buy' ? '#00d4aa' : '#ff6b6b' }}>
                        ${trade.price}
                      </TableCell>
                      <TableCell>{trade.amount}</TableCell>
                      <TableCell>{trade.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trading;
