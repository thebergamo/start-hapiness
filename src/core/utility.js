'use strict';

exports.register = (server, options, next) => {
  server.method('loadRoutes', loadRoutes);

  server.register({
    register: require('hapi-boom-decorators')
  }, (err) => {
    if (!err) {
      return next();
    }
  });

  function loadRoutes (routes, cb) {
    let registerRoutes = routes.map((route) => {
      return {
        register: require(route)
      };
    });

    server.register(registerRoutes, (err) => {
      if (err) {
        cb(err);
      }

      return cb(null);
    });
  }
};

exports.register.attributes = {
  name: 'utility',
  version: '1.0.0'
};

