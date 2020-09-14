import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Button,
  Box,
  makeStyles,
  Theme,
  createStyles,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { PageSegment } from '../components/PageSegment';

//diry
import { Layout } from '../parts';

//dirty
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 270,
      },
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
//

interface ProfileAttributes {
  firstName: String;
  lastName: string;
  email: string;
  password: string;
}

const Profile = () => {
  const { register, handleSubmit } = useForm<ProfileAttributes>();

  const [profileData, setProfileData] = useState<ProfileAttributes>({
    firstName: 'Nenad',
    lastName: 'Filipovic',
    email: 'nenad@nenad.com',
    password: 'nenad123',
  });

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const onSubmit = (data: ProfileAttributes) => console.log(data);

  const classes = useStyles();

  const profileFormFields = [
    {
      label: 'First Name',
      value: profileData.firstName,
      name: 'firstname',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setProfileData({
          ...profileData,
          firstName: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Last Name',
      value: profileData.lastName,
      name: 'lastname',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setProfileData({
          ...profileData,
          lastName: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Email',
      value: profileData.email,
      name: 'email',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setProfileData({
          ...profileData,
          email: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Password',
      value: profileData.password,
      name: 'password',
      type: visiblePassword ? 'text' : 'password',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setProfileData({
          ...profileData,
          password: event.currentTarget.value,
        }),
      inputRef: register,
      InputProps: {
        endAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={() => setVisiblePassword(!visiblePassword)}>
              {visiblePassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      },
    },
  ];

  const Render = () => (
    <React.Fragment>
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageSegment
            headerTitle="Profile details"
            headerSubtitle="Review or edit you profile details."
            headerIcon={FaceIcon as React.FC<React.SVGProps<SVGSVGElement>>}
            bodyContent={
              <Grid container spacing={2}>
                {profileFormFields.map((field) => (
                  <Grid item md={4} xs={12}>
                    <TextField variant="outlined" {...field} fullWidth />
                  </Grid>
                ))}
              </Grid>
            }
            bodyActions={
              <Button variant="contained" type="submit" color="primary">
                Save
              </Button>
            }
          />
        </form>
      </Grid>
      <Grid item>
        <PageSegment
          headerTitle="Remove account"
          headerSubtitle="With this option you can disable your account."
          headerIcon={
            HighlightOffIcon as React.FC<React.SVGProps<SVGSVGElement>>
          }
          bodyActions={
            <Button variant="contained" color="primary">
              Delete
            </Button>
          }
        />
      </Grid>
    </React.Fragment>
  );

  return (
    <>
      <Layout />
      <Box className={classes.wrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.content} m={2}>
            <Grid direction="column" container spacing={2}>
              <Render />
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Profile };
