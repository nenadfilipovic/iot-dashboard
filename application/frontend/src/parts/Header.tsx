import React from 'react';
import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Theme,
  Typography,
  createStyles,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';

import { Logo } from '../components/Logo';

interface Header {
  onNavOpen: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
    },
  }),
);

const Header = ({ onNavOpen }: Header) => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Logo />
        <Typography className={classes.title} variant="h6">
          IOT Dashboard
        </Typography>
        <Hidden mdDown>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onNavOpen}>
            <ListIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export { Header };