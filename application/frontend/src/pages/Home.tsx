import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import CreateIcon from '@material-ui/icons/Create';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    background: {
      backgroundColor: theme.custom.sidebarBackgroundColor,
    },

    text: {
      width: '250px',
    },
  }),
);

const Home = () => {
  const classes = useStyles();

  // WIP

  const landingPage = (
    <Box p={3}>
      <Box
        marginBottom={2}
        display="flex"
        alignItems="center"
        padding="0 24px 24px 24px"
      >
        <Box>
          <Typography className={classes.title} variant="h5">
            Hello, Nenad!
          </Typography>
          <Typography variant="body1">
            Welcome back to your Dashboard.
          </Typography>
        </Box>
        <Box textAlign="right" marginLeft="auto">
          <Typography variant="body1">Current date</Typography>
          <Typography variant="body2">9/19/2020</Typography>
        </Box>
      </Box>
      <Divider />
      <Grid container>
        <Grid item md={6}>
          <Box p={2} flex="1">
            <Box>
              <Typography variant="body1">Devices</Typography>
              <Typography variant="body2">
                Summed up stats about your devices.
              </Typography>
            </Box>
            <Box
              display="flex"
              textAlign="center"
              padding="32px 0"
              flexDirection="column"
            >
              <Grid container>
                <Grid xs={6} lg={4} item>
                  <Box p={2} className={classes.text}>
                    <DirectionsRunIcon />
                    <Typography variant="body1">Active</Typography>
                    <Typography color="secondary" variant="body2">
                      8
                    </Typography>
                    <Typography variant="body2">
                      Current number of your active devices.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={6} lg={4} item>
                  <Box p={2} className={classes.text}>
                    <AddCircleIcon />
                    <Typography variant="body1">Created</Typography>
                    <Typography color="secondary" variant="body2">
                      2 days ago
                    </Typography>
                    <Typography variant="body2">
                      Date your last device was created.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={6} lg={4} item>
                  <Box p={2} className={classes.text}>
                    <AccessTimeIcon />
                    <Typography variant="body1">Activity</Typography>
                    <Typography color="secondary" variant="body2">
                      22 minutes ago
                    </Typography>
                    <Typography variant="body2">
                      Date of your device last activity.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={6} lg={4} item>
                  <Box p={2} className={classes.text}>
                    <CreateIcon />
                    <Typography variant="body1">Entries</Typography>
                    <Typography color="secondary" variant="body2">
                      3843
                    </Typography>
                    <Typography variant="body2">
                      Total number of your devices entries.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box marginLeft={1} p={2} flex="1">
            <Box>
              <Typography variant="body1">Account</Typography>
              <Typography variant="body2">Your account statistics.</Typography>
            </Box>

            <Box
              display="flex"
              textAlign="center"
              alignItems="center"
              padding="32px 0"
              flexDirection="column"
            >
              <Grid container>
                <Grid xs={6} lg={4} item>
                  <Box p={2} className={classes.text}>
                    <PersonIcon />
                    <Typography variant="body1">Role</Typography>
                    <Typography color="secondary" variant="body2">
                      Standard
                    </Typography>
                    <Typography variant="body2">
                      Your account authorization level.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={6} lg={4} item>
                  <Box p={2} className={classes.text}>
                    <HistoryIcon />
                    <Typography variant="body1">Last login</Typography>
                    <Typography color="secondary" variant="body2">
                      13 minutes ago
                    </Typography>
                    <Typography variant="body2">
                      Date of your last login.
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={6} lg={4} item>
                  <Box p={2} className={classes.text}>
                    <DateRangeIcon />
                    <Typography variant="body1">Member since</Typography>
                    <Typography color="secondary" variant="body2">
                      9/20/2020
                    </Typography>
                    <Typography variant="body2">
                      Date when you become member.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return <React.Fragment>{landingPage}</React.Fragment>;
};

export { Home };
