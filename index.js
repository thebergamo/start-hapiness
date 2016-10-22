'use strict';

// load deps
let server = require('./src/core/bootstrap');

server.start((err) => {
  if (err) { throw err; }

  console.log('info', 'Server Running At: ' + server.info.uri);
});
