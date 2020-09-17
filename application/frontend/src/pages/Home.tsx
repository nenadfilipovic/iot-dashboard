import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Button,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Home = () => {
  const classes = useStyles();

  // WIP

  const landingPage = (
    <Paper>
      <Box p={2}>
        <Typography variant="h4">Welcome back, Nenad.</Typography>
        <Typography variant="body1">
          Your last login: 19-09-2020 - 22days ago.
        </Typography>
        <Typography variant="subtitle1">Your devices</Typography>
        <Button>Go to devices</Button>
        <Typography variant="subtitle1">Your profile</Typography>
        <Button>Go to profile</Button>
      </Box>
    </Paper>
  );

  return <React.Fragment>{landingPage}</React.Fragment>;
};

export { Home };
