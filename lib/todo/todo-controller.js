'use strict';

const Boom = require('boom');

function TodoController (db) {
  this.database = db;
  this.model = db.Todo;
}

module.exports = TodoController;

// [GET] /todo
TodoController.prototype.list = function (request, reply) {
  const userId = request.auth.credentials.id;

  this.model.findAsync({owner: userId})
  .then((todos) => {
    reply(todos);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [GET] /todo/{id}
TodoController.prototype.get = function (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;

  this.model.findOneAsync({_id: id, owner: userId})
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
  const userId = request.auth.credentials.id;
  const payload = request.payload;

  payload.owner = userId;

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
  const userId = request.auth.credentials.id;
  const id = request.params.id;
  const payload = request.payload;

  this.model.findOneAndUpdateAsync({_id: id, owner: userId}, payload, { new: true })
  .then((todo) => {
    reply(todo);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [DELETE] /todo/{id}
TodoController.prototype.destroy = function (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;

  this.model.removeAsync({_id: id, owner: userId})
  .then(() => {
    reply();
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};
