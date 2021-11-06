import { Router } from 'express';
import { extend } from 'lodash';

import {
  userCreationValidations,
  userUpdateValidations,
} from '../validations/user.validation';
import { handleValidationErrors } from '../validations/validator';
import User from '../models/user.model';
import auth from '../helpers/auth';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      let users = await User.find().select('name email createdAt updatedAt');
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error });
    }
  })
  .post(...userCreationValidations, async (req, res) => {
    try {
      handleValidationErrors(req);
      const user = new User(req.body);
      await user.save();
      return res.json({
        message: 'Successfully signed up!',
        user: user.data,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

router.param('userId', async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Could not retrieve user' });
  }
});

router
  .route('/:userId')
  .get(auth.requireSignIn, async (req, res) => {
    return res.json(req.profile.data);
  })
  .put(
    auth.requireSignIn,
    auth.hasAuthorization,
    ...userUpdateValidations,
    async (req, res) => {
      try {
        handleValidationErrors(req);
        let user = req.profile;
        user = extend(user, req.body);
        await user.save();
        return res.json(user.data);
      } catch (error) {
        return res.status(400).json({ error });
      }
    },
  )
  .delete(auth.requireSignIn, auth.hasAuthorization, async (req, res) => {
    try {
      let user = req.profile;
      let deletedUser = await user.remove();
      return res.json({
        user: deletedUser.data,
        message: 'User deleted successfully',
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

export default router;
