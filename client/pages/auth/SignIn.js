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
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import authHelper from '../../helpers/auth-helper';
import authApi from '../../services/auth-api';
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

const SignIn = () => {
  const [values, setValues] = useState({
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const { email, password } = values;
    const user = { email, password };

    authApi.signin(user).then((data) => {
      if (data.error) {
        if (typeof data.error === 'string') setError(data.error);
        if (typeof data === 'object') setErrors(data.error);
      } else authHelper.authenticate(data, () => navigate(from, { replace: true }));
    });
  };

  const styles = useStyles();

  const renderError = (err) => (
    <Typography key={err} sx={styles.error} component='p' color='error'>
      {err}
    </Typography>
  );

  const displayErrors = (field = '') => {
    if (field === '') {
      return error && renderError(error);
    }
    return errors[field] && errors[field].map((err) => renderError(err));
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant='h6' sx={styles.title}>
          Sign In
        </Typography>
        {displayErrors()}
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
  );
};

export default SignIn;
