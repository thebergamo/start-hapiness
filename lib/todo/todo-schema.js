'use strict';

// load deps
let Joi = require('joi');

let TodoValidator = {
  list: list,
  get: get,
  create: create,
  update: update,
  destroy: destroy
};

module.exports = TodoValidator;

function list () {
  return {};
}

function get () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    }
  };
}

function create () {
  return {
    payload: {
      name: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .required(),
      checked: Joi
        .boolean()
        .default(false)
        .optional()
    }
  };
}

function update () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    },
    payload: {
      name: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .optional(),
      checked: Joi
        .boolean()
        .default(false)
        .optional()
    }
  };
}

function destroy () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    }
  };
}
