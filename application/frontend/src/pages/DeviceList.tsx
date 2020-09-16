import React, { useState } from 'react';
import {
  Grid,
  Button,
  makeStyles,
  createStyles,
  Theme,
  IconButton,
  Fab,
  Modal,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import MemoryIcon from '@material-ui/icons/Memory';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { PageSegment } from '../components/PageSegment';
import { CreateDevice } from './CreateDevice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
  }),
);

const deviceData = [
  {
    id: '123',
    deviceName: 'Device-1',
    deviceTopic: 'home',
    deviceType: 'esp32',
    deviceDescription: 'Living room sensor.',
    deviceCreated: '18:05:03:19-02-2020',
  },
  {
    id: '123',
    deviceName: 'Device-1',
    deviceTopic: 'home',
    deviceType: 'esp32',
    deviceDescription: 'Living room sensor.',
    deviceCreated: '18:05:03:19-02-2020',
  },
];

const DeviceList = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const devices = deviceData.map((device) => (
    <Grid item xs={12} sm={6} md={4}>
      <PageSegment
        headerTitle={device.deviceName}
        headerSubtitle={device.deviceCreated}
        headerIcon={MemoryIcon as React.FC<React.SVGProps<SVGSVGElement>>}
        headerActions={
          <React.Fragment>
            <IconButton
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorEl(event.currentTarget)
              }
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem dense onClick={handleClose}>
                Delete
              </MenuItem>
            </Menu>
          </React.Fragment>
        }
        bodyContent={
          <List dense>
            <ListItem divider alignItems="flex-start">
              <ListItemText primary="Topic" secondary={device.deviceTopic} />
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Type" secondary={device.deviceType} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Description"
                secondary={device.deviceDescription}
              />
            </ListItem>
          </List>
        }
        bodyActions={
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={NavLink}
            to={`/app/devices/${device.id}`}
          >
            Details
          </Button>
        }
      />
    </Grid>
  ));

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {devices}
      </Grid>
      <Fab
        onClick={() => setModalOpen(true)}
        className={classes.fab}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateDevice />
      </Modal>
    </React.Fragment>
  );
};

export { DeviceList };
