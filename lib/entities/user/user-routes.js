'use strict';

const Controller = require('./user-controller');
const Validator = require('./user-schema');

exports.register = (server, options, next) => {
  // instantiate controller
  const controller = new Controller(options.database);

  server.bind(controller);
  server.route([
    {
      method: 'GET',
      path: '/user',
      config: {
        auth: false,
        handler: controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/user/{id}',
      config: {
        handler: controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/user',
      config: {
        auth: false,
        handler: controller.create,
        validate: Validator.create()
      }
    },
    {
      method: 'POST',
      path: '/user/login',
      config: {
        auth: false,
        handler: controller.logIn,
        validate: Validator.logIn()
      }
    },
    {
      method: 'PUT',
      path: '/user/{id?}',
      config: {
        handler: controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'DELETE',
      path: '/user/{id?}',
      config: {
        handler: controller.destroy,
        validate: Validator.destroy()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'user-route',
  version: '1.0.0'
};
