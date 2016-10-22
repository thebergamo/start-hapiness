'use strict';

const Promise = require('bluebird');

const mongoose = require('k7-mongoose').mongoose;

const Schema = new mongoose.Schema({
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

const TodoModel = mongoose.model('Todo', Schema);

module.exports = Promise.promisifyAll(TodoModel);

