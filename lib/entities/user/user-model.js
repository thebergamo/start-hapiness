'use strict';

const bcrypt = require('bcryptjs');
const shortid = require('shortid');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  recoveryCode: {
    type: String,
    unique: true,
    default: shortid.generate
  }
});

Schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  user.password = hashPassword(user.password);

  return next();
});

Schema.pre('findOneAndUpdate', function () {
  const password = hashPassword(this.getUpdate().$set.password);

  if (!password) {
    return;
  }

  this.findOneAndUpdate({}, {password: password});
});

Schema.methods.validatePassword = function (requestPassword) {
  return bcrypt.compareSync(requestPassword, this.password);
};

const UserModel = mongoose.model('User', Schema);

module.exports = UserModel;

function hashPassword (password) {
  if (!password) {
    return false;
  }

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
