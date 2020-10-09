import React from 'react';

import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
} from '@material-ui/core';

import Image from '../assets/images/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoTitle: {
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
);

const Logo = ({ width, height }: { height: string; width: string }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <img
        style={{ verticalAlign: 'middle' }}
        src={Image}
        alt="Logo"
        width={width}
        height={height}
      />
      <Typography className={classes.logoTitle} children="IOT Dashboard" />
    </Box>
  );
};

export { Logo };
