import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Footer_Admin from '../footer_Admin/Footer_Admin';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Browse by', path: '/browse' },
  { name: 'Stories', path: '/stories' },
  { name: 'Agents', path: '/agents' },
];

const Nav_Admin = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
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

            {/* Menu items */}
            <Box sx={{ display: 'flex', gap: 4 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  disableRipple
                  sx={{
                    color: '#152c5b',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: '400',
                    fontFamily: 'Poppins ,sans-serif',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      color: '#4e6ae3',
                      backgroundColor: 'transparent',
                    },
                    '&:active': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    },
                    '&:focus': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            
          </Toolbar>
          
          
        </Container>
        <Footer_Admin />
      </AppBar>
   
    </>
  );
};


export default Nav_Admin;
