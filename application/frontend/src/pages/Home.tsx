import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  Grid,
  Divider,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MemoryIcon from '@material-ui/icons/Memory';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    background: {
      backgroundColor: theme.custom.sidebarBackgroundColor,
    },
    backgroundBlue: {
      backgroundColor: '#F5F5F5',
    },
    color: {
      color: '#fff',
    },
    color2: {
      backgroundColor: '#ADEFD1FF',
    },
  }),
);

const Home = () => {
  const classes = useStyles();

  // WIP

  const landingPage = (
    <Box>
      <Box
        p={5}
        className={classes.background}
        display="flex"
        alignItems="center"
      >
        <Box>
          <Typography className={classes.title} variant="h5">
            Hello, Nenad!
          </Typography>
          <Typography variant="body1">
            Welcome back to your dashboard.
          </Typography>
        </Box>
        <Box textAlign="right" marginLeft="auto">
          <Typography variant="body2">Member since</Typography>
          <Typography variant="body2">19/09/2020</Typography>
        </Box>
      </Box>
    </Box>
  );

  return <React.Fragment>{landingPage}</React.Fragment>;
};

export { Home };
