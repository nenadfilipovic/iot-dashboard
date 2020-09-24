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

import { logUserOut } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginLeft: 'auto',
    },
  }),
);

const Header = ({ onNavOpen }: { onNavOpen: () => void }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <AppBar color="transparent" elevation={0} position="relative">
      <Toolbar>
        <Hidden lgUp>
          <IconButton onClick={onNavOpen}>
            <ViewListIcon />
          </IconButton>
        </Hidden>
        <IconButton
          className={classes.menuButton}
          onClick={() => {
            dispatch(logUserOut());
          }}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
