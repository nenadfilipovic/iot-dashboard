import React from 'react';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import MemoryIcon from '@material-ui/icons/Memory';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  Hidden,
  Drawer,
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import avatar from '../assets/images/avatar.svg';
import { Item } from '../components/Item';

const user = {
  image: avatar,
  firstName: 'Nenad',
  lastName: 'Filipovic',
  email: 'nenad@nenad.com',
};

interface Sidebar {
  onNavClose: () => void;
  open: boolean;
}

const navigationItems = [
  {
    path: '/',
    title: 'Dashboard',
    icon: InsertChartIcon as React.SFC<React.SVGProps<SVGSVGElement>>,
  },
  {
    path: '/devices',
    title: 'Devices',
    icon: MemoryIcon as React.SFC<React.SVGProps<SVGSVGElement>>,
  },
  {
    path: '/profile',
    title: 'Profile',
    icon: FaceIcon as React.SFC<React.SVGProps<SVGSVGElement>>,
  },
  {
    path: '/logout',
    title: 'Logout',
    icon: ExitToAppIcon as React.SFC<React.SVGProps<SVGSVGElement>>,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    desktop: {
      zIndex: 0,
      width: 270,
      top: 64,
      height: 'calc(100%-64px)',
    },
    mobile: {
      width: 270,
    },
    image: {
      width: 75,
      height: 75,
    },
  }),
);

const Sidebar = ({ onNavClose, open }: Sidebar) => {
  const classes = useStyles();
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={5}>
        <Avatar className={classes.image} src={user.image} />
        <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography variant="body1">{`${user.email}`}</Typography>
      </Box>
      <Divider />
      <Box p={1}>
        <List>
          {navigationItems.map((item) => (
            <Item path={item.path} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <React.Fragment>
      <Hidden lgUp>
        <Drawer
          onClose={onNavClose}
          classes={{ paper: classes.mobile }}
          variant="temporary"
          open={open}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer open classes={{ paper: classes.desktop }} variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export { Sidebar };
