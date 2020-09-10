import React from 'react';
import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Devices = () => {
  const devices = [
    {
      id: '123123',
      name: 'device',
      topic: 'topic',
      type: 'esp32',
      createdAt: new Date().getDate,
    },
    {
      id: '123123',
      name: 'device2',
      topic: 'topic2',
      type: 'esp8266',
      createdAt: new Date().getDate,
    },
  ];

  const list = devices.map((device) => {
    return (
      <Box m={1}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item md={6} xs={12}>
                <Typography variant="h6">Device: {device.name}</Typography>
                <Typography>Topic: {device.topic}</Typography>
                <Typography>Type: {device.type}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to={device.id}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  });
  return <>{list}</>;
};

export { Devices };
