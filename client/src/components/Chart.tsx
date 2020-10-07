import React from 'react';
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

import { Box } from '@material-ui/core';

// TODO Replace with global state
const data = [
  { time: '2015-03-25', temperature: 33, pressure: 1005, humidity: 55 },
  { time: '2015-03-26', temperature: 32, pressure: 1025, humidity: 33 },
  { time: '2015-03-27', temperature: 23, pressure: 950, humidity: 22 },
  { time: '2015-03-28', temperature: 35, pressure: 1100, humidity: 55 },
  { time: '2015-03-29', temperature: 31, pressure: 1006, humidity: 50 },
  { time: '2015-03-30', temperature: 32, pressure: 1003, humidity: 70 },
];
//

const dataOptions = [
  {
    name: 'temperature',
    color: '#FC766AFF',
  },
  {
    name: 'pressure',
    color: '#00203FFF',
  },
  {
    name: 'humidity',
    color: '#5B84B1FF',
  },
];

const Chart = () => {
  const renderLines = dataOptions.map((item) => (
    <Line type="monotone" dataKey={item.name} stroke={item.color} />
  ));

  const chartContent = (
    <ResponsiveContainer height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#EBEBEB" />
        <XAxis dataKey="time" />
        {renderLines}
        <YAxis width={35} />
        <Tooltip />
        <Legend iconSize={10} iconType="circle" />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Box position="relative" width="100%" paddingBottom="400px">
      <Box position="absolute" top="0" right="0" bottom="0" left="0">
        {chartContent}
      </Box>
    </Box>
  );
};

export { Chart };
