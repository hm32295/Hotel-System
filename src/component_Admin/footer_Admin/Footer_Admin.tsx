import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';

const Footer_Admin = () => {
  return (
    <Box sx={{ borderTop: '1px solid #eee', mt: 10, py: 6 }}>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="flex-start">
          {/* Logo and Description */}
          <Grid item xs={12} md={3}>

            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 500,
                fontSize: '26px',
                letterSpacing: '.05rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              <span style={{ color: '#4e6ae3' }}>Stay</span>
              <span style={{ color: '#152C5B' }}>cation.</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>

          {/* For Beginners */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#152C5B' }}>
              For Beginners
            </Typography>
            <Box sx={{ mt: 1 }}>
              {['New Account', 'Start Booking a Room', 'Use Payments'].map((item) => (
                <Typography key={item} variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  <MuiLink href="#" underline="none" color="text.secondary" sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}>
                    {item}
                  </MuiLink>
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Explore Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#152C5B' }}>
              Explore Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              {['Our Careers', 'Privacy', 'Terms & Conditions'].map((item) => (
                <Typography key={item} variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  <MuiLink href="#" underline="none" color="text.secondary" sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}>
                    {item}
                  </MuiLink>
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#152C5B' }}>
              Connect Us
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">support@staycation.id</Typography>
              <Typography variant="body2" color="text.secondary">021 - 2208 - 1996</Typography>
              <Typography variant="body2" color="text.secondary">Staycation, Kemang, Jakarta</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="caption" color="text.secondary">
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer_Admin