import { Delete } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import authHelper from '../helpers/auth-helper';
import authApi from '../services/auth-api';
import userApi from '../services/user-api';

const DeleteUser = () => {
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const clickButton = () => setOpen(true);

  const handleRequestClose = () => setOpen(false);

  const deleteAccount = () => {
    const jwt = authHelper.isAuthenticated();
    userApi.remove({ userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) console.log(data.error);
      else authHelper.clearJwt(() => navigate('/'));
    });
  };

  return (
    <span>
      <IconButton onClick={clickButton} color='secondary'>
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteAccount} color='secondary' autoFocus='autoFocus'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default DeleteUser;
