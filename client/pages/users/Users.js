import { useTheme } from '@emotion/react';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '../../services/user-api';
import { ArrowForward, Person } from '@mui/icons-material';

const useStyles = () => {
  const theme = useTheme();
  return {
    root: {
      p: 1,
      m: 3,
    },
    title: {
      m: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(0)}`,
      color: theme.palette.openTitle,
    },
  };
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    userApi.list(signal).then((data) => {
      if (data && data.error) console.log(data.error);
      else setUsers(data);
    });

    return () => abortController.abort();
  }, []);

  const styles = useStyles();

  return (
    <Paper sx={styles.root} elevation={2}>
      <Typography sx={styles.title} variant='h6'>
        All Users
      </Typography>
      <List dense>
        {users.map((user, i) => (
          <Link to={`/users/${user._id}`} key={i}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
};

export default Users;
