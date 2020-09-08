import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import { Logo } from './Logo';
import { Profile } from './Profile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      marginLeft: theme.spacing(3),
      flexGrow: 1,
    },
    profileButton: {
      padding: 0,
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Logo />
        <Typography color="secondary" className={classes.title} variant="h6">
          IOT Dashboard
        </Typography>
        <IconButton className={classes.profileButton}>
          <Profile />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
