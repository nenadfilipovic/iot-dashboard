import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  makeStyles,
  createStyles,
  Theme,
  Container,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { Logo } from '../components/Logo';

interface Login {
  userName: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
    },
    card: {
      borderRadius: '5px',
      padding: '10px',
    },
    input: {
      margin: '2px 0',
    },
  }),
);

const Login = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<Login>();
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });
  const onSubmit = (data: Login) => console.log(data);
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box m={1}>
          <Card className={classes.card}>
            <CardHeader
              avatar={<Logo />}
              title="Login:"
              subheader="Please enter your login details."
            />
            <CardContent>
              <TextField
                className={classes.input}
                label="username"
                value={values.userName}
                name="username"
                inputRef={register}
                fullWidth
                onChange={(event) =>
                  setValues({ ...values, userName: event.target.value })
                }
              />
              <TextField
                className={classes.input}
                label="password"
                value={values.password}
                name="password"
                inputRef={register}
                fullWidth
                onChange={(event) =>
                  setValues({ ...values, password: event.target.value })
                }
              />
            </CardContent>
            <CardActions>
              <Button type="submit">Login</Button>
              <Button component={NavLink} to={'/register'}>
                Register
              </Button>
            </CardActions>
          </Card>
        </Box>
      </form>
    </Container>
  );
};

export { Login };
