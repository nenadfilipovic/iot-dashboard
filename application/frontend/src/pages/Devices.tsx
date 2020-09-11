import React from 'react';
import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
  makeStyles,
  createStyles,
  Theme,
  CardHeader,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { Layout } from '../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 270,
      },
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
    },
    content: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
    },
  }),
);

const Devices = () => {
  const devices = [
    {
      id: '123123',
      name: 'device',
      topic: 'topic',
      type: 'esp32',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '123123',
      name: 'device2',
      topic: 'topic2',
      type: 'esp8266',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '123123',
      name: 'device2',
      topic: 'topic2',
      type: 'esp8266',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '123123',
      name: 'device2',
      topic: 'topic2',
      type: 'esp8266',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '123123',
      name: 'device2',
      topic: 'topic2',
      type: 'esp8266',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '123123',
      name: 'device2',
      topic: 'topic2',
      type: 'esp8266',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: '123123',
      name: 'device2',
      topic: 'topic2',
      type: 'esp8266',
      createdAt: new Date().toLocaleString(),
    },
  ];

  const classes = useStyles();

  const list = devices.map((device) => {
    return (
      <Grid item md={3} xs={12}>
        <Card>
          <CardHeader
            title={<Typography variant="h6">Device: {device.name}</Typography>}
          />
          <CardContent>
            <Typography variant="h5"></Typography>
            <Typography variant="body2">Topic: {device.topic}</Typography>
            <Typography variant="body2">Type: {device.type}</Typography>
            <Typography variant="body2">Created: {device.createdAt}</Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              component={NavLink}
              to={`/devices/${device.id}`}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Layout />
      <Box className={classes.wrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.content} m={2}>
            <Grid container spacing={2}>
              {list}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Devices };
