import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5F1EB', // Avorio elegante
      light: '#FDFCFA',
      dark: '#E8E2D5',
      contrastText: '#2C2C2C',
    },
    secondary: {
      main: '#E8DDD4', // Beige raffinato
      light: '#F2EAE1',
      dark: '#D4C5B8',
      contrastText: '#2C2C2C',
    },
    background: {
      default: '#FEFEFE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#6B6B6B',
    },
    divider: '#F0EBE3',
  },
  typography: {
    fontFamily: [
      'Cormorant Garamond',
      'Playfair Display',
      'Georgia',
      'serif'
    ].join(','),
    h1: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 300,
      fontSize: 'clamp(2rem, 5vw, 2.8rem)',
      color: '#2C2C2C',
      letterSpacing: '1px',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 300,
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      color: '#2C2C2C',
      letterSpacing: '0.5px',
    },
    h3: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 400,
      fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
      color: '#2C2C2C',
    },
    h4: {
      fontFamily: '"Lato", sans-serif',
      fontWeight: 300,
      fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
      color: '#6B6B6B',
      letterSpacing: 'clamp(1px, 0.5vw, 2px)',
      textTransform: 'uppercase',
    },
    body1: {
      fontFamily: '"Lato", sans-serif',
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
      lineHeight: 1.6,
      color: '#2C2C2C',
      fontWeight: 300,
    },
    body2: {
      fontFamily: '"Lato", sans-serif',
      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
      lineHeight: 1.5,
      color: '#6B6B6B',
      fontWeight: 300,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 48px)',
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          fontWeight: 300,
          fontFamily: '"Lato", sans-serif',
          letterSpacing: 'clamp(0.5px, 0.2vw, 1px)',
          border: '1px solid #E8DDD4',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#F5F1EB',
            borderColor: '#D4C5B8',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          backgroundColor: '#FFFFFF',
          color: '#2C2C2C',
          border: '1px solid #E8DDD4',
          '&:hover': {
            backgroundColor: '#F5F1EB',
            borderColor: '#D4C5B8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #F0EBE3',
          borderRadius: 'clamp(0px, 1vw, 8px)',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2C2C2C',
          boxShadow: 'none',
          borderBottom: '1px solid #F0EBE3',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 1,
          borderRadius: 0,
          backgroundColor: '#F0EBE3',
        },
        bar: {
          borderRadius: 0,
          backgroundColor: '#D4C5B8',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #F0EBE3',
          '&:hover': {
            backgroundColor: '#F5F1EB',
            borderColor: '#D4C5B8',
          },
        },
      },
    },
  },
});

export default theme;
