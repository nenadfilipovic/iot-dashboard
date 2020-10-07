import React from 'react';

import {
  createStyles,
  Theme,
  makeStyles,
  Box,
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 75,
      height: 75,
    },
    avatarCircle: {
      border: `2px solid ${theme.palette.secondary.main}`,
      borderRadius: '75%',
    },
  }),
);

const UserAvatar = ({ image }: { image: string }) => {
  const classes = useStyles();

  return (
    <Box className={classes.avatarCircle} p={1} m={1}>
      <Avatar className={classes.avatar} src={image} />
    </Box>
  );
};

export { UserAvatar };
