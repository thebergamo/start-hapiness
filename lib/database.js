'use strict';

// load deps
const Promise = require('bluebird');
const mongoose = require('mongoose');

const db = {
  User: Promise.promisifyAll(require('./entities/user/user-model')),
  Todo: Promise.promisifyAll(require('./entities/todo/todo-model'))
};

const DB_URI = getDatabaseURI();

// connect to the database
mongoose.connect(DB_URI);

db['database'] = mongoose.connection;

db['database'].on('connected', onDatabaseConnection);
db['database'].on('disconnected', onDatabaseDisconnection);
db['database'].on('error', onDatabaseError);

module.exports = db;

/**
 *
 * When the database is ready, log it!
 *
 */
function onDatabaseConnection () {
  console.log('Database connection is open!');
}

/**
 *
 * When the database is disconnected, log it!
 *
 */
function onDatabaseDisconnection () {
  console.log('Database connection is lost');
}

/**
 *
 * When the database has an error, log it!
 *
 */
function onDatabaseError (err) {
  console.log('Database connection has an error: ' + err);
}

/**
 *
 * Get the DB_URI based on NODE_ENV
 *
 */
function getDatabaseURI () {
  return process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URI : process.env.DB_URI;
}
