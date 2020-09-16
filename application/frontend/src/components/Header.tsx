import React from 'react';
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

import { Logo } from './Logo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginLeft: 'auto',
    },
  }),
);

const Header = ({ onNavOpen }: { onNavOpen: () => void }) => {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar>
        <Logo />
        <Hidden lgUp>
          <IconButton
            onClick={onNavOpen}
            className={classes.menuButton}
            color="inherit"
          >
            <ViewListIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
