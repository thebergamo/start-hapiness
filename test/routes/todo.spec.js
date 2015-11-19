'use strict';

// load deps
let lab = exports.lab = require('lab').script();
let expect = require('chai').expect;

// prepare environment
let it = lab.it;
let describe = lab.describe;
let before = lab.before;
let beforeEach = lab.beforeEach;

// get the server
let server = require('../../lib/server');
let db = server.database;

describe('Routes /todo', () => {
  before((done) => {
    db['database'].on('connected', () => {
      done();
    });
  });

  describe('GET /todo', () => {
    beforeEach((done) => {
      db.Todo.removeAsync({})
      .then(() => {
        let options = {
          method: 'POST',
          url: '/todo',
          payload: {}
        };

        for (let i = 0; i < 10; i++) {
          options.payload.name = 'TODO Task' + i;

          server.inject(options, (response) => {});
        }
        done();
      });
    });

    it('return 200 HTTP status code', (done) => {
      db.Todo.remove(() => {
        let options = {method: 'GET', url: '/todo'};
        server.inject(options, (response) => {
          expect(response).to.have.property('statusCode', 200);
          done();
        });
      });
    });

    it('returns an empty array when todo is empty', (done) => {
      db.Todo.remove(() => {
        let options = {method: 'GET', url: '/todo'};
        server.inject(options, (response) => {
          expect(response).to.have.property('result');
          expect(response.result).to.have.length.least(0);
          done();
        });
      });
    });

    it('return 10 todo at a time', (done) => {
      let options = {method: 'GET', url: '/todo'};
      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response.result).to.have.length.least(10);
        for (let i = 0; i < 10; i++) {
          let todo = response.result[i];
          expect(todo).to.have.property('name', 'TODO Task' + i);
          expect(todo).to.have.property('checked', false);
        }
        done();
      });
    });
  });

  describe('GET /todo/{id}', () => {
    let todo;
    before((done) => {
      db.Todo.removeAsync({})
      .then(() => {
        let options = {
          method: 'POST',
          url: '/todo',
          payload: {
            name: 'TODO Tasky',
            checked: false
          }
        };

        server.inject(options, (response) => {
          todo = response.result;
          done();
        });
      });
    });

    it('returns 200 HTTP status code', (done) => {
      let options = {method: 'GET', url: '/todo/' + todo._id};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        done();
      });
    });

    it('returns 1 todo at a time', (done) => {
      let options = {method: 'GET', url: '/todo/' + todo._id};
      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('name', 'TODO Tasky');
        expect(response.result).to.have.property('checked', false);
        done();
      });
    });

    it('returns 400 HTTP status code when the specified id is invalid', (done) => {
      let options = {method: 'GET', url: '/todo/12'};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "id" fails because ["id" with value "12" fails to match the _id pattern]');

        done();
      });
    });

    it('returns 404 HTTP status code when the specified id is not found', (done) => {
      let options = {method: 'GET', url: '/todo/561fd08d9607e21a7d39819d'};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 404);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 404);
        expect(response.result).to.have.property('error', 'Not Found');

        done();
      });
    });
  });

  describe('POST /todo', () => {
    it('returns 400 HTTP status code  when no body is sended', (done) => {
      let options = {method: 'POST', url: '/todo'};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', '"value" must be an object');
        done();
      });
    });

    it('returns 400 HTTP status code  when no `name` is send', (done) => {
      let options = {method: 'POST', url: '/todo', payload: {}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "name" fails because ["name" is required]');
        done();
      });
    });

    it('returns 400 HTTP status code  when `name` is empty', (done) => {
      let options = {method: 'POST', url: '/todo', payload: {name: ''}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "name" fails because ["name" is not allowed to be empty]');
        done();
      });
    });

    it('returns 400 HTTP status code  when `name` isn\'t a string', (done) => {
      let options = {method: 'POST', url: '/todo', payload: {name: 0}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "name" fails because ["name" must be a string]');
        done();
      });
    });

    it('return 400 HTTP status code when `name` haven\'t more than 30 chars', (done) => {
      let options = {method: 'POST', url: '/todo', payload: {name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "name" fails because ["name" length must be less than or equal to 30 characters long]');
        done();
      });
    });

    it('returns 201 HTTP status code when all data is correct', (done) => {
      let options = {method: 'POST', url: '/todo', payload: {name: 'Taskyet'}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 201);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('_id');
        expect(response.result).to.have.property('name', 'Taskyet');
        expect(response.result).to.have.property('checked', false);
        done();
      });
    });
  });

  describe('PUT /todo', () => {
    let todo;
    before((done) => {
      db.Todo.removeAsync({})
      .then(() => {
        let options = {
          method: 'POST',
          url: '/todo',
          payload: {
            name: 'TodoList'
          }
        };

        server.inject(options, (response) => {
          todo = response.result;
          done();
        });
      });
    });

    it('returns 400 HTTP status code when no `id` is send', (done) => {
      let options = {method: 'PUT', url: '/todo/', payload: {}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "id" fails because ["id" is required]');
        done();
      });
    });

    it('returns 400 HTTP status code  when `name` is empty', (done) => {
      let options = {method: 'PUT', url: '/todo/' + todo._id, payload: {name: ''}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "name" fails because ["name" is not allowed to be empty]');
        done();
      });
    });

    it('returns 400 HTTP status code  when `name` isn\'t a string', (done) => {
      let options = {method: 'PUT', url: '/todo/' + todo._id, payload: {name: 0}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "name" fails because ["name" must be a string]');
        done();
      });
    });

    it('return 400 HTTP status code when `name` haven\'t more than 30 chars', (done) => {
      let options = {method: 'PUT', url: '/todo/' + todo._id, payload: {name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "name" fails because ["name" length must be less than or equal to 30 characters long]');
        done();
      });
    });

    it('returns 200 HTTP status code when all data is correct', (done) => {
      let options = {method: 'PUT', url: '/todo/' + todo._id, payload: {name: 'Taskyet'}};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('_id');
        expect(response.result).to.have.property('name', 'Taskyet');
        expect(response.result).to.have.property('checked', false);
        done();
      });
    });
  });

  describe('DELETE /todo/{id}', () => {
    let todo;
    before((done) => {
      db.Todo.removeAsync({})
      .then(() => {
        let options = {
          method: 'POST',
          url: '/todo',
          payload: {
            name: 'TaskMore',
            checked: true
          }
        };

        server.inject(options, (response) => {
          todo = response.result;
          done();
        });
      });
    });

    it('returns 400 HTTP status code when no `id` is send', (done) => {
      let options = {method: 'DELETE', url: '/todo/'};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 400);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('statusCode', 400);
        expect(response.result).to.have.property('error', 'Bad Request');
        expect(response.result).to.have.property('message', 'child "id" fails because ["id" is required]');
        done();
      });
    });

    it('returns 200 HTTP status code when record is deleted', (done) => {
      let options = {method: 'DELETE', url: '/todo/' + todo._id};
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        expect(response).to.have.property('result');
        expect(response.result).to.be.empty;
        done();
      });
    });
  });
});
