import React from 'react';
import { useSelector } from 'react-redux';
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
import { RootState } from '../types';

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
  const data = useSelector((state: RootState) => state.logReducer.logs);

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
