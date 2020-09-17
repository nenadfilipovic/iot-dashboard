import React, { useState } from 'react';
import { Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dashboardWrapper: {
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    dashboardContainer: {
      flex: '1 1 auto',
    },
    bodyContainer: { display: 'flex' },
    contentContainer: {
      flex: '1',
      padding: '20px',
    },
  }),
);

const Basic = () => {
  const classes = useStyles();

  const basicLayoutContent = (
    <Box className={classes.dashboardWrapper}>
      <Box className={classes.dashboardContainer}>
        <Header onNavOpen={() => {}} />
        <Box className={classes.bodyContainer}>
          <Box className={classes.contentContainer}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return <div>{basicLayoutContent}</div>;
};

export { Basic };
