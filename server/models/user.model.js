import crypto from 'crypto';

import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true },
);

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.virtual('data').get(function () {
  this.hashedPassword = undefined;
  this.salt = undefined;
  return this;
});

userSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()).toString();
  },
  encryptPassword: function (password) {
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
};

export default model('User', userSchema);
