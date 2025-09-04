import { Box, Container, Paper, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import PhotoUpload from './components/PhotoUpload';

function NavigationTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentTab = location.pathname === '/gallery' ? 1 : 0;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      navigate('/upload');
    } else {
      navigate('/gallery');
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        backgroundColor: '#FEFEFE',
        borderBottom: '1px solid #F0EBE3',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <Container maxWidth="lg">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#8B7355',
              height: 3,
            },
            '& .MuiTab-root': {
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 400,
              textTransform: 'none',
              color: '#6B6B6B',
              py: { xs: 2, sm: 3 },
              px: { xs: 3, sm: 4 },
              minWidth: { xs: 120, sm: 150 },
              '&.Mui-selected': {
                color: '#8B7355',
                fontWeight: 500,
              },
              '&:hover': {
                color: '#8B7355',
                opacity: 0.8,
              },
            },
          }}
        >
          <Tab 
            label="Condividete con noi" 
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1rem' },
              letterSpacing: '0.5px'
            }} 
          />
          <Tab 
            label="I nostri ricordi insieme" 
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1rem' },
              letterSpacing: '0.5px'
            }} 
          />
        </Tabs>
      </Container>
    </Paper>
  );
}


function App() {
  return (
    <Router>
      <Box 
        sx={{ 
          minHeight: '100vh',
          backgroundColor: '#FAF8F5',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Header />
        <NavigationTabs />
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: { xs: 4, sm: 5, md: 6 }, 
            px: { xs: 2, sm: 3, md: 4 },
            position: 'relative', 
            zIndex: 1,
            width: '100%',
            maxWidth: { xs: '100vw', sm: '100%' }
          }}
        >
          <Routes>
            <Route path="/" element={<PhotoUpload />} />
            <Route path="/upload" element={<PhotoUpload />} />
            <Route path="/gallery" element={<PhotoGallery />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
