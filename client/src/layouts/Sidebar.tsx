import React from 'react';
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
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FaceIcon from '@material-ui/icons/Face';
import PhonelinkRingIcon from '@material-ui/icons/PhonelinkRing';

import avatar from '../assets/images/avatar.svg';
import { MenuItem } from '../components/MenuItem';
import { Logo } from '../components/Logo';
import { UserAvatar } from '../components/UserAvatar';
import { ReactSVGComponent, RootState } from '../types';

const navigationItems = [
  {
    itemPath: '/',
    itemTitle: 'Home',
    itemIcon: DashboardIcon,
  },
  {
    itemPath: '/devices',
    itemTitle: 'Devices',
    itemIcon: PhonelinkRingIcon,
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
      width: theme.customProperties.sideBarWidth,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '0 16px',
    },
    userProfile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '48px 0',
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

  const userData = useSelector((state: RootState) => state.userReducer.user);

  const sidebarContent = (
    <Box className={classes.sidebarContent}>
      <Box display="flex" flexDirection="column">
        <Logo height="64" width="64" />
        <Divider />
        <Box className={classes.userProfile}>
          <UserAvatar image={avatar} />
          <Typography
            variant="h6"
            children={`${userData?.firstName} ${userData?.lastName}`}
          />
          <Typography
            color="textSecondary"
            variant="subtitle2"
            children={`@${userData?.handle}`}
          />
        </Box>
      </Box>
      <Divider />
      <Box marginTop="16px">
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
