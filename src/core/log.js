'use strict';

const Good = require('good');

exports.register = (server, options, next) => {
  const opts = {
    opsInterval: 1000,
    reporters: [{
      reporter: require('good-console'),
      events: {error: '*', log: '*', response: '*', request: '*'}
    }, {
      reporter: require('good-file'),
      events: {ops: '*', error: '*'},
      config: {
        path: '../../logs',
        rotate: 'daily'
      }
    }]
  };

  server.register({
    register: Good,
    options: opts
  }, (err) => {
    return next(err);
  });
};

exports.register.attributes = {
  name: 'logs',
  version: '1.0.0'
};

