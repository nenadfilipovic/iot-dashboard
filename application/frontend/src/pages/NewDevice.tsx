import React, { useState } from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
  TextField,
  Card,
  CardActions,
  Button,
  CardContent,
  CardHeader,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Avatar,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import MemoryIcon from '@material-ui/icons/Memory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
      width: '400px',
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    card: {
      borderRadius: '5px',
      padding: '10px',
    },
    input: {
      margin: '2px 0',
    },
    formControl: {
      minWidth: 120,
      marginTop: '10px',
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

const New = () => {
  const { register } = useForm();
  const classes = useStyles();
  const [data, setData] = useState({
    name: '',
    topic: '',
    description: '',
  });
  return (
    <div className={classes.root}>
      <form>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                <MemoryIcon />
              </Avatar>
            }
            title="Add device:"
            subheader="Please enter data into required fields."
          />
          <CardContent>
            <TextField
              className={classes.input}
              label="name"
              value={data.name}
              name="name"
              inputRef={register}
              fullWidth
              onChange={(event) =>
                setData({ ...data, name: event.target.value })
              }
            />
            <TextField
              className={classes.input}
              label="topic"
              value={data.topic}
              name="topic"
              inputRef={register}
              fullWidth
              onChange={(event) =>
                setData({ ...data, topic: event.target.value })
              }
            />
            <TextField
              className={classes.input}
              label="description"
              value={data.description}
              name="description"
              inputRef={register}
              fullWidth
              onChange={(event) =>
                setData({ ...data, description: event.target.value })
              }
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select>
                <MenuItem value={'esp32'}>esp32</MenuItem>
                <MenuItem value={'esp8266'}>esp8266</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export { New };
