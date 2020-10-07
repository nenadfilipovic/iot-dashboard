import React from 'react';
import { Box } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

const Basic = () => {
  const basicLayoutContent = (
    <Box width="100%" height="100%" display="flex">
      <Box flex="1 1 auto">
        <Box display="flex">
          <Box flex="1" p={2}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return <React.Fragment>{basicLayoutContent}</React.Fragment>;
};

export { Basic };
