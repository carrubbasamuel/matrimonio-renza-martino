import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import logoImage from '../assets/image.png';

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(212, 197, 184, 0.4)',
      }}
    >
      <Toolbar sx={{ 
        py: { xs: 2, sm: 2.5, md: 3 }, 
        justifyContent: 'center', 
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          {/* Logo M&R più piccolo */}
          <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
            <img 
              src={logoImage} 
              alt="M&R Logo" 
              style={{
                height: window.innerWidth < 600 ? '50px' : window.innerWidth < 900 ? '65px' : '80px',
                width: 'auto',
                maxWidth: '180px',
                objectFit: 'contain'
              }}
            />
          </Box>
          
          
          
          {/* Data più discreta */}
          <Typography
            variant="body2"
            sx={{
              color: '#8B7355',
              letterSpacing: { xs: '1px', sm: '1.5px' },
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
              fontWeight: 300,
              fontFamily: '"Lato", sans-serif',
              textTransform: 'uppercase',
              opacity: 0.8
            }}
          >
            5 Settembre 2025
          </Typography>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
