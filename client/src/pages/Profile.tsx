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
import { UserAttributes, UserTypesCasting, ReactSVGComponent } from '../types';

const {
  handle,
  firstName,
  lastName,
  password,
  emailAddress,
} = UserTypesCasting;

const Profile = () => {
  const { control, handleSubmit } = useForm<UserAttributes>({
    defaultValues: {
      handle: 'nenad88',
      firstName: 'Nenad',
      lastName: 'Filipovic',
      password: 'nenad123',
      emailAddress: 'nenad@nenad.com',
    },
  });

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const onSubmit = (data: UserAttributes) => console.log(data);

  const formFields = [
    {
      label: 'Handle',
      name: handle,
      control,
    },
    {
      label: 'First Name',
      name: firstName,
      control,
    },
    {
      label: 'Last Name',
      name: lastName,
      control,
    },
    {
      label: 'Password',
      name: password,
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
      name: emailAddress,
      control,
    },
  ];

  const profileForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        title="Profile details"
        subtitle="Review or edit you profile details."
        icon={FaceIcon as ReactSVGComponent}
        content={
          <Grid container spacing={2}>
            {formFields.map((field) => (
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
        actions={
          <Button type="submit" color="primary">
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
          title="Remove account"
          subtitle="With this option you can disable your account"
          icon={HighlightOffIcon as ReactSVGComponent}
          actions={<Button color="primary">Delete</Button>}
        />
      </Grid>
    </Grid>
  );
};

export { Profile };
