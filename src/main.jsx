import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import './index.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e3a8a', // blue
      light: '#3b82f6',
      dark: '#0a192f', // deep navy
    },
    secondary: {
      main: '#6b21a8', // purple
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(255,255,255,0.05)',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    body1: { fontWeight: 400 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
