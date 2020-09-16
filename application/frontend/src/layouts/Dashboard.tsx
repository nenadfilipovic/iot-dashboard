import React, { useState } from 'react';
import { Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dashboardWrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    dashboardContainer: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
    },
    headerContainer: {},
    bodyContainer: {
      flex: '1',
      display: 'flex',
    },
    sidebarContainer: {
      flex: '0',
      [theme.breakpoints.up('lg')]: {
        flex: '0 1 250px',
      },
    },
    contentContainer: {
      flex: '1',
      padding: '20px',
    },
  }),
);

const Dashboard = () => {
  const classes = useStyles();

  const [isNavOpen, setNavOpen] = useState(false);

  const dashboardContent = (
    <Box className={classes.dashboardWrapper}>
      <Box className={classes.dashboardContainer}>
        <Box className={classes.headerContainer}>
          <Header onNavOpen={() => setNavOpen(true)} />
        </Box>
        <Box className={classes.bodyContainer}>
          <Box className={classes.sidebarContainer}>
            <Sidebar
              isNavOpen={isNavOpen}
              onNavClose={() => setNavOpen(false)}
            />
          </Box>
          <Box className={classes.contentContainer}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return <div>{dashboardContent}</div>;
};

export { Dashboard };
