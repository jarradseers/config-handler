# Config Handler

[![CI](https://github.com/jarradseers/config-handler/actions/workflows/ci.yml/badge.svg)](https://github.com/jarradseers/config-handler/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/config-handler.svg)](https://www.npmjs.com/package/config-handler)

Load your configuration in a hierarchy. Three sources are read, in order, and deeply merged so that later files override single values rather than whole blocks:

1. `package.json` in the working directory (all of it; mainly useful for `name` and `version`).
2. The global config file, `config/all`.
3. The environment config file, `config/<NODE_ENV>`, defaulting to `config/development`.

Any of the three may be missing. Nothing is written; the files are only read.

## Installation

```bash
$ npm install config-handler
```

## Usage

```js
const config = require('config-handler')();

console.log(config); // { name: 'my-project', version: '1.0.0', server: { ... } }
```

Given these files:

```js
// package.json
{
  "name": "my-project",
  "version": "1.0.0"
}
```

```js
// config/all.js
module.exports = {
  server: {
    port: 3000,
    db: {
      user: 'name',
      pass: 'secr3t'
    }
  }
};
```

```js
// config/development.js, used when NODE_ENV is development or not set
module.exports = {
  server: {
    port: 3333,
    db: {
      pass: 'supersecr3t'
    }
  }
};
```

the resulting config object is:

```js
{
  name: 'my-project',
  version: '1.0.0',
  server: {
    port: 3333,
    db: {
      user: 'name',
      pass: 'supersecr3t'
    }
  }
}
```

Config files can be `.js`, `.json` or `.node`; they are loaded with `require`. Merging is done by [object-merger](https://github.com/jarradseers/object-merger), so arrays are concatenated rather than replaced.

There is a runnable example in the [example folder](example).

## Options

Options are passed as an object:

```js
const config = require('config-handler')({ env: 'staging', log: true });
```

| Option | Type | Default | Description |
|---|---|---|---|
| `cwd` | string | `process.cwd()` | Directory holding `package.json` and the config directory. |
| `dir` | string | `config` | Name of the config directory, relative to `cwd`. |
| `global` | string | `all` | Name of the global config file. |
| `env` | string | `NODE_ENV`, then `development` | Name of the environment config file. |
| `log` | boolean | `false` | Log which files were loaded. |
| `logger` | object | `console` | Object with a `log` method, used when `log` is set. |

## Errors

A missing file is skipped. A file that exists but fails to load throws, including a syntax error or a `require` of a module that is not installed. Before 2.0.4 the latter was silently treated as a missing file.

## Tests

```bash
$ npm install
$ npm test
```

## License

[MIT](LICENSE)
