import React, { useState } from 'react';
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

interface CreateDeviceAttributes {
  deviceName: string;
  deviceTopic: string;
  deviceDescription: string;
  deviceType: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '25px',
    },
  }),
);

const deviceTypes = [
  {
    label: 'esp32',
    value: 'esp32',
  },
  {
    label: 'esp8266',
    value: 'esp8266',
  },
];

const CreateDevice = () => {
  const classes = useStyles();

  const { register, control, handleSubmit } = useForm<CreateDeviceAttributes>();

  const onSubmit = (data: CreateDeviceAttributes) => console.log(data);

  const [createDeviceData, setCreateDeviceData] = useState<
    CreateDeviceAttributes
  >({
    deviceName: '',
    deviceTopic: '',
    deviceDescription: '',
    deviceType: '',
  });

  const createDeviceFormFields = [
    {
      label: 'Name',
      value: createDeviceData.deviceName,
      name: 'deviceName',
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
      name: 'deviceTopic',
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
      name: 'deviceDescription',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setCreateDeviceData({
          ...createDeviceData,
          deviceDescription: event.currentTarget.value,
        }),
      inputRef: register,
    },
  ];

  const createDeviceForm = (
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
              <Controller
                as={
                  <TextField
                    label="Type"
                    name="deviceType"
                    variant="outlined"
                    fullWidth
                  >
                    {deviceTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </TextField>
                }
                select
                name="deviceType"
                control={control}
                defaultValue={createDeviceData.deviceType}
              />
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

  return (
    <Container className={classes.root} maxWidth="sm">
      {createDeviceForm}
    </Container>
  );
};

export { CreateDevice };
