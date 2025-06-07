import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)
