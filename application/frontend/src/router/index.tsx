import React from 'react';
import { BrowserRouter as AppRouter, Switch, Route } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core';

import { Dashboard } from '../pages/Dashboard';
import { Devices } from '../pages/Devices';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';
import { Layout } from '../components/';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 270,
      },
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
    },
  }),
);

const Router = () => {
  const classes = useStyles();
  return (
    <AppRouter>
      <Layout />
      <Switch>
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Route exact path="/" component={Dashboard} />
              <Route path="/devices" component={Devices} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
              <Route path="/register" component={Register} />
            </div>
          </div>
        </div>
      </Switch>
    </AppRouter>
  );
};

export { Router };
