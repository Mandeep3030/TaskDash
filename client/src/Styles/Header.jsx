// src/Styles/Header.jsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Header({ username = 'Admin', subtitle, onSignIn, onLogoff, onMenuSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleSelect = (key) => {
    handleMenuClose();
    if (onMenuSelect) onMenuSelect(key);
  };

  const initials = (username || '').split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase() || 'U';
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', maxWidth: 1500, mx: 'auto' }}>
          <Typography variant="h6" component="div">
            Shop Section Scheduler
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ opacity: 0.85, display: { xs: 'none', sm: 'block' } }}>
              {subtitle}
            </Typography>
          )}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>{initials}</Avatar>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>{username}</Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => handleSelect('profile')}>My Profile</MenuItem>
              <MenuItem onClick={() => handleSelect('timeclock')}>Time Clock</MenuItem>
              <MenuItem onClick={() => handleSelect('phonebook')}>Phone Book</MenuItem>
            </Menu>
            {onSignIn ? (
              <Button size="small" color="inherit" variant="outlined" onClick={onSignIn}>Sign in</Button>
            ) : null}
            <Button size="small" color="secondary" variant="contained" onClick={onLogoff}>Logoff</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
