import React, { useState } from 'react';
import {
  CardContent,
  TextField,
  CardActions,
  Button,
  Card,
  makeStyles,
  Theme,
  createStyles,
  Box,
  Container,
  CardHeader,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { Logo } from '../components/Logo';

interface Register {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
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

const Register = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<Register>();
  const onSubmit = (data: Register) => console.log(data);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box m={1}>
          <Card className={classes.card}>
            <CardHeader
              avatar={<Logo />}
              title="Register:"
              subheader="Please enter data into required fields."
            />
            <CardContent>
              <TextField
                className={classes.input}
                label="firstname"
                value={values.firstName}
                name="firstname"
                inputRef={register}
                fullWidth
                onChange={(event) =>
                  setValues({ ...values, firstName: event.target.value })
                }
              />
              <TextField
                className={classes.input}
                label="lastname"
                value={values.lastName}
                name="lastname"
                inputRef={register}
                fullWidth
                onChange={(event) =>
                  setValues({ ...values, lastName: event.target.value })
                }
              />
              <TextField
                className={classes.input}
                label="username"
                value={values.username}
                name="username"
                inputRef={register}
                fullWidth
                onChange={(event) =>
                  setValues({ ...values, username: event.target.value })
                }
              />
              <TextField
                className={classes.input}
                label="email"
                value={values.email}
                name="email"
                inputRef={register}
                fullWidth
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
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
              <Button type="submit">Register</Button>
              <Button component={NavLink} to={'/login'}>
                Login
              </Button>
            </CardActions>
          </Card>
        </Box>
      </form>
    </Container>
  );
};

export { Register };
