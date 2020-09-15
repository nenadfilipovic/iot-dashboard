import React, { useState } from 'react';
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import TimelineIcon from '@material-ui/icons/Timeline';
import InfoIcon from '@material-ui/icons/Info';

import { Chart } from '../components/Chart';
import { PageSegment } from '../components/PageSegment';

// Dirty
import { Layout } from '../parts';

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
      flexDirection: 'column',
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
    },
  }),
);
// Dirty

interface DeviceAttributes {
  deviceName: string;
  deviceTopic: string;
  deviceType: Type;
  deviceDescription: string;
  deviceCreationDate: string;
}

enum Type {
  esp32,
  esp8266,
}

const Render = () => {
  // Maybe change state later
  const [deviceData, setDeviceData] = useState<DeviceAttributes>({
    deviceName: 'Device',
    deviceTopic: 'home',
    deviceType: Type.esp32,
    deviceDescription: 'Sensor from living room',
    deviceCreationDate: new Date().toLocaleString(),
  });

  const [editable, setEditable] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<DeviceAttributes>();

  const onSubmit = (data: DeviceAttributes) => console.log(data);

  const deviceFormFields = [
    {
      label: 'Name',
      value: deviceData.deviceName,
      name: 'name',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setDeviceData({
          ...deviceData,
          deviceName: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Topic',
      value: deviceData.deviceTopic,
      name: 'topic',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setDeviceData({
          ...deviceData,
          deviceTopic: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'Created',
      value: deviceData.deviceCreationDate,
      name: 'created',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setDeviceData({
          ...deviceData,
          deviceCreationDate: event.currentTarget.value,
        }),
      inputRef: register,
      disabled: true,
    },
    {
      label: 'Description',
      value: deviceData.deviceDescription,
      name: 'description',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setDeviceData({
          ...deviceData,
          deviceDescription: event.currentTarget.value,
        }),
      inputRef: register,
    },
  ];

  const button = editable ? (
    <Button
      onClick={() => setEditable(!editable)}
      variant="contained"
      color="primary"
    >
      Save
    </Button>
  ) : (
    <Button
      onClick={() => setEditable(!editable)}
      type="submit"
      variant="contained"
      color="primary"
    >
      Edit
    </Button>
  );

  return (
    <React.Fragment>
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageSegment
            headerTitle="Information"
            headerSubtitle="You can review or edit your device properties here."
            headerIcon={InfoIcon as React.FC<React.SVGProps<SVGSVGElement>>}
            bodyContent={
              <Grid container spacing={2}>
                {deviceFormFields.map((field) => (
                  <Grid item md={4} xs={12}>
                    <TextField
                      variant="outlined"
                      {...field}
                      InputProps={{
                        readOnly: !editable,
                      }}
                      fullWidth
                    />
                  </Grid>
                ))}
              </Grid>
            }
            bodyActions={button}
          />
        </form>
      </Grid>
      <Grid item>
        <PageSegment
          headerTitle="Readings"
          headerSubtitle="Check data readings from your device."
          headerIcon={TimelineIcon as React.FC<React.SVGProps<SVGSVGElement>>}
          bodyContent={<Chart />}
        />
      </Grid>
    </React.Fragment>
  );
};

const Device = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Layout />
      <Box className={classes.wrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.content} m={2}>
            <Grid container direction="column" spacing={2}>
              {<Render />}
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export { Device };
