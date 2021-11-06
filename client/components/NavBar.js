import { useTheme } from '@emotion/react';
import { Home, Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { pink } from '@mui/material/colors';
import { styled } from '@mui/system';
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authHelper from '../helpers/auth-helper';

const NavBar = () => {
  const theme = useTheme();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    authHelper.clearJwt(() => navigate('/'));
    handleClose();
  };

  const goToProfile = () => {
    handleClose();
    const userId = authHelper.isAuthenticated().user._id;
    navigate(`/users/${userId}`);
  };

  const isActive = (path) => {
    if (location.pathname === path) return pink['300'];
    else return '#fff';
  };

  return (
    <>
      <AppBar>
        <Toolbar position='static'>
          <Typography variant='h6' color='inherit'>
            Social App
          </Typography>
          <Link to='/'>
            <IconButton>
              <Home sx={{ color: isActive('/') }} />
            </IconButton>
          </Link>
          <Link to='users'>
            <Button sx={{ color: isActive('/users') }}>Users</Button>
          </Link>

          <Typography sx={{ flexGrow: 1 }}></Typography>
          {authHelper.isAuthenticated() ? (
            <>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={goToProfile}>Profile</MenuItem>
                <MenuItem onClick={signOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link to='signin'>
                <Button sx={{ color: isActive('/signin') }}>Sign In</Button>
              </Link>
              <Link to='signup'>
                <Button sx={{ color: isActive('/signup') }}>Sign Up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default NavBar;
