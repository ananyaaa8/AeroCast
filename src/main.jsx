import React from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App.jsx'
import './index.css'

// Create a custom theme with blue-black colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0a192f',
      light: '#172a45',
      dark: '#020c1b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1e3a8a',
      light: '#3b82f6',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f1f5f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#1e293b',
    },
    error: {
      main: '#b91c1c',
    },
    warning: {
      main: '#b45309',
    },
    success: {
      main: '#047857',
    },
    info: {
      main: '#0c4a6e',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      color: '#0a192f',
    },
    h2: {
      fontWeight: 700,
      color: '#0a192f',
    },
    h3: {
      fontWeight: 700,
      color: '#0a192f',
    },
    h4: {
      fontWeight: 700,
      color: '#0a192f',
    },
    h5: {
      fontWeight: 600,
      color: '#0a192f',
    },
    h6: {
      fontWeight: 600,
      color: '#0a192f',
    },
    subtitle1: {
      fontWeight: 600,
      color: '#1e293b',
    },
    body1: {
      fontWeight: 500,
      color: '#1e293b',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(10, 25, 47, 0.12)',
          boxShadow: '0 4px 20px rgba(10, 25, 47, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
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
)