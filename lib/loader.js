'use strict';

// load deps
let fs = require('fs');
let path = require('path');

module.exports = (dir) => {
  let rootPath = path.join(__dirname, '/../', dir);
  let ret = [];
  fs.readdirSync(rootPath).forEach((file) => {
    if (!fs.statSync(rootPath + '/' + file).isFile() || !isLoadable(file) || file === 'index.js') {
      return;
    }

    ret.push({
      File: require(path.join(rootPath, file)),
      name: camelize(path.basename(file, '.js'))
    });
  });

  return ret;
};

/**
 *
 * Check if the file in target is loadable
 *
 */
function isLoadable (name) {
  return /\.(js|coffee|lf)$/.test(name);
}

/**
 *
 * Camelize strings
 *
 */
function camelize (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return '';
    return index !== 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
