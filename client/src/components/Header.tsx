import React from 'react';
import { useDispatch } from 'react-redux';

import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { thunkLogUserOut } from '../actions';
import { Logo } from './Logo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 16px',
    },
    button: {
      marginLeft: 'auto',
    },
  }),
);

const Header = ({ onNavOpen }: { onNavOpen: () => void }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="relative" color="transparent">
      <Toolbar disableGutters>
        <Hidden lgUp>
          <Logo height="64xp" width="64px" />
          <IconButton className={classes.button} onClick={onNavOpen}>
            <ViewListIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(thunkLogUserOut());
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <IconButton
            className={classes.button}
            onClick={() => {
              dispatch(thunkLogUserOut());
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
