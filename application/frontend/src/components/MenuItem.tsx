import React from 'react';
import {
  ListItem,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { MenuItemAttributes } from '../types';

//dirty
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: 0,
      display: 'flex',
    },
    itemIcon: {
      marginRight: theme.spacing(1),
    },
    itemTitle: {
      textTransform: 'none',
    },
    itemButton: {
      padding: '10px 20px',
      justifyContent: 'flex-start',
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
    <ListItem className={classes.item} disableGutters>
      <Button
        fullWidth
        className={classes.itemButton}
        component={NavLink}
        to={itemPath}
      >
        <Icon className={classes.itemIcon} />
        <Typography className={classes.itemTitle}>{itemTitle}</Typography>
      </Button>
    </ListItem>
  );
};

export { MenuItem };
