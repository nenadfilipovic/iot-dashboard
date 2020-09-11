import React from 'react';
import {
  CardContent,
  Card,
  Box,
  makeStyles,
  Theme,
  createStyles,
  Typography,
} from '@material-ui/core';
import { ResponsiveLine } from '@nivo/line';

import { Layout } from '../components';
import { data } from './data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
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
      overflow: 'auto',
    },
  }),
);

const Device = () => {
  const classes = useStyles();
  return (
    <>
      <Layout />
      <Box className={classes.wrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.content} m={1}>
            <Card>
              <CardContent>
                <Typography>Device name:</Typography>
                <Typography>Device type:</Typography>
                <Typography>Topic:</Typography>
                <ResponsiveLine
                  data={data}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Device };
