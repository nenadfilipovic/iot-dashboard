import React, { useState } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Container,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { PageSegment } from '../components/PageSegment';
import { RegisterAttributes } from '../types';
import { InputField } from '../components/InputField';

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
      label: 'First name',
      value: registerData.firstName,
      name: 'firstname',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setRegisterData({
          ...registerData,
          firstName: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Last name',
      value: registerData.lastName,
      name: 'lastname',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setRegisterData({
          ...registerData,
          lastName: event.currentTarget.value,
        }),
      inputRef: register,
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
    },
  ];

  const onSubmit = (data: RegisterAttributes) => console.log(data);

  return (
    <Container className={classes.root} maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageSegment
          title="Register"
          subheader="Please enter data into required fields."
          icon={VpnKeyIcon as React.FC<React.SVGProps<SVGSVGElement>>}
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
  );
};

export { Register };
