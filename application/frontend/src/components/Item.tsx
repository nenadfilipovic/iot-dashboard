import React from 'react';
import {
  ListItem,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

interface Item {
  path: string;
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      padding: 0,
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    text: {
      textTransform: 'none',
    },
    button: {
      width: '100%',
      padding: '10px 20px',
      justifyContent: 'flex-start',
    },
  }),
);

const Item = ({ path, title, icon: Icon }: Item) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.item} disableGutters>
      <Button className={classes.button} component={NavLink} to={path}>
        {Icon && <Icon className={classes.icon} />}
        <span className={classes.text}>{title}</span>
      </Button>
    </ListItem>
  );
};

export { Item };
