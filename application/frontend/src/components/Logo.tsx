import React from 'react';
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Box,
} from '@material-ui/core';

import Image from '../assets/images/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoTitle: {
      fontWeight: theme.typography.fontWeightMedium,
      marginLeft: theme.spacing(1),
    },
  }),
);

const Logo = () => {
  const classes = useStyles();

  return (
    <Box height="64px" display="flex" alignItems="center">
      <img
        style={{ verticalAlign: 'middle' }}
        src={Image}
        alt="Logo"
        width="24"
        height="24"
      />
      <Typography
        children={'IOT Dashboard'}
        variant="body1"
        className={classes.logoTitle}
      />
    </Box>
  );
};

export { Logo };
