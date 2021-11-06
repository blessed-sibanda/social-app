const { body, check } = require('express-validator');

import User from '../models/user.model';

const uniqueEmail = (value) => {
  return User.findOne({ email: value }).then((user) => {
    if (user) return Promise.reject('E-mail already in use');
  });
};

export const userCreationValidations = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  check('email')
    .isEmail()
    .withMessage('Valid email address is required')
    .custom(uniqueEmail),

  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const userUpdateValidations = [
  check('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  check('email').optional().isEmail().withMessage('Email is invalid'),

  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
