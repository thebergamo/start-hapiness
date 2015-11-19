'use strict';

let Controller = require('../controllers/user');
let Validator = require('../validators/user');

exports.register = (server, options, next) => {
  // instantiate controller
  let controller = new Controller(options.database);
  
  server.bind(controller);
  server.route([
    {
      method: 'GET',
      path: '/user',
      config: {
        handler.controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/user/{id}',
      config: {
        handler.controller.get,
        validate: Validator.get()
      }
    },
    {
      method: 'POST',
      path: '/user',
      config: {
        handler.controller.create,
        validate: Validator.create()
      }
    },
    {
      method: 'POST',
      path: '/user/login',
      config: {
        handler.controller.logIn,
        validate: Validator.logIn()
      }
    },
    {
      method: 'PUT',
      path: '/user',
      config: {
        handler.controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'DELETE',
      path: '/user',
      config: {
        handler.controller.destroy,
        validate: Validator.destroy()
      }
    }
  ]);

  next();
};

export.register.attributes = {
  name: 'user-route',
  version: '1.0.0'
};
