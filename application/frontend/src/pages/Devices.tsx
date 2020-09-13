import React, { useState } from 'react';
import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
  makeStyles,
  createStyles,
  Theme,
  CardHeader,
  IconButton,
  Fab,
  Modal,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import MemoryIcon from '@material-ui/icons/Memory';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Layout } from '../parts';
import { New } from './NewDevice';

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
    fab: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

const Devices = () => {
  const devices = [
    {
      id: '123123',
      name: 'device',
      topic: 'topic',
      type: 'esp32',
      description: 'Some semi long description about your device.',
    },
  ];

  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const list = devices.map((device) => {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle1">{device.name}</Typography>}
            subheader="Created: 18.03.2020:18:02:22"
            avatar={
              <Avatar className={classes.avatar}>
                <MemoryIcon />
              </Avatar>
            }
            action={
              <>
                <IconButton
                  aria-label="settings"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    setAnchorEl(event.currentTarget)
                  }
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
              </>
            }
          />
          <Divider />
          <CardContent>
            <Typography variant="body2">Topic: {device.topic}</Typography>
            <Typography variant="body2">Type: {device.type}</Typography>
            <Typography variant="body2">
              Description: {device.description}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              component={NavLink}
              to={`/devices/${device.id}`}
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Layout />
      <Box className={classes.wrapper}>
        <Box className={classes.contentContainer}>
          <Box className={classes.content} m={2}>
            <Grid container spacing={2}>
              {list}
            </Grid>
            <Fab
              onClick={() => setModal(true)}
              className={classes.fab}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
            <Modal
              open={modal}
              onClose={() => setModal(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <New />
            </Modal>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { Devices };
