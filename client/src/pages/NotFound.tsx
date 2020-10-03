import React from 'react';
import { Box, Typography } from '@material-ui/core';

const NotFound = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography children="404 Error - Page not found" variant="h5" />
    </Box>
  );
};
export { NotFound };
