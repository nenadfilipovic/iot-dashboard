import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';

import { PageSegment } from '../components/PageSegment';
import { User, UserAttributesCasting, ReactSVGComponent } from '../types';
import { logUserIn } from '../actions';

const { userHandle, userPassword } = UserAttributesCasting;

const Login = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<User>({
    defaultValues: { userHandle: '', userPassword: '' },
  });

  const onSubmit = (data: User) => {
    dispatch(logUserIn(data));
  };

  const loginFormFields = [
    {
      label: 'Username',
      name: userHandle,
      control,
      icon: PermIdentityIcon,
    },
    {
      label: 'Password',
      name: userPassword,
      control,
      icon: LockIcon,
    },
  ];

  const loginForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Login"
        headerSubtitle="Please enter your login details."
        headerIcon={LockOpenIcon as ReactSVGComponent}
        bodyContent={
          <Grid container direction="column" spacing={2}>
            {loginFormFields.map((field) => (
              <Grid item>
                <Controller
                  as={
                    <TextField
                      {...field}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {<field.icon />}
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  }
                  name={field.name}
                  control={field.control}
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
  );

  return <Container maxWidth="sm">{loginForm}</Container>;
};

export { Login };
