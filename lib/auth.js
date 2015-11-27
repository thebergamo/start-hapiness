'use strict';

let Promise = require('bluebird');
let jwt = require('hapi-auth-jwt2');

let db = require('./database');

exports.register = (server, options, next) => {
  server.register(jwt, registerAuth);

  function registerAuth (err) {
    if (err) { throw err; }

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT,
      validateFunc: validate,
      verifyOptions: {algorithms: [ 'HS256' ]}
    });

    server.auth.default('jwt');

    return next();
  }

  function validate (decoded, request, cb) {
    let User = db.User;
    return new Promise((resolve) => {
      User.findAsync({_id: decoded.id})
      .then((user) => {
        if (!user) {
          return cb(null, false);
        }

        return cb(null, true);
      });
    });
  }
};

exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0'
};
