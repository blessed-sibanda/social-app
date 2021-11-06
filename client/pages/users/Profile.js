import { useTheme } from '@emotion/react';
import { Edit, Person } from '@mui/icons-material';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  List,
  Typography,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteUser from '../../components/DeleteUser';
import authHelper from '../../helpers/auth-helper';
import userApi from '../../services/user-api';

const useStyles = () => {
  const theme = useTheme();
  return {
    root: {
      maxWidth: 600,
      margin: 'auto',
      p: 2,
      marginTop: theme.spacing(2),
    },
    title: {
      marginTop: theme.spacing(1),
      color: theme.palette.protectedTitle,
    },
  };
};

const Profile = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const jwt = authHelper.isAuthenticated();

    userApi.read({ userId }, { t: jwt.token }, signal).then((data) => setUser(data));

    return () => abortController.abort();
  }, [userId]);

  const styles = useStyles();

  return (
    <Paper sx={styles.root} elevation={4}>
      <Typography variant='h6' sx={styles.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />
          {authHelper.isAuthenticated() &&
            authHelper.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={`/users/${user._id}/edit`}>
                  <IconButton color='primary'>
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={`Joined: ${new Date(user.createdAt).toDateString()}`}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;
