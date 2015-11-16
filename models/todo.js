'use strict';

let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  checked: Boolean
});

let TodoModel = mongoose.model('Todo', Schema);

module.exports = TodoModel;

