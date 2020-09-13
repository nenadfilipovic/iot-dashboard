import React, { useState } from 'react';
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Grid,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import TimelineIcon from '@material-ui/icons/Timeline';
import InfoIcon from '@material-ui/icons/Info';

import { Chart } from '../components/Chart';
import { PageSegment } from '../components/PageSegment';
import { InputField } from '../components/InputField';
import { DeviceAttributes } from '../types';
import { Type } from '../types';

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

const Render = () => {
  // Maybe change state later
  const [deviceData, setDeviceData] = useState<DeviceAttributes>({
    name: 'Device',
    topic: 'home',
    type: Type.esp32,
    description: 'Sensor from living room',
    // add creation date
  });

  const { register, handleSubmit } = useForm<DeviceAttributes>();

  const onSubmit = (data: DeviceAttributes) => console.log(data);

  const inputFieldData = [
    {
      label: 'Name',
      value: deviceData.name,
      name: 'name',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setDeviceData({
          ...deviceData,
          name: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'topic',
      value: deviceData.topic,
      name: 'topic',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setDeviceData({
          ...deviceData,
          topic: event.currentTarget.value,
        }),
      inputRef: register,
    },
    {
      label: 'description',
      value: deviceData.description,
      name: 'description',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setDeviceData({
          ...deviceData,
          description: event.currentTarget.value,
        }),
      inputRef: register,
    },
  ];

  return (
    <React.Fragment>
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageSegment
            title="Information"
            subheader="You can review or edit your device properties here."
            icon={InfoIcon as React.FC<React.SVGProps<SVGSVGElement>>}
            content={
              <Grid container spacing={2}>
                {inputFieldData.map((item) => (
                  <Grid item md={4} xs={12}>
                    <InputField {...item} fullWidth />
                  </Grid>
                ))}
              </Grid>
            }
            actions={
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            }
          />
        </form>
      </Grid>
      <Grid item>
        <PageSegment
          title="Readings"
          subheader="Check data readings from your device."
          icon={TimelineIcon as React.FC<React.SVGProps<SVGSVGElement>>}
          content={<Chart />}
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
