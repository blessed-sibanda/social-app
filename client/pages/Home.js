import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import unicornBikeImg from '../assets/images/unicornbike.jpg';
import authHelper from '../helpers/auth-helper';

const useStyles = () => {
  const theme = useTheme();
  return {
    card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing(5),
    },
    title: {
      padding: `${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(1.5)}`,
      color: theme.palette.openTitle,
    },
    media: {
      minHeight: 400,
    },
  };
};

const Home = () => {
  const styles = useStyles();
  return (
    <Card sx={styles.card}>
      <Typography sx={styles.title} variant='h6'>
        Home Page
      </Typography>
      <CardMedia
        sx={styles.media}
        component='img'
        image={unicornBikeImg}
        title='Unicorn Bicycle'
      />
      <CardContent>
        <Typography variant='body2' component='p'>
          Welcome to the Social App home page
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
