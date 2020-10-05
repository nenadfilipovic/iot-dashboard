import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import InsertChartIcon from '@material-ui/icons/InsertChart';
import FaceIcon from '@material-ui/icons/Face';
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

import avatar from '../assets/images/avatar.svg';
import { MenuItem } from '../components/MenuItem';
import { Logo } from '../components/Logo';
import { UserAvatar } from '../components/UserAvatar';
import { User, ReactSVGComponent, RootState } from '../types';

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

  const currentUser = useSelector(
    (state: RootState) => state.notificationReducer.message,
  );

  console.log(currentUser);

  const userData: User = {
    userFirstName: 'nenad',
    userLastName: 'filipovic',
    userHandle: 'nenad88',
    userEmailAddress: 'nenad@nenad.com',
  };

  const sidebarContent = (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      className={classes.sidebarContent}
    >
      <Box display="flex" flexDirection="column" padding="0 16px 16px 16px">
        <Logo />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin={'50px 0 50px 0'}
        >
          <UserAvatar image={avatar} />
          <Typography
            children={`${userData.userFirstName} ${userData.userLastName}`}
            variant="h5"
          />
          <Link underline="none" component={NavLink} to="/app/profile">
            <Typography
              children={userData.userHandle}
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