import React from 'react';
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  StandardTextFieldProps,
  OutlinedTextFieldProps,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: '2px 0',
    },
  }),
);

const InputField = (props: StandardTextFieldProps | OutlinedTextFieldProps) => {
  const classes = useStyles();

  return <TextField className={classes.input} {...props} />;
};

export { InputField };
