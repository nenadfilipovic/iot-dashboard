import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';

import { PageSegment } from '../components/PageSegment';
import { UserAttributes, UserAttributesCasting } from '../types';

const { username, password } = UserAttributesCasting;

const Login = () => {
  const { control, handleSubmit } = useForm<UserAttributes>({
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (data: UserAttributes) => console.log(data);

  const loginFormFields = [
    {
      label: 'Username',
      name: username,
      control,
      icon: PermIdentityIcon,
    },
    {
      label: 'Password',
      name: password,
      control,
      icon: LockIcon,
    },
  ];

  const loginForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Login"
        headerSubtitle="Please enter your login details."
        headerIcon={LockOpenIcon as React.FC<React.SVGProps<SVGSVGElement>>}
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
