import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Portfolio = () => {
  // Mock portfolio data
  const portfolioData = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 2.5,
      price: 43250.00,
      value: 108125.00,
      change: 1250.00,
      changePercent: 1.17,
      allocation: 45.2
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 15.0,
      price: 2650.00,
      value: 39750.00,
      change: -450.00,
      changePercent: -1.12,
      allocation: 16.6
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: 5000,
      price: 0.45,
      value: 2250.00,
      change: 150.00,
      changePercent: 7.14,
      allocation: 0.9
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 25.0,
      price: 98.50,
      value: 2462.50,
      change: 75.00,
      changePercent: 3.14,
      allocation: 1.0
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      amount: 5000,
      price: 1.00,
      value: 5000.00,
      change: 0.00,
      changePercent: 0.00,
      allocation: 2.1
    }
  ];

  const totalValue = portfolioData.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = portfolioData.reduce((sum, asset) => sum + asset.change, 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  // Chart data
  const pieData = portfolioData.map(asset => ({
    name: asset.symbol,
    value: asset.value,
    color: asset.symbol === 'BTC' ? '#f7931a' : 
           asset.symbol === 'ETH' ? '#627eea' :
           asset.symbol === 'ADA' ? '#0033ad' :
           asset.symbol === 'SOL' ? '#9945ff' : '#26a17b'
  }));

  const performanceData = [
    { month: 'Jan', value: 180000 },
    { month: 'Feb', value: 195000 },
    { month: 'Mar', value: 210000 },
    { month: 'Apr', value: 205000 },
    { month: 'May', value: 220000 },
    { month: 'Jun', value: 239000 },
    { month: 'Jul', value: 225000 },
    { month: 'Aug', value: 240000 },
    { month: 'Sep', value: 235000 },
    { month: 'Oct', value: 250000 },
    { month: 'Nov', value: 245000 },
    { month: 'Dec', value: 239000 }
  ];

  const COLORS = ['#f7931a', '#627eea', '#0033ad', '#9945ff', '#26a17b'];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#00d4aa', mb: 4 }}>
        Portfolio
      </Typography>
      
      <Grid container spacing={3}>
        {/* Portfolio Summary */}
        <Grid item xs={12}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" sx={{ color: '#00d4aa', fontWeight: 'bold' }}>
                    ${totalValue.toLocaleString()}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: totalChange >= 0 ? '#00d4aa' : '#ff6b6b',
                    mt: 1
                  }}>
                    {totalChange >= 0 ? '+' : ''}${totalChange.toLocaleString()} ({totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ width: '100%', maxWidth: 300 }}>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Table */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ background: '#1a1a1a' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#00d4aa' }}>
                Holdings
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Asset</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Value</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Change</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Allocation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {portfolioData.map((asset) => (
                    <TableRow key={asset.symbol}>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {asset.symbol}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {asset.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{asset.amount.toLocaleString()}</TableCell>
                      <TableCell>${asset.price.toLocaleString()}</TableCell>
                      <TableCell>${asset.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${asset.change >= 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%`}
                          size="small"
                          sx={{
                            backgroundColor: asset.change >= 0 ? '#00d4aa' : '#ff6b6b',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ width: '100%' }}>
                          <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography variant="body2">{asset.allocation}%</Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={asset.allocation}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#333',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: asset.symbol === 'BTC' ? '#f7931a' : 
                                               asset.symbol === 'ETH' ? '#627eea' :
                                               asset.symbol === 'ADA' ? '#0033ad' :
                                               asset.symbol === 'SOL' ? '#9945ff' : '#26a17b'
                              }
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, background: '#1a1a1a' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#00d4aa' }}>
              Performance (12M)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                  contentStyle={{ 
                    backgroundColor: '#2a2a2a', 
                    border: '1px solid #444',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#00d4aa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Portfolio;
