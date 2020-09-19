import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import TimelineIcon from '@material-ui/icons/Timeline';
import InfoIcon from '@material-ui/icons/Info';

import { Chart } from '../components/Chart';
import { PageSegment } from '../components/PageSegment';
import {
  DeviceAttributes,
  DeviceAttributesCasting,
  ReactIconComponent,
} from '../types';

const {
  deviceName,
  deviceTopic,
  deviceDescription,
  deviceType,
  deviceCreatedDate,
} = DeviceAttributesCasting;

const Device = () => {
  const [editable, setEditable] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<DeviceAttributes>({
    defaultValues: {
      deviceName: 'Device',
      deviceTopic: 'home',
      deviceType: 'esp32',
      deviceDescription: 'Sensor from living room',
      deviceCreatedDate: new Date().toLocaleString(),
    },
  });

  const onSubmit = (data: DeviceAttributes) => console.log(data);

  const deviceFormFields = [
    {
      label: 'Name',
      name: deviceName,
      control,
    },
    {
      label: 'Type',
      name: deviceType,
      control,
      disabled: true,
    },
    {
      label: 'Topic',
      name: deviceTopic,
      control,
    },
    {
      label: 'Description',
      name: deviceDescription,
      control,
    },
    {
      label: 'Created',
      name: deviceCreatedDate,
      control,
      disabled: true,
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

  const deviceForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        headerTitle="Information"
        headerSubtitle="You can review or edit your device properties here."
        headerIcon={InfoIcon as ReactIconComponent}
        bodyContent={
          <Grid container spacing={2}>
            {deviceFormFields.map((field) => (
              <Grid item md={4} xs={12}>
                <Controller
                  as={
                    <TextField
                      {...field}
                      InputProps={{ readOnly: !editable }}
                      variant="outlined"
                      fullWidth
                    />
                  }
                  name={field.name}
                  control={field.control}
                />
              </Grid>
            ))}
          </Grid>
        }
        bodyActions={button}
      />
    </form>
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>{deviceForm}</Grid>
      <Grid item>
        <PageSegment
          headerTitle="Readings"
          headerSubtitle="Check data readings from your device."
          headerIcon={TimelineIcon as ReactIconComponent}
          bodyContent={<Chart />}
        />
      </Grid>
    </Grid>
  );
};

export { Device };
