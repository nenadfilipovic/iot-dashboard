import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import TimelineIcon from '@material-ui/icons/Timeline';
import InfoIcon from '@material-ui/icons/Info';

import { Chart } from '../components/Chart';
import { PageSegment } from '../components/PageSegment';
import {
  DeviceAttributes,
  DeviceTypesCasting,
  Type,
  ReactSVGComponent,
} from '../types';

const {
  name,
  channel,
  description,
  type,
  registerDate,
  modifyDate,
} = DeviceTypesCasting;

const SingleDevice = () => {
  const [editable, setEditable] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<DeviceAttributes>({
    defaultValues: {
      name: 'Device',
      channel: 'home',
      type: Type.esp8266,
      description: 'Sensor from living room',
      modifyDate: new Date(),
      registerDate: new Date(),
    },
  });

  const onSubmit = (data: DeviceAttributes) => console.log(data);

  const formFields = [
    {
      label: 'Name',
      name: name,
      control,
    },
    {
      label: 'Type',
      name: type,
      control,
      disabled: true,
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
      label: 'Modified',
      name: modifyDate,
      control,
      disabled: true,
    },
    {
      label: 'Created',
      name: registerDate,
      control,
      disabled: true,
    },
  ];

  const button = editable ? (
    <Button onClick={() => setEditable(!editable)} color="primary">
      Save
    </Button>
  ) : (
    <Button
      onClick={() => setEditable(!editable)}
      type="submit"
      color="primary"
    >
      Edit
    </Button>
  );

  const deviceForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageSegment
        title="Information"
        subtitle="You can review or edit your device properties here"
        icon={InfoIcon as ReactSVGComponent}
        content={
          <Grid container spacing={2}>
            {formFields.map((field) => (
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
        actions={button}
      />
    </form>
  );

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>{deviceForm}</Grid>
      <Grid item>
        <PageSegment
          title="Readings"
          subtitle="Check data readings from your device"
          icon={TimelineIcon as ReactSVGComponent}
          content={<Chart />}
        />
      </Grid>
    </Grid>
  );
};

export { SingleDevice };
