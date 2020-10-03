import React from 'react';
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
  Device,
  DeviceAttributesCasting,
  DeviceType,
  ReactSVGComponent,
} from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '25px',
    },
  }),
);

const {
  deviceName,
  deviceChannel,
  deviceDescription,
  deviceType,
} = DeviceAttributesCasting;

const deviceTypeOptions = (['esp32', 'esp8266'] as DeviceType[]).map(
  (option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ),
);

const CreateDevice = () => {
  const classes = useStyles();

  const { control, handleSubmit } = useForm<Device>({
    defaultValues: {
      deviceName: '',
      deviceChannel: '',
      deviceDescription: '',
      deviceType: 'esp32',
    },
  });

  const onSubmit = (data: Device) => console.log(data);

  const createDeviceFormFields = [
    {
      label: 'Name',
      name: deviceName,
      control,
    },
    {
      label: 'Topic',
      name: deviceChannel,
      control,
    },
    {
      label: 'Description',
      name: deviceDescription,
      control,
    },
    {
      label: 'Type',
      name: deviceType,
      control,
      select: true,
      children: deviceTypeOptions,
    },
  ];

  const createDeviceForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Add new device"
        headerSubtitle="Please enter data for device you want to create."
        headerIcon={MemoryIcon as ReactSVGComponent}
        bodyContent={
          <Grid container direction="column" spacing={2}>
            {createDeviceFormFields.map((field) => (
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
            <Grid item></Grid>
          </Grid>
        }
        bodyActions={
          <Button variant="contained" color="primary" fullWidth type="submit">
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
