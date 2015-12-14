'use strict';

let Controller = require('todo');
let Validator = require('todo');

exports.register = (server, options, next) => {
  // instantiate controller
  let controller = new Controller(options.database);

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
        handler: controller.get,
        validate: Validator.get()
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
