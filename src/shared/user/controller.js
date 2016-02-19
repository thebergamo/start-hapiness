'use strict';

const jwt = require('jsonwebtoken');

function UserController (db) {
  this.database = db;
  this.model = db.User;
}

UserController.prototype = {
  list,
  read,
  create,
  logIn,
  update,
  destroy
};

module.exports = UserController;

// [GET] /user
function list (request, reply) {
  this.model.findAsync({})
  .then((users) => {
    reply(users);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [GET] /user/{id}
function read (request, reply) {
  const id = request.params.id;

  this.model.findOneAsync({_id: id})
  .then((user) => {
    if (!user) {
      reply.notFound();
      return;
    }

    reply(user);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /user
function create (request, reply) {
  const payload = request.payload;

  this.model.createAsync(payload)
  .then((user) => {
    const token = getToken(user.id);

    reply({
      token: token
    }).code(201);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /user/login
function logIn (request, reply) {
  const credentials = request.payload;

  this.model.findOneAsync({email: credentials.email})
  .then((user) => {
    if (!user) {
      return reply.unauthorized('Email or Password invalid');
    }

    if (!user.validatePassword(credentials.password)) {
      return reply.unauthorized('Email or Password invalid');
    }

    const token = getToken(user.id);

    reply({
      token: token
    });
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [PUT] /user
function update (request, reply) {
  const id = request.params.id;
  const payload = request.payload;

  this.model.findOneAndUpdateAsync({_id: id}, {$set: payload}, {new: true})
  .then((user) => {
    reply(user);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [DELETE] /user
function destroy (request, reply) {
  const id = request.auth.credentials.id;

  this.model.removeAsync({_id: id})
  .then(() => {
    reply();
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

function getToken (id) {
  const secretKey = process.env.JWT || 'stubJWT';

  return jwt.sign({
    id: id
  }, secretKey, {expiresIn: '18h'});
}
