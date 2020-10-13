import React from 'react';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from './theme';
import { Router } from './router';
import { Loader } from './components/Loader';
import { Notification } from './components/Notification';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Notification />
      <Loader />
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

export { App };
