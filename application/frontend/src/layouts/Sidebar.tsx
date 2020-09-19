import React from 'react';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import MemoryIcon from '@material-ui/icons/Memory';
import FaceIcon from '@material-ui/icons/Face';
import { NavLink } from 'react-router-dom';
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
import { UserAttributes, ReactIconComponent } from '../types';

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
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarContent: {
      backgroundColor: theme.custom.sidebarBackgroundColor,
      width: theme.custom.sidebarWidth,
    },
  }),
);

// TODO replace with global state
const userData: UserAttributes = {
  userImage: avatar,
  userFirstName: 'Nenad',
  userLastName: 'Filipovic',
  userUniqueId: 'nenadfilipovic',
  userEmail: 'nenad@nenad.com',
  userLocation: 'Serbia',
  userLastLogin: '2 days ago',
  userCreatedAccount: '18/09/2020',
};
//

const Sidebar = ({
  isNavOpen,
  onNavClose,
}: {
  isNavOpen: boolean;
  onNavClose: () => void;
}) => {
  const classes = useStyles();

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
          <UserAvatar image={userData.userImage} />
          <Typography
            children={`${userData.userFirstName} ${userData.userLastName}`}
            variant="h5"
          />
          <Link underline="none" component={NavLink} to="/app/profile">
            <Typography
              children={userData.userUniqueId}
              color="secondary"
              variant="body2"
            />
          </Link>
        </Box>
        <Box textAlign="center" display="flex" justifyContent="space-around">
          <Box>
            <Typography children={'Location'} variant="body1" />
            <Typography
              children={userData.userLocation}
              color="textSecondary"
              variant="body2"
            />
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <Typography children={'Last login'} variant="body1" />
            <Typography
              children={userData.userLastLogin}
              color="textSecondary"
              variant="body2"
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box p={2}>
        <List disablePadding>
          {navigationItems.map((item) => (
            <MenuItem
              itemIcon={item.itemIcon as ReactIconComponent}
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
