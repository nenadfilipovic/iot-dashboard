import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button, Grid, TextField, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import TimelineIcon from '@material-ui/icons/Timeline';
import InfoIcon from '@material-ui/icons/Info';

import { Chart } from '../components/Chart';
import { PageSegment } from '../components/PageSegment';
import {
  DeviceAttributes,
  DeviceTypesCasting,
  ReactSVGComponent,
  RootState,
} from '../types';
import { thunkModifyDevice, thunkGetLogs } from '../actions';
import { deviceSchema } from '../validation';

const {
  name,
  channel,
  description,
  type,
  registerDate,
  modifyDate,
} = DeviceTypesCasting;

const SingleDevice = () => {
  const params = useParams();

  const data = useSelector((state: RootState) => state.logReducer.logs);

  const device = useSelector(
    (state: RootState) => state.deviceReducer.devices[params.id],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getLogs = (id: string) => {
      dispatch(thunkGetLogs(id));
    };
    getLogs(params.id);
  }, [dispatch, params.id]);

  const { register, handleSubmit, errors } = useForm<DeviceAttributes>({
    defaultValues: {
      name: device.name,
      channel: device.channel,
      type: device.type,
      description: device.description,
      modifyDate: device.modifyDate,
      registerDate: device.registerDate,
    },
    resolver: joiResolver(deviceSchema),
  });

  const onSubmit = (data: DeviceAttributes) => {
    dispatch(thunkModifyDevice(params.id, data));
  };

  const formFields = [
    {
      label: 'Name',
      name: name,
      register,
      error: !!errors.name?.message,
      helperText: errors.name?.message,
    },
    {
      label: 'Type',
      name: type,
      register,
      error: !!errors.type?.message,
      helperText: errors.type?.message,
    },
    {
      label: 'Channel',
      name: channel,
      register,
      disabled: true,
    },
    {
      label: 'Description',
      name: description,
      register,
      error: !!errors.description?.message,
      helperText: errors.description?.message,
    },
    {
      label: 'Modified',
      name: modifyDate,
      register,
      disabled: true,
    },
    {
      label: 'Created',
      name: registerDate,
      register,
      disabled: true,
    },
  ];

  const deviceForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        title="Information"
        subtitle="You can review or edit your device properties here"
        icon={InfoIcon as ReactSVGComponent}
        content={
          <Grid container spacing={2}>
            {formFields.map((field) => (
              <Grid key={field.name} item md={4} xs={12}>
                <TextField
                  {...field}
                  inputRef={field.register}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
        }
        actions={
          <Button type="submit" variant="contained" color="secondary">
            Save
          </Button>
        }
      />
    </form>
  );

  return (
    <Box m={2}>
      <Grid container direction="column" spacing={2}>
        <Grid item>{deviceForm}</Grid>
        <Grid item>
          <PageSegment
            title="Readings"
            subtitle="Check data readings from your device"
            icon={TimelineIcon as ReactSVGComponent}
            content={<Chart data={data} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { SingleDevice };
