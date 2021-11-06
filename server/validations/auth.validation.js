const { check } = require('express-validator');

import User from '../models/user.model';

export const signInValidation = [
  check('email').isEmail().withMessage('Valid Email address is required'),
  check('password').notEmpty().withMessage('Password is required'),
];
