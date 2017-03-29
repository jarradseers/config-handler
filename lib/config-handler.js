/*!
 * Config Handler.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

'use strict';

/**
 * Module dependencies.
 */

const join = require('path').join;
const merge = require('object-merger');

/**
 * Config Handler main function.
 * 
 * @param {object} options 
 */

function configHandler(options) {
  options = options || {};

  const pkg = require(join(__dirname, '..', 'package.json'));
  const cwd = options.cwd || process.cwd();
  const dir = join(cwd, options.dir || 'config');
  const log = options.log;
  const logger = options.logger || console;
  const files = [];
  const notfound = 'MODULE_NOT_FOUND';

  log && logger.info(`Started ${pkg.name} v${pkg.version} in ${cwd}.`);

  // Try load the package.json.
  try {
    files.package = require(join(cwd, 'package.json'));
    log && logger.log(` + Loaded package.json in ${cwd}`);
  } catch (err) {
    if (err.code !== notfound) throw err;
    log && logger.log(` x No package.json found in ${cwd}`);
  }

  // Try load the global config.
  try {
    files.global = require(join(dir, options.global || 'all'));
    log && logger.log(` + Loaded global config file in ${dir}`);
  } catch (err) {
    if (err.code !== notfound) throw err;
    log && logger.log(` x No global config file found in ${dir}`);
  }

  // Try load the local environment config.
  try {
    files.local = require(join(dir, options.env || process.env.NODE_ENV || 'development'));
    log && logger.log(` + Loaded local config file in ${dir}`);
  } catch (err) {
    if (err.code !== notfound) throw err;
    log && logger.log(` x No local config file found in ${dir}`);
  }

  return merge(files.package, files.global, files.local);

  log && logger.info(` + Configuration loaded.`);
};

/**
 * Module exports.
 */

module.exports = configHandler;
