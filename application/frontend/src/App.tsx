import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Router } from './router';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router />
  </React.Fragment>
);

export { App };
