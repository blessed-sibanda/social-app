import { useTheme } from '@emotion/react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Dialog,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '../../services/user-api';

const useStyles = () => {
  const theme = useTheme();
  return {
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
    },
    textField: {
      marginLeft: 1,
      marginRight: 1,
      width: 300,
    },
    error: {
      fontSize: 13,
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2),
    },
  };
};

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const { name, email, password } = values;
    const user = { name, email, password };

    userApi.create(user).then((data) => {
      if (data.error) setErrors(data.error);
      else {
        setMessage(data.message);
        setOpen(true);
      }
    });
  };

  const styles = useStyles();

  const displayErrors = (field) => {
    return (
      errors[field] &&
      errors[field].map((err) => (
        <Typography sx={styles.error} component='p' color='error'>
          {err}
        </Typography>
      ))
    );
  };

  return (
    <>
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant='h6' sx={styles.title}>
            Sign Up
          </Typography>
          <TextField
            id='name'
            label='Name'
            sx={styles.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin='normal'
          />
          {displayErrors('name')}
          <TextField
            id='email'
            label='Email'
            type='email'
            sx={styles.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin='normal'
          />
          {displayErrors('email')}
          <TextField
            id='password'
            label='Password'
            type='password'
            sx={styles.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin='normal'
          />
          {displayErrors('password')}
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            onClick={clickSubmit}
            sx={styles.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} disablebackdropclick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Link to='/signin'>
            <Button color='primary' autoFocus='autoFocus' variant='contained'>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
