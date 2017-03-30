/*!
 * Config Handler.
 *
 * Simple example app file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

/**
 * Module dependencies.
 */

const config = require('../../')({ log: true });

console.log(' = Final output:\n', JSON.stringify(config, null, '  '));
