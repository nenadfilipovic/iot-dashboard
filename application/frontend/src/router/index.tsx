import React from 'react';
import { BrowserRouter as AppRouter, Switch, Route } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { Devices } from '../pages/DeviceList';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';
import { Device } from '../pages/Device';

const Router = () => {
  return (
    <AppRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/devices" component={Devices} />
        <Route exact path="/devices/:id" component={Device} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </AppRouter>
  );
};

export { Router };
