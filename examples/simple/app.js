/*!
 * Configurator.
 *
 * Simple example app file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

'use strict';

/**
 * Module dependencies.
 */

const configurator = require('../../');

const config = configurator({
  log: true
});

console.log(' = Final output:\n', JSON.stringify(config, null, 2));
