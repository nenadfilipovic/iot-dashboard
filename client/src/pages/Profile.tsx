import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import { Grid, TextField, Button, Box } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { PageSegment } from '../components/PageSegment';
import {
  UserAttributes,
  UserTypesCasting,
  ReactSVGComponent,
  RootState,
} from '../types';
import { userSchema } from '../validation';
import { thunkModifyUser, thunkRemoveUser } from '../actions';

const { handle, firstName, lastName, emailAddress } = UserTypesCasting;

const Profile = () => {
  const userData = useSelector((state: RootState) => state.userReducer.user);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm<UserAttributes>({
    defaultValues: {
      handle: userData?.handle,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      emailAddress: userData?.emailAddress,
    },
    resolver: joiResolver(userSchema),
  });

  const onSubmit = (data: UserAttributes) => {
    dispatch(thunkModifyUser(data));
  };

  const formFields = [
    {
      label: 'Handle',
      name: handle,
      register,
      disabled: true,
      inputProps: {
        disabled: true,
        readOnly: true,
      },
      error: !!errors.handle?.message,
      helperText: errors.handle?.message,
    },
    {
      label: 'First Name',
      name: firstName,
      register,
      error: !!errors.firstName?.message,
      helperText: errors.firstName?.message,
    },
    {
      label: 'Last Name',
      name: lastName,
      register,
      error: !!errors.lastName?.message,
      helperText: errors.lastName?.message,
    },

    {
      label: 'Email',
      name: emailAddress,
      register,
      error: !!errors.emailAddress?.message,
      helperText: errors.emailAddress?.message,
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
              <Grid key={field.name} item md={4} xs={12}>
                <TextField
                  inputRef={field.register}
                  {...field}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
        }
        actions={
          <Button color="secondary" variant="contained" type="submit">
            Save
          </Button>
        }
      />
    </form>
  );

  return (
    <Box m={2}>
      <Grid direction="column" container spacing={2}>
        <Grid item>{profileForm}</Grid>
        <Grid item>
          <PageSegment
            title="Remove account"
            subtitle="With this option you can disable your account"
            icon={HighlightOffIcon as ReactSVGComponent}
            actions={
              <Button
                onClick={() => dispatch(thunkRemoveUser())}
                color="secondary"
                variant="contained"
              >
                Remove
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { Profile };
