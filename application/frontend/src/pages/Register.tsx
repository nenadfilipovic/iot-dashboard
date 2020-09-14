import React, { useState } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Container,
  TextField,
  Box,
  InputAdornment,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import PeopleIcon from '@material-ui/icons/People';

import { PageSegment } from '../components/PageSegment';

interface RegisterAttributes {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '25px',
    },
  }),
);

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterAttributes>();

  const classes = useStyles();

  const [registerData, setRegisterData] = useState<RegisterAttributes>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const inputFieldData = [
    {
      label: 'First Name',
      value: registerData.firstName,
      name: 'firstname',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setRegisterData({
          ...registerData,
          firstName: event.currentTarget.value,
        }),
      inputRef: register,
      icon: PersonIcon,
    },
    {
      label: 'Last Name',
      value: registerData.lastName,
      name: 'lastname',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setRegisterData({
          ...registerData,
          lastName: event.currentTarget.value,
        }),
      inputRef: register,
      icon: PeopleIcon,
    },
    {
      label: 'Username',
      value: registerData.username,
      name: 'username',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setRegisterData({
          ...registerData,
          username: event.currentTarget.value,
        }),
      inputRef: register,
      icon: PermIdentityIcon,
    },
    {
      label: 'Email',
      value: registerData.email,
      name: 'email',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setRegisterData({
          ...registerData,
          email: event.currentTarget.value,
        }),
      inputRef: register,
      icon: AlternateEmailIcon,
    },
    {
      label: 'Password',
      value: registerData.password,
      name: 'password',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setRegisterData({
          ...registerData,
          password: event.currentTarget.value,
        }),
      inputRef: register,
      icon: LockIcon,
    },
  ];

  const onSubmit = (data: RegisterAttributes) => console.log(data);

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageSegment
            headerTitle="Register"
            headerSubtitle="Please enter data into required fields."
            headerIcon={VpnKeyIcon as React.FC<React.SVGProps<SVGSVGElement>>}
            bodyContent={
              <Grid container direction="column" spacing={2}>
                {inputFieldData.map((field) => (
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
                  Register
                </Button>
                <Button color="primary" component={NavLink} to={'/login'}>
                  Login
                </Button>
              </React.Fragment>
            }
          />
        </form>
      </Container>
    </Box>
  );
};

export { Register };
