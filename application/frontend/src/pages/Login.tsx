import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  Grid,
  Theme,
  createStyles,
  makeStyles,
  TextField,
  Box,
  InputAdornment,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';

import { PageSegment } from '../components/PageSegment';

interface LoginAttributes {
  username: string;
  password: string;
}

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

  const loginFormFields = [
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
      icon: PermIdentityIcon,
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
      icon: LockIcon,
    },
  ];

  const onSubmit = (data: LoginAttributes) => console.log(data);

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageSegment
            headerTitle="Login"
            headerSubtitle="Please enter your login details."
            headerIcon={LockOpenIcon as React.FC<React.SVGProps<SVGSVGElement>>}
            bodyContent={
              <Grid container direction="column" spacing={2}>
                {loginFormFields.map((field) => (
                  <Grid item>
                    <TextField
                      variant="outlined"
                      {...field}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {<field.icon />}
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Grid>
                ))}
              </Grid>
            }
            bodyActions={
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
    </Box>
  );
};

export { Login };
