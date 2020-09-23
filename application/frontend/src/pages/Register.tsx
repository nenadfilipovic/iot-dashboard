import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import { User, UserAttributesCasting, ReactSVGComponent } from '../types';
import { registerUser } from '../actions';
import { RootState } from '../types/StateTypes';

const {
  userFirstName,
  userLastName,
  userHandle,
  userEmailAddress,
  userPassword,
} = UserAttributesCasting;

const Register = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authState = (state: RootState) => state.authReducer.isLoggedIn;

  const isLoggedIn = useSelector(authState);

  if (isLoggedIn) {
    navigate('/');
  }

  const { control, handleSubmit } = useForm<User>({
    defaultValues: {
      userFirstName: '',
      userLastName: '',
      userHandle: '',
      userEmailAddress: '',
      userPassword: '',
    },
  });

  const onSubmit = (data: User) => {
    dispatch(registerUser(data));
  };

  const inputFieldData = [
    {
      label: 'First Name',
      name: userFirstName,
      control,
      icon: PersonIcon,
    },
    {
      label: 'Last Name',
      name: userLastName,
      control,
      icon: PeopleIcon,
    },
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
    {
      label: 'Email',
      name: userEmailAddress,
      control,
      icon: AlternateEmailIcon,
    },
  ];

  const registerForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Register"
        headerSubtitle="Please enter your data to register new account."
        headerIcon={VpnKeyIcon as ReactSVGComponent}
        bodyContent={
          <Grid container direction="column" spacing={2}>
            {inputFieldData.map((field) => (
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
              Register
            </Button>
            <Button color="primary" component={NavLink} to={'/login'}>
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
