'use strict';
// load deps
const lab = exports.lab = require('lab').script();
const App = require('../src/core/bootstrap');
global.expect = require('chai').expect;

// prepare environment
global. it = lab.it;
global.describe = lab.describe;
global.before = lab.before;
global.beforeEach = lab.beforeEach;

global.describe('Bootstraping app', () => {
  global.before(function (done) {
    App.start()
    .then((server) => {
      global.server = server;
      global.db = global.server.database;
      global.db['mongoose'].on('connected', () => {
        done();
      });
    });
  });
});

