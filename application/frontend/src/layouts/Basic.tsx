import React from 'react';
import { Box } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';

const Basic = () => {
  const basicLayoutContent = (
    <Box width="100%" height="100%" display="flex">
      <Box flex="1 1 auto">
        <Header onNavOpen={() => {}} />
        <Box display="flex">
          <Box flex="1" p={2}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return <div>{basicLayoutContent}</div>;
};

export { Basic };
