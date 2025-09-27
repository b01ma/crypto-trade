import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material';
import './App.css';

// Import pages (we'll create these)
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import Portfolio from './pages/Portfolio';
import Settings from './pages/Settings';

// Create a dark theme suitable for a crypto trading app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4aa', // Crypto green
    },
    secondary: {
      main: '#ff6b6b', // Alert red
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: '#1a1a1a' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#00d4aa', fontWeight: 'bold' }}>
                Crypto Trade
              </Typography>
              <Tabs 
                value={currentTab} 
                onChange={handleTabChange}
                sx={{ 
                  '& .MuiTab-root': { 
                    color: '#888',
                    '&.Mui-selected': { 
                      color: '#00d4aa' 
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#00d4aa'
                  }
                }}
              >
                <Tab label="Dashboard" component="a" href="/" />
                <Tab label="Trading" component="a" href="/trading" />
                <Tab label="Portfolio" component="a" href="/portfolio" />
                <Tab label="Settings" component="a" href="/settings" />
              </Tabs>
            </Toolbar>
          </AppBar>
          
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
