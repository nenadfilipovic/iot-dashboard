import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

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
import { UserAttributes, UserTypesCasting, ReactSVGComponent } from '../types';
import { logUserIn } from '../actions';

const { handle, password } = UserTypesCasting;

const loginSchema = Joi.object({
  handle: Joi.string().alphanum().min(5).required(),
  password: Joi.string().min(7).required(),
});

const Login = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, errors } = useForm<UserAttributes>({
    defaultValues: { handle: '', password: '' },
    resolver: joiResolver(loginSchema),
  });

  const onSubmit = (data: UserAttributes) => {
    dispatch(logUserIn(data));
  };

  const formFields = [
    {
      label: 'Handle',
      name: handle,
      control,
      error: !!errors.handle?.message,
      helperText: errors.handle?.message,
      icon: PermIdentityIcon,
    },
    {
      label: 'Password',
      name: password,
      control,
      error: !!errors.password?.message,
      helperText: errors.password?.message,
      icon: LockIcon,
    },
  ];

  const loginForm = (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <PageSegment
        title="Login"
        subtitle="Please enter your login details"
        icon={LockOpenIcon as ReactSVGComponent}
        content={
          <Grid container direction="column" spacing={2}>
            {formFields.map((field) => (
              <Grid key={field.name} item>
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
        actions={
          <React.Fragment>
            <Button color="secondary" variant="contained" type="submit">
              Login
            </Button>
            <Button component={NavLink} to={'/register'}>
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
