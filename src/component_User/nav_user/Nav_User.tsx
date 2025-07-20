import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthContext } from '../../context/context';

const guestPages = [
  { name: 'Home', path: '/MasterUser/Home' },
  { name: 'Explore', path: '/MasterUser/Explore_USER' },
];

const userPages = [
  { name: 'Home', path: '/MasterUser/Home' },
  { name: 'Explore', path: '/MasterUser/Explore_USER' },
  { name: 'Favorites', path: '/MasterUser/Favorites' },
];

const Nav_User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pages, setPages] = useState([]);
  const { loginData } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    if (loginData?.role === 'user' || localStorage.getItem('token')) {
      setPages(userPages);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setPages(guestPages);
    }
  }, [loginData]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/Login');
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={isLoggedIn ? "/MasterUser/Home" : "/"}
            sx={{
              fontWeight: 500,
              fontSize: { xs: '20px', sm: '24px', md: '26px' },
              letterSpacing: '.05rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              color: 'black',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <span style={{ color: 'rgba(21, 44, 91, 1)',fontWeight:'700' }}>Stay</span>
            <span style={{ color: '#152C5B',fontWeight:'600' }}>cation.</span>
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
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
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    color: '#4e6ae3',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                sx={{
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  borderRadius: '8px',
                  fontWeight: 500,
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#c62828',
                    boxShadow: '0px 8px 15px rgba(211, 47, 47, 0.3)',
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/Register"
                  sx={{
                    backgroundColor: '#3252DF',
                    color: '#fff',
                    textTransform: 'none',
                    px: 3,
                    borderRadius: '8px',
                    fontWeight: 500,
                    fontFamily: 'Poppins, sans-serif',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#3252DF',
                      boxShadow: '0px 8px 15px rgba(50, 82, 223, 0.3)',
                    },
                  }}
                >
                  Register
                </Button>
                <Button
                  component={Link}
                  to="/Login"
                  sx={{
                    backgroundColor: '#3252DF',
                    color: '#fff',
                    textTransform: 'none',
                    px: 3,
                    ml: 2,
                    borderRadius: '8px',
                    fontWeight: 500,
                    fontFamily: 'Poppins, sans-serif',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#3252DF',
                      boxShadow: '0px 8px 15px rgba(50, 82, 223, 0.3)',
                    },
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: '#152c5b' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                '& .MuiPaper-root': {
                  minWidth: '200px',
                  mt: 1,
                  borderRadius: '8px',
                  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#152c5b',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      color: '#4e6ae3',
                    },
                  }}
                >
                  {page.name}
                </MenuItem>
              ))}
              {isLoggedIn ? (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    handleLogout();
                  }}
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#d32f2f',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  Logout
                </MenuItem>
              ) : (
                <>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/Register"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#3252DF',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    Register
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/Login"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#3252DF',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    Login
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav_User;
