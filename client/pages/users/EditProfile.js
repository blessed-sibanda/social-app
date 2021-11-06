import { useTheme } from '@emotion/react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authHelper from '../../helpers/auth-helper';
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

const EditProfile = () => {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const { userId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const jwt = authHelper.isAuthenticated();

    userApi.read({ userId }, { t: jwt.token }, signal).then((data) =>
      setValues({
        ...values,
        name: data.name,
        email: data.email,
      }),
    );

    return () => abortController.abort();
  }, [userId]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const { name, email, password } = values;
    const user = { name, email, password: password || undefined };
    const jwt = authHelper.isAuthenticated();

    userApi.update({ userId }, { t: jwt.token }, user).then((data) => {
      if (data.error) setErrors(data.error);
      else navigate(`/users/${userId}`);
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
            Edit Profile
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
    </>
  );
};

export default EditProfile;
