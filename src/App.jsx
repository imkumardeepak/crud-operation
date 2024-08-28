import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import MainContent from './Layout/MainContent';
import GeneralPage from './Pages/GeneralPage';
import AccountPage from './Pages/AccountPage';
import './App.css'; // Assuming the font is imported in App.css

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f6f8',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ac3b61',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
    },
    // Customize other typography as needed
  },
  spacing: 8, // Default spacing
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ display: 'flex', height: '100vh', pt: '64px' }}>
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 2,
              bgcolor: 'background.default',
              overflowY: 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/general" element={<GeneralPage />} />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
