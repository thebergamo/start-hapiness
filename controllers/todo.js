'use strict';

let Boom = require('boom');

function TodoController (db) {
  this.database = db;
  this.model = db.Todo;
}

module.exports = TodoController;

// [GET] /todo
TodoController.prototype.index = function (request, reply) {
  this.model.findAsync({})
  .then((todos) => {
    reply(todos);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [GET] /todo/{id}
TodoController.prototype.show = function (request, reply) {
  let id = request.params.id;

  this.model.findOneAsync({_id: id})
  .then((todo) => {
    if (!todo) {
      reply(Boom.notFound());
      return;
    }

    reply(todo);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [POST] /todo
TodoController.prototype.create = function (request, reply) {
  let payload = request.payload;

  this.model.createAsync(payload)
  .then((todo) => {
    reply(todo).code(201);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [PUT] /todo/{id}
TodoController.prototype.update = function (request, reply) {
  let id = request.params.id;
  let payload = request.payload;

  this.model.findOneAndUpdateAsync({_id: id}, payload, { new: true })
  .then((todo) => {
    reply(todo);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [DELETE] /todo/{id}
TodoController.prototype.destroy = function (request, reply) {
  let id = request.params.id;

  this.model.removeAsync({_id: id})
  .then(() => {
    reply();
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};
