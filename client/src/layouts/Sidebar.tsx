import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Hidden,
  Drawer,
  Box,
  Typography,
  Divider,
  makeStyles,
  Theme,
  createStyles,
  List,
  Link,
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import avatar from '../assets/images/avatar.svg';
import { MenuItem } from '../components/MenuItem';
import { Logo } from '../components/Logo';
import { UserAvatar } from '../components/UserAvatar';
import { UserAttributes, ReactSVGComponent, RootState } from '../types';

const navigationItems = [
  {
    itemPath: '/',
    itemTitle: 'Home',
    itemIcon: InsertChartIcon,
  },
  {
    itemPath: '/devices',
    itemTitle: 'Devices',
    itemIcon: InsertChartIcon,
  },
  {
    itemPath: '/profile',
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
    sidebarContent: {
      width: 300,
    },
  }),
);

const Sidebar = ({
  isNavOpen,
  onNavClose,
}: {
  isNavOpen: boolean;
  onNavClose: () => void;
}) => {
  const classes = useStyles();

  const userData = {
    firstName: 'nenad',
    lastName: 'filipovic',
    handle: 'nenad88',
    emailAddress: 'nenad@nenad.com',
  };

  const sidebarContent = (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      className={classes.sidebarContent}
    >
      <Box display="flex" flexDirection="column" padding="0 16px 16px 16px">
        <Logo height="24" width="24" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin={'50px 0 50px 0'}
        >
          <UserAvatar image={avatar} />
          <Typography
            children={`${userData.lastName} ${userData.lastName}`}
            variant="h5"
          />
          <Link underline="none" component={NavLink} to="/app/profile">
            <Typography
              children={userData.handle}
              color="secondary"
              variant="body2"
            />
          </Link>
        </Box>
      </Box>
      <Divider />
      <Box p={2}>
        <List disablePadding>
          {navigationItems.map((item) => (
            <MenuItem
              itemIcon={item.itemIcon as ReactSVGComponent}
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
        <Drawer variant="temporary" open={isNavOpen} onClose={onNavClose}>
          {sidebarContent}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer open variant="persistent">
          {sidebarContent}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

export { Sidebar };
