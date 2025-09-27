import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider
} from '@mui/material';
import { Save, Security, Notifications, Palette, Language } from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    username: 'crypto_trader_2024',
    email: 'trader@example.com',
    language: 'en',
    timezone: 'UTC',
    
    // Trading Settings
    defaultOrderType: 'limit',
    autoConfirmTrades: false,
    maxOrderAmount: 10000,
    riskLevel: 50,
    
    // Notification Settings
    priceAlerts: true,
    tradeNotifications: true,
    emailNotifications: false,
    pushNotifications: true,
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    apiKeyEnabled: false,
    
    // Display Settings
    theme: 'dark',
    chartType: 'candlestick',
    showGridLines: true,
    animationSpeed: 'normal'
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to your backend
    console.log('Saving settings:', settings);
    setSnackbar({ open: true, message: 'Settings saved successfully!' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#00d4aa', mb: 4 }}>
        Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Language sx={{ mr: 1, color: '#00d4aa' }} />
                <Typography variant="h6">General</Typography>
              </Box>
              
              <TextField
                fullWidth
                label="Username"
                value={settings.username}
                onChange={(e) => handleSettingChange('username', e.target.value)}
                margin="normal"
                sx={{ color: 'white' }}
              />
              
              <TextField
                fullWidth
                label="Email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                margin="normal"
                type="email"
                sx={{ color: 'white' }}
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Language</InputLabel>
                <Select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">Eastern Time</MenuItem>
                  <MenuItem value="PST">Pacific Time</MenuItem>
                  <MenuItem value="GMT">GMT</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Trading Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Palette sx={{ mr: 1, color: '#00d4aa' }} />
                <Typography variant="h6">Trading</Typography>
              </Box>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Default Order Type</InputLabel>
                <Select
                  value={settings.defaultOrderType}
                  onChange={(e) => handleSettingChange('defaultOrderType', e.target.value)}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value="market">Market</MenuItem>
                  <MenuItem value="limit">Limit</MenuItem>
                  <MenuItem value="stop">Stop</MenuItem>
                </Select>
              </FormControl>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoConfirmTrades}
                    onChange={(e) => handleSettingChange('autoConfirmTrades', e.target.checked)}
                    sx={{ color: '#00d4aa' }}
                  />
                }
                label="Auto-confirm trades"
                sx={{ mt: 2 }}
              />
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Max Order Amount (USDT)</Typography>
                <Slider
                  value={settings.maxOrderAmount}
                  onChange={(e, value) => handleSettingChange('maxOrderAmount', value)}
                  min={100}
                  max={100000}
                  step={100}
                  marks={[
                    { value: 100, label: '$100' },
                    { value: 10000, label: '$10K' },
                    { value: 100000, label: '$100K' }
                  ]}
                  sx={{ color: '#00d4aa' }}
                />
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Risk Level: {settings.riskLevel}%</Typography>
                <Slider
                  value={settings.riskLevel}
                  onChange={(e, value) => handleSettingChange('riskLevel', value)}
                  min={0}
                  max={100}
                  step={5}
                  sx={{ color: '#00d4aa' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Notifications sx={{ mr: 1, color: '#00d4aa' }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.priceAlerts}
                    onChange={(e) => handleSettingChange('priceAlerts', e.target.checked)}
                    sx={{ color: '#00d4aa' }}
                  />
                }
                label="Price alerts"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.tradeNotifications}
                    onChange={(e) => handleSettingChange('tradeNotifications', e.target.checked)}
                    sx={{ color: '#00d4aa' }}
                  />
                }
                label="Trade notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    sx={{ color: '#00d4aa' }}
                  />
                }
                label="Email notifications"
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.pushNotifications}
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    sx={{ color: '#00d4aa' }}
                  />
                }
                label="Push notifications"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Security sx={{ mr: 1, color: '#00d4aa' }} />
                <Typography variant="h6">Security</Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    sx={{ color: '#00d4aa' }}
                  />
                }
                label="Two-factor authentication"
              />
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Session Timeout: {settings.sessionTimeout} minutes</Typography>
                <Slider
                  value={settings.sessionTimeout}
                  onChange={(e, value) => handleSettingChange('sessionTimeout', value)}
                  min={5}
                  max={120}
                  step={5}
                  marks={[
                    { value: 5, label: '5m' },
                    { value: 30, label: '30m' },
                    { value: 120, label: '2h' }
                  ]}
                  sx={{ color: '#00d4aa' }}
                />
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.apiKeyEnabled}
                    onChange={(e) => handleSettingChange('apiKeyEnabled', e.target.checked)}
                    sx={{ color: '#00d4aa' }}
                  />
                }
                label="API Key access"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Save />}
              onClick={handleSave}
              sx={{
                background: 'linear-gradient(45deg, #00d4aa 30%, #00a085 90%)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00a085 30%, #00d4aa 90%)',
                }
              }}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
