import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#F5F6F8',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        textAlign: 'center',
      }}
    >

      <Typography variant="h1" sx={{ color: '#3252DF', fontWeight: 'bold', fontSize: { xs: '3rem', md: '5rem' } }}>
        404
      </Typography>

      <Typography variant="h5" sx={{ color: '#152C5B', mb: 2 }}>
        Page Not Found
      </Typography>

      <Typography variant="body1" sx={{ color: '#152C5B', mb: 4, maxWidth: 500 }}>
        The page you’re looking for doesn’t exist or has been moved. Let’s get you back to safety.
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: '#3252DF',
          '&:hover': {
            backgroundColor: '#2945c3',
          },
          color: '#fff',
          px: 4,
          py: 1,
          borderRadius: '8px',
          textTransform: 'none',
        }}
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
