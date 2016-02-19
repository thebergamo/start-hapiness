'use strict';

require('dotenv').load();

// Load deps
const Hapi = require('hapi');

let server;

module.exports = server = new Hapi.Server();

// Set the port for listening
server.connection({
  host: process.env.SERVER_HOST || 'localhost',
  port: process.env.SERVER_PORT || '8000'
});
