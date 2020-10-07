import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  ListItem,
} from '@material-ui/core';

import { ReactSVGComponent } from '../types';

export interface MenuItemAttributes {
  itemPath: string;
  itemTitle: string;
  itemIcon: ReactSVGComponent;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItemButton: {
      padding: '10px',
      color: theme.palette.secondary.main,
    },
    menuItemButtonActive: {
      '& $p': {
        color: theme.palette.primary.main,
      },
      '& $svg': {
        color: theme.palette.primary.main,
      },
    },
    menuItemIcon: {
      marginRight: theme.spacing(1),
    },
    menuItemTitle: {
      marginRight: 'auto',
    },
  }),
);

const MenuItem = ({
  itemPath,
  itemTitle,
  itemIcon: Icon,
}: MenuItemAttributes) => {
  const classes = useStyles();

  return (
    <ListItem disableGutters dense>
      <Button
        activeClassName={classes.menuItemButtonActive}
        className={classes.menuItemButton}
        fullWidth
        component={NavLink}
        to={itemPath}
      >
        <Icon className={classes.menuItemIcon} />
        <Typography children={itemTitle} className={classes.menuItemTitle} />
      </Button>
    </ListItem>
  );
};

export { MenuItem };
