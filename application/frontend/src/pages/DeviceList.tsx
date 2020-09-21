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
  ListItemIcon,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import MemoryIcon from '@material-ui/icons/Memory';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';

import { PageSegment } from '../components/PageSegment';
import { CreateDevice } from './CreateDevice';
import { Device, ReactSVGComponent } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
  }),
);

const deviceData: Device[] = [
  {
    deviceUniqueIndentifier: '123',
    deviceName: 'Device-1',
    deviceChannel: 'home',
    deviceType: 'esp32',
    deviceDescription: 'Living room sensor.',
    deviceCreateDate: '18:05:03:19-02-2020',
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
        headerSubtitle={device.deviceCreateDate}
        headerIcon={MemoryIcon as ReactSVGComponent}
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
              <MenuItem children={'Remove'} dense onClick={handleClose} />
            </Menu>
          </React.Fragment>
        }
        bodyContent={
          <List dense>
            <ListItem divider>
              <ListItemIcon>
                <SettingsRemoteIcon />
              </ListItemIcon>
              <ListItemText
                primary="This is device topic or channel."
                secondary={device.deviceChannel}
              />
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                primary="Device type."
                secondary={device.deviceType}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText
                primary="Device description, like where is device located."
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
            to={`/app/devices/${device.deviceUniqueIndentifier}`}
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
      <Fab onClick={() => setModalOpen(true)} className={classes.fab}>
        <AddIcon />
      </Fab>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateDevice />
      </Modal>
    </React.Fragment>
  );
};

export { DeviceList };
