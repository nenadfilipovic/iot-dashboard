import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { routes } from './router';

const App = () => {
  const router = useRoutes(routes);
  return (
    <React.Fragment>
      <CssBaseline />
      {router}
    </React.Fragment>
  );
};

export { App };
