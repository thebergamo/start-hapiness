/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
/* global systems, sync, persistent */

systems({
  'start-hapiness': {
    // Dependent systems
    depends: ['mongodb'],
    // More images:  http://images.azk.io
    image: {'docker': 'azukiapp/node:4.2'},
    // Steps to execute before running instances
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: 'npm start',
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync('.', { shell: true }),
      '/azk/#{manifest.dir}/node_modules': persistent('./node_modules')
    },
    scalable: {'default': 1},
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      // exports global variables
      http: '8000/tcp'
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      NODE_ENV: 'dev',
      SERVER_PORT: '8000',
      SERVER_HOST: '0.0.0.0'
    }
  },
  'mongodb': {
    image: { docker: 'azukiapp/mongodb' },
    scalable: false,
    wait: { 'retry': 20, 'timeout': 1000 },
    mounts: {
      '/data/db': persistent('mongodb-#{manifest.dir}')
    },
    ports: {
      http: '28017/tcp'
    },
    http: {
      domains: [ '#{manifest.dir}-#{system.name}.#{azk.default_domain}' ]
    },
    export_envs: {
      DB_URI: 'mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}',
      DB_TEST_URI: 'mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_test'
    }
  }
});
