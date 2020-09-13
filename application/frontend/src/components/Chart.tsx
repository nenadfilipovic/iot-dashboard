import React from 'react';
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chartWrapper: {
      position: 'relative',
      width: '100%',
      paddingBottom: '400px',
    },
    chartContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
  }),
);

// Mock data

const data = [
  { time: '2015-03-25', temperature: 33, pressure: 1005, humidity: 55 },
  { time: '2015-03-26', temperature: 32, pressure: 1025, humidity: 33 },
  { time: '2015-03-27', temperature: 23, pressure: 950, humidity: 22 },
  { time: '2015-03-28', temperature: 35, pressure: 1100, humidity: 55 },
  { time: '2015-03-29', temperature: 31, pressure: 1006, humidity: 50 },
  { time: '2015-03-30', temperature: 32, pressure: 1003, humidity: 70 },
];

const dataOptions = {
  temperature: { name: 'temperature', color: '#FC766AFF' },
  pressure: { name: 'pressure', color: '#00203FFF' },
  humidity: { name: 'humidity', color: '#5B84B1FF' },
};

// Chart should get data as props from Device component

const Chart = () => {
  const classes = useStyles();

  const { temperature, pressure, humidity } = dataOptions;

  return (
    <Box className={classes.chartWrapper}>
      <Box className={classes.chartContainer}>
        <ResponsiveContainer height={400}>
          <LineChart
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            data={data}
          >
            <CartesianGrid stroke="#eee" />
            <Line
              type="monotone"
              dataKey={temperature.name}
              stroke={temperature.color}
            />
            <Line
              type="monotone"
              dataKey={pressure.name}
              stroke={pressure.color}
            />
            <Line
              type="monotone"
              dataKey={humidity.name}
              stroke={humidity.color}
            />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend iconType="circle" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export { Chart };
