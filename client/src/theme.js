// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#111827', // dark header bar
    },
    secondary: {
      main: '#f59e0b', // amber for jobs
    },
    background: {
      default: '#f3f4f6',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    // Increase overall base font size
    fontSize: 16,
    h6: {
      fontSize: '1.15rem',
    },
    subtitle1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.95rem',
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
    },
  },
});

export default theme;
