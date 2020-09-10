import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  Box,
  Divider,
} from '@material-ui/core';

interface IFormInput {
  firstName: String;
  lastName: string;
  email: string;
}

const Profile = () => {
  const { register, handleSubmit, errors } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);
  const [values, setValues] = useState({
    firstName: 'Nenad',
    lastName: 'Filipovic',
    email: 'nenad@nenad.com',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m={1}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  value={values.firstName}
                  inputRef={register({ required: true })}
                  onChange={(event) =>
                    setValues({ ...values, firstName: event.target.value })
                  }
                ></TextField>
                {errors.firstName && 'First name is required'}
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  required
                  value={values.lastName}
                  inputRef={register({ required: true })}
                  onChange={(event) =>
                    setValues({ ...values, lastName: event.target.value })
                  }
                ></TextField>
                {errors.lastName && 'Last name is required'}
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  required
                  value={values.email}
                  inputRef={register({ required: true })}
                  onChange={(event) =>
                    setValues({ ...values, email: event.target.value })
                  }
                ></TextField>
                {errors.email && 'Email is required'}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button type="submit" color="primary">
              Save
            </Button>
          </Box>
        </Card>
      </Box>
    </form>
  );
};

export { Profile };
