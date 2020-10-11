import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';

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
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MemoryIcon from '@material-ui/icons/Memory';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';

import { PageSegment } from '../components/PageSegment';
import { CreateDevice } from './CreateDevice';
import { ReactSVGComponent, RootState } from '../types';
import { thunkGetAllDevices, thunkRemoveDevice } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
  }),
);

const DeviceList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(thunkGetAllDevices());
  }, [dispatch]);

  const deviceData = useSelector(
    (state: RootState) => state.deviceReducer.devices,
  );

  const devices = map(deviceData, (device) => (
    <Grid key={device.name} item xs={12} sm={6} md={4}>
      <PageSegment
        title={device?.name!}
        subtitle={device?.registerDate!}
        icon={MemoryIcon as ReactSVGComponent}
        headerMenu={
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
              <MenuItem
                onClick={() => {
                  dispatch(thunkRemoveDevice(device.channel));
                  handleClose();
                }}
                children={'Remove'}
                dense
              />
            </Menu>
          </React.Fragment>
        }
        content={
          <List dense>
            <ListItem divider>
              <ListItemIcon>
                <SettingsRemoteIcon />
              </ListItemIcon>
              <ListItemText
                primary="This is device topic or channel"
                secondary={device.channel}
              />
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Device type" secondary={device.type} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText
                primary="Device description, like where is device located"
                secondary={device.description}
              />
            </ListItem>
          </List>
        }
        actions={
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={NavLink}
            to={`/devices/${device.channel}`}
          >
            Details
          </Button>
        }
      />
    </Grid>
  ));

  return (
    <Box m={2}>
      <Grid container spacing={2}>
        {devices}
      </Grid>
      <Fab onClick={() => setModalOpen(true)} className={classes.actionButton}>
        <AddIcon />
      </Fab>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateDevice />
      </Modal>
    </Box>
  );
};

export { DeviceList };
