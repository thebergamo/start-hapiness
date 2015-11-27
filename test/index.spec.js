'use strict';
// load deps
let lab = exports.lab = require('lab').script();
global.expect = require('chai').expect;

// prepare environment
global. it = lab.it;
global.describe = lab.describe;
global.before = lab.before;
global.beforeEach = lab.beforeEach;

// get the server
global.server = require('../lib/server');
global.db = global.server.database;

global.before((done) => [
  global.db['database'].on('connected', () => {
    done();
  })
]);

