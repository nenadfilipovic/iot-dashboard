import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  Grid,
  Button,
  Container,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import PeopleIcon from '@material-ui/icons/People';

import { PageSegment } from '../components/PageSegment';
import { UserAttributes, UserTypesCasting, ReactSVGComponent } from '../types';
import { thunkRegisterUser } from '../actions';
import { userSchema } from '../validation';

const {
  firstName,
  lastName,
  handle,
  emailAddress,
  password,
} = UserTypesCasting;

const Register = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit, errors } = useForm<UserAttributes>({
    defaultValues: {
      firstName: '',
      lastName: '',
      handle: '',
      emailAddress: '',
      password: '',
    },
    resolver: joiResolver(userSchema),
  });

  const onSubmit = (data: UserAttributes) => {
    dispatch(thunkRegisterUser(data));
  };

  const formFields = [
    {
      label: 'First Name',
      name: firstName,
      control,
      error: !!errors.firstName?.message,
      helperText: errors.firstName?.message,
      icon: PersonIcon,
    },
    {
      label: 'Last Name',
      name: lastName,
      control,
      error: !!errors.lastName?.message,
      helperText: errors.lastName?.message,
      icon: PeopleIcon,
    },
    {
      label: 'Handle',
      name: handle,
      control,
      error: !!errors.handle?.message,
      helperText: errors.handle?.message,
      icon: PermIdentityIcon,
    },
    {
      label: 'Email',
      name: emailAddress,
      control,
      error: !!errors.emailAddress?.message,
      helperText: errors.emailAddress?.message,
      icon: AlternateEmailIcon,
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

  const registerForm = (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <PageSegment
        title="Register"
        subtitle="Please enter your data to register new account"
        icon={VpnKeyIcon as ReactSVGComponent}
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
              Register
            </Button>
            <Button component={NavLink} to={'/login'}>
              Login
            </Button>
          </React.Fragment>
        }
      />
    </form>
  );

  return <Container maxWidth="sm">{registerForm}</Container>;
};

export { Register };
