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

import { LogAttributes } from '../types';

const dataOptions = [
  {
    name: 'temperature',
    color: '#FC766AFF',
  },
  {
    name: 'pressure',
    color: '#ffffff',
  },
  {
    name: 'humidity',
    color: '#5B84B1FF',
  },
];

const Chart = ({ data }: { data: LogAttributes[] }) => {
  const renderLines = dataOptions.map((item) => (
    <Line
      key={item.name}
      type="monotone"
      dataKey={item.name}
      stroke={item.color}
    />
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
