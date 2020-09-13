import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  Grid,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { PageSegment } from '../components/PageSegment';
import { InputField } from '../components/InputField';
import { LoginAttributes } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '25px',
    },
  }),
);

const Login = () => {
  const { register, handleSubmit } = useForm<LoginAttributes>();

  const [loginData, setLoginData] = useState<LoginAttributes>({
    username: '',
    password: '',
  });

  const classes = useStyles();

  const inputFieldData = [
    {
      label: 'Username',
      value: loginData.username,
      name: 'username',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setLoginData({
          ...loginData,
          username: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Password',
      value: loginData.password,
      name: 'password',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setLoginData({
          ...loginData,
          password: event.currentTarget.value,
        }),
      inputRef: register,
    },
  ];

  const onSubmit = (data: LoginAttributes) => console.log(data);

  return (
    <Container className={classes.root} maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageSegment
          title="Login"
          subheader="Please enter your login details."
          icon={LockOpenIcon as React.FC<React.SVGProps<SVGSVGElement>>}
          content={
            <Grid container direction="column" spacing={2}>
              {inputFieldData.map((item) => (
                <Grid item>
                  <InputField {...item} fullWidth />
                </Grid>
              ))}
            </Grid>
          }
          actions={
            <React.Fragment>
              <Button color="primary" variant="contained" type="submit">
                Login
              </Button>
              <Button color="primary" component={NavLink} to={'/register'}>
                Register
              </Button>
            </React.Fragment>
          }
        />
      </form>
    </Container>
  );
};

export { Login };
