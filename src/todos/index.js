'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const basePath = __dirname;

exports.register = (server, options, next) => {
  // register route
  server.methods.loadRoutes(_.compact(getFiles('routes.js')), () => {
    next();
  });
};

exports.register.attributes = {
  name: 'todo',
  version: '1.0.0'
};

function getFiles (type) {
  return fs.readdirSync(basePath)
  .map((entity) => {
    let root = path.join(basePath, entity, type);

    if (!isFile(root)) {
      return;
    }

    return root;
  });
}

function isFile (root) {
  try {
    return fs.statSync(root).isFile();
  } catch (err) {
    return false;
  }
}

