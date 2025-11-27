// src/App.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import theme from './theme';
import Printing from './Pages/Printing.jsx';
import SignIn from './Pages/SignIn.jsx';
import SignUp from './Pages/Signup.jsx';

function App() {
  const location = useLocation();
  const isAuth = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
          <Box sx={{
            maxWidth: isAuth ? 1000 : 1500,
            mx: 'auto',
            width: '100%',
            display: 'flex',
            minHeight: 0,
            overflow: 'hidden',
            justifyContent: isAuth ? 'center' : 'flex-start',
          }}>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/printing" element={<Printing />} />
              <Route path="/" element={<Navigate to="/signin" replace />} />
              <Route path="*" element={<Navigate to="/signin" replace />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
