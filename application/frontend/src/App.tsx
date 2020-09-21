import React from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';

import { routes } from './router';
import { store } from './store';

const App = () => {
  const router = useRoutes(routes);
  return (
    <Provider store={store}>
      <CssBaseline />
      {router}
    </Provider>
  );
};

export { App };
