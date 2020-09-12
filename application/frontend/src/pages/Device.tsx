import React from 'react';
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Divider,
  CardHeader,
  Card,
  CardContent,
  Grid,
  Avatar,
} from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import TimelineIcon from '@material-ui/icons/Timeline';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Layout } from '../components';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    },

    paper: {
      flexGrow: 1,
      maxWidth: 500,
    },
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
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

const data = [
  { time: '2015-03-25', temperature: 33, pressure: 1005, humidity: 55 },
  { time: '2015-03-26', temperature: 32, pressure: 1025, humidity: 33 },
  { time: '2015-03-27', temperature: 23, pressure: 950, humidity: 22 },
  { time: '2015-03-28', temperature: 35, pressure: 1100, humidity: 55 },
  { time: '2015-03-29', temperature: 31, pressure: 1006, humidity: 50 },
  { time: '2015-03-30', temperature: 32, pressure: 1003, humidity: 70 },
];

const Information = () => {
  const classes = useStyles();
  return (
    <Grid item>
      <Card>
        <CardHeader
          title={<Typography variant="h6">Info:</Typography>}
          avatar={
            <Avatar className={classes.avatar}>
              <InfoIcon />
            </Avatar>
          }
        />
        <Divider />
        <CardContent>
          <Typography variant="subtitle1">Device name:</Typography>
          <Typography variant="subtitle1">Topic:</Typography>
          <Typography variant="subtitle1">Type:</Typography>
          <Typography variant="subtitle1">Creation date:</Typography>
          <Typography variant="subtitle1">Last update:</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Readings = () => {
  const classes = useStyles();
  return (
    <Grid item>
      <Card>
        <CardHeader
          title={<Typography variant="h6">Readings:</Typography>}
          avatar={
            <Avatar className={classes.avatar}>
              <TimelineIcon />
            </Avatar>
          }
        />
        <Divider />
        <CardContent>
          <ResponsiveContainer width="99%" height={400}>
            <LineChart data={data}>
              <CartesianGrid
                stroke="rgba(16, 24, 32, 0.20)"
                strokeDasharray="5 5 5"
              />
              <Line type="monotone" dataKey="temperature" stroke="#FC766AFF" />
              <Line type="monotone" dataKey="pressure" stroke="#00203FFF" />
              <Line type="monotone" dataKey="humidity" stroke="#5B84B1FF" />
              <Legend />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Device = () => {
  const classes = useStyles();
  return (
    <>
      <Layout />
      <Box className={classes.wrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.content} m={2}>
            <Grid container direction="column" spacing={2}>
              <Information />
              <Readings />
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Device };
