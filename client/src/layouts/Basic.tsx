import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@material-ui/core';
import { Header } from '../components/Header';

const Basic = () => {
  const basicLayoutContent = (
    <Box width="100%" height="100%" display="flex">
      <Box flex="1 1 auto">
        <Box display="flex">
          <Box flex="1">
            <Header onNavOpen={() => {}} />
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return <React.Fragment>{basicLayoutContent}</React.Fragment>;
};

export { Basic };
