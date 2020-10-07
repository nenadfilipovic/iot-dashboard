import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, Theme, createStyles, Backdrop } from '@material-ui/core';

import { RootState } from '../types';
import Image from '../assets/images/loader.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spinner: {
      height: '75',
      width: '75',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

const Loader = () => {
  const classes = useStyles();

  const isLoading = useSelector(
    (state: RootState) => state.systemReducer.isLoading,
  );

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <img alt="Loading" className={classes.spinner} src={Image} />
    </Backdrop>
  );
};

export { Loader };
