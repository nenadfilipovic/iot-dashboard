import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, makeStyles, Theme, createStyles } from '@material-ui/core';

import { Header } from '../components/Header';
import { Sidebar } from './Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarContainer: {
      [theme.breakpoints.up('lg')]: {
        flex: `0 1 ${theme.customProperties.sideBarWidth}`,
      },
    },
  }),
);

const Dashboard = () => {
  const classes = useStyles();

  const [isNavOpen, setNavOpen] = useState(false);

  const dashboardContent = (
    <Box width="100%" height="100%" display="flex">
      <Box display="flex" flex="1 1 auto">
        <Box className={classes.sidebarContainer}>
          <Sidebar isNavOpen={isNavOpen} onNavClose={() => setNavOpen(false)} />
        </Box>
        <Box flex="1">
          <Header onNavOpen={() => setNavOpen(true)} />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );

  return <React.Fragment>{dashboardContent}</React.Fragment>;
};

export { Dashboard };
