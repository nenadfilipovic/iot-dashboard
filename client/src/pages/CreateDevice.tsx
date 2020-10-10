import React from 'react';
import { useDispatch } from 'react-redux';

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
import { useForm, Controller } from 'react-hook-form';
import MemoryIcon from '@material-ui/icons/Memory';

import { PageSegment } from '../components/PageSegment';
import {
  DeviceAttributes,
  DeviceTypesCasting,
  Type,
  ReactSVGComponent,
} from '../types';
import { thunkRegisterDevice } from '../actions';

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

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<DeviceAttributes>({
    defaultValues: {
      id: '',
      name: '',
      channel: '',
      description: '',
      type: Type.esp8266,
      modifyDate: new Date(),
      registerDate: new Date(),
    },
  });

  const onSubmit = (data: DeviceAttributes) => {
    dispatch(thunkRegisterDevice(data));
  };

  const formFields = [
    {
      label: 'Name',
      name: name,
      control,
    },
    {
      label: 'Topic',
      name: channel,
      control,
    },
    {
      label: 'Description',
      name: description,
      control,
    },
    {
      label: 'Type',
      name: type,
      control,
      select: true,
      children: typeOptions,
    },
  ];

  const createDeviceForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        title="Add new device"
        subtitle="Please enter data for device you want to create"
        icon={MemoryIcon as ReactSVGComponent}
        content={
          <Grid container direction="column" spacing={2}>
            {formFields.map((field) => (
              <Grid item>
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
          <Button color="primary" fullWidth type="submit">
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
