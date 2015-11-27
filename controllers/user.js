'use strict';

let jwt = require('jsonwebtoken');
let Boom = require('boom');

function UserController (db) {
  this.database = db;
  this.model = db.User;
}

module.exports = UserController;

// [GET] /user
UserController.prototype.list = function (request, reply) {
  this.model.findAsync({})
  .then((users) => {
    reply(users);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [GET] /user/{id}
UserController.prototype.get = function (request, reply) {
  let id = request.params.id;

  this.model.findOneAsync({_id: id})
  .then((user) => {
    if (!user) {
      reply(Boom.notFound());
      return;
    }

    reply(user);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [POST] /user
UserController.prototype.create = function (request, reply) {
  let payload = request.payload;

  this.model.createAsync(payload)
  .then((user) => {
    let token = getToken(user.id);

    reply({
      token: token
    }).code(201);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [POST] /user/login
UserController.prototype.logIn = function (request, reply) {
  let credentials = request.payload;

  this.model.findOneAsync({email: credentials.email})
  .then((user) => {
    if (!user) {
      return reply(Boom.unauthorized('Email or Password invalid'));
    }

    if (!user.validatePassword(credentials.password)) {
      return reply(Boom.unauthorized('Email or Password invalid'));
    }

    let token = getToken(user.id);

    reply({
      token: token
    });
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [PUT] /user
UserController.prototype.update = function (request, reply) {
  let id = request.params.id;
  let payload = request.payload;

  this.model.findOneAndUpdateAsync({_id: id}, {$set: payload}, {new: true})
  .then((user) => {
    reply(user);
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

// [DELETE] /user
UserController.prototype.destroy = function (request, reply) {
  let id = request.auth.credentials.id;

  this.model.removeAsync({_id: id})
  .then(() => {
    reply();
  })
  .catch((err) => {
    reply(Boom.badImplementation(err.message));
  });
};

function getToken (id) {
  let secretKey = process.env.JWT;

  return jwt.sign({
    id: id
  }, secretKey, {expiresIn: '18h'});
}
