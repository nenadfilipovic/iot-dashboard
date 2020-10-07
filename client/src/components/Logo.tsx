import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

import Image from '../assets/images/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logoTitle: {},
  }),
);

const Logo = ({ width, height }: { height: string; width: string }) => {
  const classes = useStyles();

  return (
    <img
      style={{ verticalAlign: 'middle' }}
      src={Image}
      alt="Logo"
      width={width}
      height={height}
    />
  );
};

export { Logo };
