import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Home = () => {
  const classes = useStyles();

  // WIP

  const landingPage = (
    <Paper>
      <Typography variant="h5">
        Welcome to IOT Dashboard landing page
      </Typography>
      <Typography variant="subtitle1">
        Please consider logging in or registering new account
      </Typography>
      <Button>Login</Button>
      <Button>Register</Button>
    </Paper>
  );

  return <React.Fragment>{landingPage}</React.Fragment>;
};

export { Home };
