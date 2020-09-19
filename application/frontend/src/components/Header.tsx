import React from 'react';
import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

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
    <AppBar color="transparent" elevation={0} position="relative">
      <Toolbar>
        <Hidden lgUp>
          <IconButton onClick={onNavOpen}>
            <ViewListIcon />
          </IconButton>
        </Hidden>
        <IconButton className={classes.menuButton}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={() => {}}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
