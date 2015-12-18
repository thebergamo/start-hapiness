'use strict';

// load deps
const fs = require('fs');
const Hapi = require('hapi');
const boomDecorators = require('hapi-boom-decorators');

// load database
const db = require('./database');
const auth = require('./auth');
const logs = require('./logs');

// instantiate a new server
const server = new Hapi.Server();

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
const plugins = fs.readdirSync('lib/entities')
  .filter((dir) => {
    return dir.match(/^[^.]/);
  })
  .map((entity) => {
    return {
      register: require('./entities/' + entity + '/' + entity + '-routes'),
      options: {database: db}
    };
  });

plugins.push({register: auth});
plugins.push({register: logs});
plugins.push({register: boomDecorators});

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  if (!module.parent) {
    server.start((err) => {
      if (err) {
        throw err;
      }

      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
});

module.exports = server;
