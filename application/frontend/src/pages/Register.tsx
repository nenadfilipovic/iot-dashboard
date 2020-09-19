import React from 'react';
import {
  Grid,
  Button,
  Container,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import PeopleIcon from '@material-ui/icons/People';
import PublicIcon from '@material-ui/icons/Public';

import { PageSegment } from '../components/PageSegment';
import {
  UserAttributes,
  UserAttributesCasting,
  ReactIconComponent,
} from '../types';

const {
  userFirstName,
  userLastName,
  userUniqueId,
  userEmail,
  userLocation,
  userImage,
  userPassword,
} = UserAttributesCasting;

const Register = () => {
  const { control, handleSubmit } = useForm<UserAttributes>({
    defaultValues: {
      userFirstName: '',
      userLastName: '',
      userUniqueId: '',
      userEmail: '',
      userLocation: '',
      userImage: '',
      userPassword: '',
    },
  });

  const onSubmit = (data: UserAttributes) => console.log(data);

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
      name: userUniqueId,
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
      name: userEmail,
      control,
      icon: AlternateEmailIcon,
    },
    {
      label: 'Country',
      name: userLocation,
      control,
      icon: PublicIcon,
      select: true,
    },
  ];

  const registerForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Register"
        headerSubtitle="Please enter your data to register new account."
        headerIcon={VpnKeyIcon as ReactIconComponent}
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
