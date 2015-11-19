'use strict';

// load env variables
// require('dotenv').load();

// load deps
let Hapi = require('hapi');

// load database
let db = require('./database');
let loader = require('./loader');

// instantiate a new server
let server = new Hapi.Server();

// set the port for listening
server.connection({
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT
});

// Expose database
if (process.env.NODE_ENV === 'test') {
  server.database = db;
}

// load routes
server.register(getRoutes(), (err) => {
  if (err) { throw err; }

  if (!module.parent) {
    server.start((err) => {
      if (err) { throw err; }

      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
});

module.exports = server;

/**
 *
 * Load all controllers
 *
 */
function getRoutes () {
  return loader('routes').map((route) => {
    return {
      register: route.File,
      options: {
        database: db
      }
    };
  });
}

