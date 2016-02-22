'use strict';

// load deps
const Promise = require('bluebird');

const url = require('url');
const path = require('path');
const glob = require('glob');
const mongoose = require('mongoose');

exports.register = (server, options, next) => {
  let db = {};

  const DB_URI = getDatabaseURI();
  // connect to the database
  mongoose.connect(DB_URI);

  db = getModels(db);

  db['database'] = mongoose.connection;

  db['database'].on('connected', onDatabaseConnection);
  db['database'].on('disconnected', onDatabaseDisconnection);
  db['database'].on('error', onDatabaseError);

  server.decorate('server', 'database', db);

  return next();

  /**
   *
   * When the database is ready, log it!
   *
   */
  function onDatabaseConnection () {
    server.log(['info', 'database'], 'Database connection is open!');
  }

  /**
   *
   * When the database is disconnected, log it!
   *
   */
  function onDatabaseDisconnection () {
    server.log(['warn', 'database'], 'Database connection is lost');
  }

  /**
   *
   * When the database has an error, log it!
   *
   */
  function onDatabaseError (err) {
    server.log(['error', 'database'], 'Database connection has an error: ' + err);
  }
};

exports.register.attributes = {
  name: 'database',
  version: '1.0.0'
};

/**
 *
 * Get the DB_URI based on NODE_ENV
 *
 */
function getDatabaseURI () {
  return url.format({
    protocol: 'mongodb',
    slashes: true,
    port: process.env.DB_PORT || 27017,
    hostname: process.env.DB_HOST || 'localhost',
    pathname: process.env.DB_NAME || 'project'
  });
}

/**
 *
 * Get all models
 *
 */
function getModels (db) {
  const pattern = './src/**/model.js';
  glob.sync(pattern)
  .map((file) => {
    let root = path.join(__dirname, '..', '..', file);
    let entity = file.split('/').reverse()[1];
    entity = entity[0].toUpperCase() + entity.slice(1);

    db[entity] = Promise.promisifyAll(require(root));
  });

  return db;
}

