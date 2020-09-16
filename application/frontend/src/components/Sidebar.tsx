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
import { MenuItem } from './MenuItem';

const navigationItems = [
  {
    itemPath: '/app/home',
    itemTitle: 'Home',
    itemIcon: InsertChartIcon,
  },
  {
    itemPath: '/app/devices',
    itemTitle: 'Devices',
    itemIcon: MemoryIcon,
  },
  {
    itemPath: '/app/profile',
    itemTitle: 'Profile',
    itemIcon: FaceIcon,
  },
  {
    itemPath: '/logout',
    itemTitle: 'Logout',
    itemIcon: ExitToAppIcon,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    desktopSidebar: {
      zIndex: 0,
      width: theme.customProperties.sidebarWidth,
      top: theme.customProperties.appBarHeight,
      height: `calc(100%-${theme.customProperties.appBarHeight})`,
    },
    mobileSidebar: {
      width: theme.customProperties.sidebarWidth,
    },
    sidebarContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    sidebarHeader: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '25px 0 15px 0',
    },
    sidebarAvatar: {
      width: 75,
      height: 75,
    },
    sidebarNavigation: {},
  }),
);

const user = {
  image: avatar,
  firstName: 'Nenad',
  lastName: 'Filipovic',
  email: 'nenad@nenad.com',
};

const Sidebar = ({
  isNavOpen,
  onNavClose,
}: {
  isNavOpen: boolean;
  onNavClose: () => void;
}) => {
  const classes = useStyles();

  const sidebarContent = (
    <Box className={classes.sidebarContainer}>
      <Box className={classes.sidebarHeader}>
        <Avatar className={classes.sidebarAvatar} src={user.image} />
        <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography variant="body2">{`${user.email}`}</Typography>
      </Box>
      <Divider />
      <Box className={classes.sidebarNavigation}>
        <List>
          {navigationItems.map((item) => (
            <MenuItem
              itemIcon={
                item.itemIcon as React.FC<React.SVGProps<SVGSVGElement>>
              }
              itemPath={item.itemPath}
              itemTitle={item.itemTitle}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <React.Fragment>
      <Hidden lgUp>
        <Drawer
          classes={{ paper: classes.mobileSidebar }}
          variant="temporary"
          open={isNavOpen}
          onClose={onNavClose}
        >
          {sidebarContent}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          open
          classes={{ paper: classes.desktopSidebar }}
          variant="persistent"
        >
          {sidebarContent}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export { Sidebar };
