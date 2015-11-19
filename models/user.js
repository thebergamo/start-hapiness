'use strict';

let bcrypt = require('bcryptjs');
let shortid = require('shortid');
let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
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

Schema.pre('save', (next) => {
  if(this.isMOdified('password')) return next();

  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);

  return next();
});

Schema.methods.validatePassword = (requestPassword, myPassword) => {
  return bcrypt.compareSync(requestPassword, myPassword);
};

let UserModel = mongoose.model('User', Schema);

module.exports = UserModel;
