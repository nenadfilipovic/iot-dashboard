import React from 'react';
import { BrowserRouter as AppRouter, Switch, Route } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { Devices } from '../pages/Devices';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';
import { Settings } from '../pages/Settings';

const Router = () => (
  <AppRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/devices" component={Devices} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/register" component={Register} />
      <Route path="/settings" component={Settings} />
    </Switch>
  </AppRouter>
);

export { Router };
