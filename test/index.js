/*!
 * Config Handler.
 *
 * Test entry.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 27/03/2017 NZDT
 */

/**
 * Module dependencies.
 */

const { test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { join } = require('path');
const configHandler = require('../');

const fixture = (name) => join(__dirname, 'fixtures', name);
const full = fixture('full');
let env;

beforeEach(() => {
  env = process.env.NODE_ENV;
  delete process.env.NODE_ENV;
});

afterEach(() => {
  if (env === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = env;
});

test('merges package.json, the global file and the development file by default', () => {
  assert.deepEqual(configHandler({ cwd: full }), {
    name: 'full-project',
    version: '1.0.0',
    server: {
      port: 3333,
      db: {
        user: 'hello',
        pass: 'supersecr3t',
        uri: 'localhost'
      }
    }
  });
});

test('uses NODE_ENV to pick the environment file', () => {
  process.env.NODE_ENV = 'production';

  assert.equal(configHandler({ cwd: full }).server.port, 80);
});

test('the env option wins over NODE_ENV', () => {
  process.env.NODE_ENV = 'production';

  assert.equal(configHandler({ cwd: full, env: 'development' }).server.port, 3333);
});

test('an environment with no file falls back to the global file', () => {
  assert.equal(configHandler({ cwd: full, env: 'staging' }).server.port, 3000);
});

test('the global option names the global file', () => {
  const config = configHandler({ cwd: full, global: 'base', env: 'staging' });

  assert.equal(config.base, true);
  assert.equal(config.server, undefined);
});

test('the dir option names the config directory', () => {
  const config = configHandler({ cwd: full, dir: 'settings' });

  assert.equal(config.settings, true);
  assert.equal(config.server, undefined);
});

test('returns an empty object when there is nothing to load', () => {
  assert.deepEqual(configHandler({ cwd: fixture('empty') }), {});
});

test('throws on a syntax error in a config file', () => {
  assert.throws(() => configHandler({ cwd: fixture('broken') }), SyntaxError);
});

test('throws when a config file requires a module that is missing', () => {
  assert.throws(
    () => configHandler({ cwd: fixture('missing-dep') }),
    { code: 'MODULE_NOT_FOUND', message: /a-module-that-is-not-installed/ }
  );
});

test('logs to the given logger only when log is set', () => {
  const lines = [];
  const logger = { log: (line) => lines.push(line) };

  configHandler({ cwd: full, logger });
  assert.equal(lines.length, 0);

  configHandler({ cwd: full, logger, log: true, env: 'staging' });
  assert.equal(lines.length, 4);
  assert.match(lines[1], /Loaded Package JSON/);
  assert.match(lines[2], /Loaded Global Config/);
  assert.match(lines[3], /No Local Config/);
});

test('defaults cwd to the process working directory', () => {
  const cwd = process.cwd();

  process.chdir(full);
  try {
    assert.equal(configHandler().name, 'full-project');
  } finally {
    process.chdir(cwd);
  }
});
