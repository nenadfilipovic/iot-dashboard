import React, { useState } from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import MemoryIcon from '@material-ui/icons/Memory';

import { PageSegment } from '../components/PageSegment';

interface CreateDeviceAttributes {
  deviceName: string;
  deviceTopic: string;
  deviceDescription: string;
  deviceType: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: `translate(-50%, -50%)`,
    },
  }),
);

const CreateDevice = () => {
  const classes = useStyles();

  const { register, handleSubmit } = useForm<CreateDeviceAttributes>();

  const onSubmit = (data: CreateDeviceAttributes) => console.log(data);

  const [createDeviceData, setCreateDeviceData] = useState<
    CreateDeviceAttributes
  >({
    deviceName: '',
    deviceTopic: '',
    deviceDescription: '',
    deviceType: 'esp32',
  });

  const deviceTypes = [
    {
      value: 'esp32',
      label: 'esp32',
    },
    {
      value: 'esp8266',
      label: 'esp8266',
    },
  ].map((type) => (
    <MenuItem key={type.value} value={type.value}>
      {type.label}
    </MenuItem>
  ));

  const createDeviceFormFields = [
    {
      label: 'Name',
      value: createDeviceData.deviceName,
      name: 'name',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCreateDeviceData({
          ...createDeviceData,
          deviceName: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Topic',
      value: createDeviceData.deviceTopic,
      name: 'topic',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCreateDeviceData({
          ...createDeviceData,
          deviceTopic: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Description',
      value: createDeviceData.deviceDescription,
      name: 'description',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCreateDeviceData({
          ...createDeviceData,
          deviceDescription: event.currentTarget.value,
        }),
      inputRef: register,
    },
  ];

  const render = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Add device"
        headerSubtitle="Please enter data into required fields."
        headerIcon={MemoryIcon as React.FC<React.SVGProps<SVGSVGElement>>}
        bodyContent={
          <Grid container direction="column" spacing={2}>
            {createDeviceFormFields.map((field) => (
              <Grid item>
                <TextField variant="outlined" {...field} fullWidth />
              </Grid>
            ))}
            <Grid item>
              <TextField
                variant="outlined"
                fullWidth
                select
                label="Type"
                value={createDeviceData.deviceType}
                name="type"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCreateDeviceData({
                    ...createDeviceData,
                    deviceType: event.target.value,
                  })
                }
              >
                {deviceTypes}
              </TextField>
            </Grid>
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

  return <Box className={classes.root}>{render}</Box>;
};

export { CreateDevice };
