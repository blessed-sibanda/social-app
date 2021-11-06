import { Router } from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config';
import User from '../models/user.model';
import { signInValidation } from '../validations/auth.validation';
import { handleValidationErrors } from '../validations/validator';

const router = Router();

router.post('/signin', ...signInValidation, async (req, res) => {
  try {
    handleValidationErrors(req);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie('t', token, { expire: new Date() + 9999 });

    const { _id, email, name } = user;

    return res.json({ token, user: { _id, name, email } });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/signout', (req, res) => {
  res.clearCookie('t');
  return res.json({
    message: 'Signed out',
  });
});

export default router;
