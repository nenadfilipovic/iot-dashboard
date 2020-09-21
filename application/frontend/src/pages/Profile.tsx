import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { PageSegment } from '../components/PageSegment';
import { User, UserAttributesCasting, ReactSVGComponent } from '../types';

const {
  userFirstName,
  userLastName,
  userPassword,
  userEmailAddress,
} = UserAttributesCasting;

const Profile = () => {
  const { control, handleSubmit } = useForm<User>({
    defaultValues: {
      userFirstName: 'Nenad',
      userLastName: 'Filipovic',
      userPassword: 'nenad123',
      userEmailAddress: 'nenad@nenad.com',
    },
  });

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const onSubmit = (data: User) => console.log(data);

  const profileFormFields = [
    {
      label: 'First Name',
      name: userFirstName,
      control,
    },
    {
      label: 'Last Name',
      name: userLastName,
      control,
    },
    {
      label: 'Password',
      name: userPassword,
      control,
      type: visiblePassword ? 'text' : 'password',
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
    {
      label: 'Email',
      name: userEmailAddress,
      control,
    },
  ];

  const profileForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Profile details"
        headerSubtitle="Review or edit you profile details."
        headerIcon={FaceIcon as ReactSVGComponent}
        bodyContent={
          <Grid container spacing={2}>
            {profileFormFields.map((field) => (
              <Grid item md={4} xs={12}>
                <Controller
                  as={<TextField {...field} variant="outlined" fullWidth />}
                  name={field.name}
                  control={field.control}
                />
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
  );

  return (
    <Grid direction="column" container spacing={2}>
      <Grid item>{profileForm}</Grid>
      <Grid item>
        <PageSegment
          headerTitle="Remove account"
          headerSubtitle="With this option you can disable your account."
          headerIcon={HighlightOffIcon as ReactSVGComponent}
          bodyActions={
            <Button variant="contained" color="primary">
              Delete
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};

export { Profile };
