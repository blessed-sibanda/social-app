import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import { CacheProvider } from '@emotion/react';
import MainRouter from './MainRouter';
import theme from './theme';

const App = ({ cache }) => {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <MainRouter />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default hot(module)(App);
