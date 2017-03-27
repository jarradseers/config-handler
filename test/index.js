/*!
 * Config Handler.
 *
 * Main test file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

'use strict';

/**
 * Module dependencies.
 */

const assert = require('assert');
const join = require('path').join;

let total = 0;

const config = require('../')({
  cwd: join(__dirname, '..', 'example', 'simple'),
  log: true
});

const expected = require('./expected');
assert.deepStrictEqual(expected, config) || total ++;

console.log(`All ${total} of ${total} tests passed.`);
