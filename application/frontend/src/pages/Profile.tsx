import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  Box,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  CardHeader,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { Layout } from '../components';

interface Profile {
  firstName: String;
  lastName: string;
  email: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 270,
      },
    },
    card: {
      borderRadius: '5px',
      padding: '10px',
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
    },
  }),
);

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, errors } = useForm<Profile>();
  const onSubmit = (data: Profile) => console.log(data);
  const [values, setValues] = useState({
    firstName: 'Nenad',
    lastName: 'Filipovic',
    email: 'nenad@nenad.com',
    password: 'nenad123',
  });
  const classes = useStyles();
  return (
    <>
      <Layout />
      <Box className={classes.wrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.content} m={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box m={1}>
                <Card className={classes.card}>
                  <CardHeader
                    title={
                      <Typography variant="h6">Profile details:</Typography>
                    }
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="First name"
                          name="firstName"
                          value={values.firstName}
                          inputRef={register({ required: true })}
                          onChange={(event) =>
                            setValues({
                              ...values,
                              firstName: event.target.value,
                            })
                          }
                        />
                        {errors.firstName && 'First name is required'}
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Last name"
                          name="lastName"
                          value={values.lastName}
                          inputRef={register({ required: true })}
                          onChange={(event) =>
                            setValues({
                              ...values,
                              lastName: event.target.value,
                            })
                          }
                        />
                        {errors.lastName && 'Last name is required'}
                      </Grid>
                      <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={values.email}
                          inputRef={register({ required: true })}
                          onChange={(event) =>
                            setValues({ ...values, email: event.target.value })
                          }
                        />
                        {errors.email && 'Email is required'}
                      </Grid>
                      <Grid style={{ display: 'flex' }} item md={4} xs={12}>
                        <TextField
                          type={showPassword ? 'text' : 'password'}
                          fullWidth
                          label="password"
                          name="password"
                          value={values.password}
                          inputRef={register({ required: true })}
                          onChange={(event) =>
                            setValues({
                              ...values,
                              password: event.target.value,
                            })
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  disableRipple
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        {errors.password && 'Password is required'}
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                  </Box>
                </Card>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Profile };
