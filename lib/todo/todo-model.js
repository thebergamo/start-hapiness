'use strict';

let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  checked: Boolean
});

let TodoModel = mongoose.model('Todo', Schema);

module.exports = TodoModel;

