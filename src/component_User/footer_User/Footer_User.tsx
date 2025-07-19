
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import {Grid} from '@mui/material'; 
import { Link as RouterLink } from 'react-router-dom';

const Footer_User = () => {
  return (
    <Box sx={{ 
      borderTop: '1px solid #eee', 
      mt: { xs: 6, sm: 8, md: 10 }, 
      py: { xs: 3, sm: 4, md: 6 },
    }}>
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="space-between" alignItems="flex-start">
  
          <Grid  item xs={12} sm={12} md={3}>
             <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '20px', sm: '24px', md: '26px' },
                letterSpacing: '.05rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                fontFamily: 'Poppins, sans-serif',
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: { xs: 2, md: 0 },
              }}
            >
              <span style={{ color: '#4e6ae3' }}>Stay</span>
              <span style={{ color: '#152C5B' }}>cation.</span>
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mt: 1,
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '14px', sm: '14px' },
                mb: { xs: 3, md: 0 },
              }}
            >
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>
           
          {/* For Beginners */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                color: '#152C5B',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '16px', sm: '16px', md: '18px' },
                mb: { xs: 1, md: 0 },
              }}
            >
              For Beginners
            </Typography>
            <Box sx={{ 
              mt: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 0.5,
                  fontSize: { xs: '14px', sm: '14px' },
                }}
              >
                <MuiLink 
                  component={RouterLink} 
                  to="/Register" 
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  New Account
                </MuiLink>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 0.5,
                  fontSize: { xs: '14px', sm: '14px' },
                }}
              >
                <MuiLink 
                  component={RouterLink} 
                  to="/MasterUser/booking" 
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  Start Booking a Room
                </MuiLink>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 0.5,
                  fontSize: { xs: '14px', sm: '14px' },
                }}
              >
                <MuiLink 
                  component={RouterLink} 
                  to="/MasterUser/booking" 
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  Use Payments
                </MuiLink>
              </Typography>
            </Box>
          </Grid>
           
          {/* Explore Us */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                color: '#152C5B',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '16px', sm: '16px', md: '18px' },
                mb: { xs: 1, md: 0 },
              }}
            >
              Explore Us
            </Typography>
            <Box sx={{ 
              mt: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 0.5,
                  fontSize: { xs: '14px', sm: '14px' },
                }}
              >
                <MuiLink 
                  component={RouterLink} 
                  to="/MasterAdmin/users-list" 
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  Our Careers
                </MuiLink>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 0.5,
                  fontSize: { xs: '14px', sm: '14px' },
                }}
              >
                <MuiLink 
                  href="#" 
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  Privacy
                </MuiLink>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 0.5,
                  fontSize: { xs: '14px', sm: '14px' },
                }}
              >
                <MuiLink 
                  href="#" 
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  Terms & Conditions
                </MuiLink>
              </Typography>
            </Box>
          </Grid>
           
          {/* Contact */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                color: '#152C5B',
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '16px', sm: '16px', md: '18px' },
                mb: { xs: 1, md: 0 },
              }}
            >
              Connect Us
            </Typography>
            <Box sx={{ 
              mt: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '14px', sm: '14px' },
                  mb: 0.5,
                }}
              >
                <MuiLink 
                  href="mailto:support@staycation.id"
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  support@staycation.id
                </MuiLink>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '14px', sm: '14px' },
                  mb: 0.5,
                }}
              >
                <MuiLink 
                  href="tel:021-2208-1996"
                  underline="none" 
                  color="text.secondary" 
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '14px', sm: '14px' },
                    '&:hover': {
                      color: '#4e6ae3',
                    },
                  }}
                >
                  021 - 2208 - 1996
                </MuiLink>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: '14px', sm: '14px' },
                }}
              >
                Staycation, Kemang, Jakarta
              </Typography>
            </Box>
          </Grid>
        </Grid>
         
        {/* Copyright */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: { xs: 4, sm: 5, md: 6 },
          pt: { xs: 3, sm: 4 },
          borderTop: { xs: '1px solid #eee', sm: 'none' },
        }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '11px', sm: '12px' },
            }}
          >
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer_User