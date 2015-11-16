'use strict';

var Controller = require('../controllers/todo');
var Validator = require('../validators/todo');

exports.register = (server, options, next) => {
  // instantiate controller
  var controller = new Controller(options.database);

  server.bind(controller);
  server.route([
    {
      method: 'GET',
      path: '/todo',
      config: {
        handler: controller.index,
        validate: Validator.index()
      }
    },
    {
      method: 'GET',
      path: '/todo/{id}',
      config: {
        handler: controller.show,
        validate: Validator.show()
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
