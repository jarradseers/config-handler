/*!
 * Config Handler.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

/**
 * Module dependencies.
 */

const { join } = require('path');
const merge = require('object-merger');
const pkg = require(join(__dirname, '..', 'package.json'));

/**
 * Config Handler main function.
 *
 * @param {object} options
 */

class ConfigHandler {

  constructor(opts) {
    this.cwd = opts.cwd || process.cwd();
    this.log = opts.log;
    this.dir = join(this.cwd, opts.dir || 'config');
    this.files = [];
    this.logger = opts.logger || console;

    this.log && this.logger.log(`Started ${pkg.name} v${pkg.version} in ${this.cwd}.`);

    this.load('Package JSON', this.cwd, 'package.json');
    this.load('Global Config', this.dir, opts.global || 'all');
    this.load('Local Config', this.dir, opts.env || process.env.NODE_ENV || 'development');

    return merge(...this.files);
  }

  /**
   * Load config files.
   *
   * @param {any} file
   * @param {any} dir
   * @param {any} name
   *
   * @memberOf ConfigHandler
   */

  load(file, dir, name) {
    try {
      this.files.push(require(join(dir, name)));
      this.log && this.logger.log(` + Loaded ${file} file in ${dir}`);
    } catch (err) {
      if (err.code !== 'MODULE_NOT_FOUND') throw err;
      this.log && this.logger.log(` x No ${file} file found in ${dir}`);
    }
  }

}

/**
 * Module exports.
 */

module.exports = (...args) => new ConfigHandler(...args);
