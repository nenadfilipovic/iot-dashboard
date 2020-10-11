import React from 'react';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Theme,
  makeStyles,
  createStyles,
  TextField,
  Button,
  MenuItem,
  Grid,
  Container,
} from '@material-ui/core';
import MemoryIcon from '@material-ui/icons/Memory';

import { PageSegment } from '../components/PageSegment';
import {
  DeviceAttributes,
  DeviceTypesCasting,
  Type,
  ReactSVGComponent,
} from '../types';
import { thunkRegisterDevice } from '../actions';
import { deviceSchema } from '../validation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '25px',
    },
  }),
);

const { name, channel, description, type } = DeviceTypesCasting;

const typeOptions = (['esp32', 'esp8266'] as Type[]).map((option) => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
));

const CreateDevice = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { control, handleSubmit, errors } = useForm<DeviceAttributes>({
    defaultValues: {
      id: '',
      name: '',
      channel: '',
      description: '',
      type: Type.esp8266,
      modifyDate: new Date(),
      registerDate: new Date(),
    },
    resolver: joiResolver(deviceSchema),
  });

  const onSubmit = (data: DeviceAttributes) => {
    dispatch(thunkRegisterDevice(data));
    navigate('/devices');
  };

  const formFields = [
    {
      label: 'Name',
      name: name,
      control,
      error: !!errors.name?.message,
      helperText: errors.name?.message,
    },
    {
      label: 'Channel',
      name: channel,
      control,
      error: !!errors.channel?.message,
      helperText: errors.channel?.message,
    },
    {
      label: 'Description',
      name: description,
      control,
      error: !!errors.description?.message,
      helperText: errors.description?.message,
    },
    {
      label: 'Type',
      name: type,
      control,
      select: true,
      children: typeOptions,
      error: !!errors.type?.message,
      helperText: errors.type?.message,
    },
  ];

  const createDeviceForm = (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        title="Add new device"
        subtitle="Please enter data for device you want to create"
        icon={MemoryIcon as ReactSVGComponent}
        content={
          <Grid container direction="column" spacing={2}>
            {formFields.map((field) => (
              <Grid key={field.name} item>
                <Controller
                  as={
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      select={field.select}
                    >
                      {field.children}
                    </TextField>
                  }
                  name={field.name}
                  control={field.control}
                />
              </Grid>
            ))}
          </Grid>
        }
        actions={
          <Button variant="contained" color="secondary" fullWidth type="submit">
            Create
          </Button>
        }
      />
    </form>
  );

  return (
    <Container className={classes.root} maxWidth="sm">
      {createDeviceForm}
    </Container>
  );
};

export { CreateDevice };
