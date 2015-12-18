'use strict';

const Controller = require('./todo-controller');
const Validator = require('./todo-schema');

exports.register = (server, options, next) => {
  // instantiate controller
  const controller = new Controller(options.database);

  server.bind(controller);
  server.route([
    {
      method: 'GET',
      path: '/todo',
      config: {
        handler: controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/todo/{id}',
      config: {
        handler: controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/todo',
      config: {
        handler: controller.create,
        validate: Validator.create()
      }
    },
    {
      method: 'PUT',
      path: '/todo/{id?}',
      config: {
        handler: controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'DELETE',
      path: '/todo/{id?}',
      config: {
        handler: controller.destroy,
        validate: Validator.destroy()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'todo-route',
  version: '1.0.0'
};
