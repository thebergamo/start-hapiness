'use strict';
// load deps
const lab = exports.lab = require('lab').script();
global.expect = require('chai').expect;

// prepare environment
global. it = lab.it;
global.describe = lab.describe;
global.before = lab.before;
global.beforeEach = lab.beforeEach;

global.before((done) => [
  require('../src/core/bootstrap').start()
  .then((server) => {
    global.server = server;
    global.db = global.server.database;
    global.db['database'].on('connected', () => {
      done();
    });
  })
]);

