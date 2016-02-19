'use strict';

function TodoController (db) {
  this.database = db;
  this.model = db.Todo;
}

TodoController.prototype = {
  list,
  read,
  create,
  update,
  destroy
};

module.exports = TodoController;

// [GET] /todo
function list (request, reply) {
  const userId = request.auth.credentials.id;

  this.model.findAsync({owner: userId})
  .then((todos) => {
    reply(todos);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [GET] /todo/{id}
function read (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;

  this.model.findOneAsync({_id: id, owner: userId})
  .then((todo) => {
    if (!todo) {
      reply.notFound();
      return;
    }

    reply(todo);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /todo
function create (request, reply) {
  const userId = request.auth.credentials.id;
  const payload = request.payload;

  payload.owner = userId;

  this.model.createAsync(payload)
  .then((todo) => {
    reply(todo).code(201);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [PUT] /todo/{id}
function update (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;
  const payload = request.payload;

  this.model.findOneAndUpdateAsync({_id: id, owner: userId}, payload, { new: true })
  .then((todo) => {
    reply(todo);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [DELETE] /todo/{id}
function destroy (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;

  this.model.removeAsync({_id: id, owner: userId})
  .then(() => {
    reply();
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}
