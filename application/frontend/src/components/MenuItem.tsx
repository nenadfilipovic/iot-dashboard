import React from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  ListItem,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { MenuItemAttributes } from '../types';

//dirty
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItemButton: {
      padding: '10px',
      '& $span': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    menuItemButtonActive: {
      '& $span': {
        color: theme.palette.secondary.main,
      },
      '& $svg': {
        color: theme.palette.secondary.main,
      },
      backgroundColor: theme.palette.grey[100],
    },
    menuItemIcon: {
      marginRight: theme.spacing(1),
    },
    menuItemTitle: {
      textTransform: 'none',
      marginRight: 'auto',
    },
  }),
);
//

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
        <Typography
          children={itemTitle}
          className={classes.menuItemTitle}
          variant="button"
        />
      </Button>
    </ListItem>
  );
};

export { MenuItem };
