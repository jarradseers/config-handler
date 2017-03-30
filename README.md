# Config Handler

  Load your configuration in hierarchy. If exists the following occurs:

  `package.json` is read (mainly useful for `name` and `version`).
  `global config` file is read, and deeply merged with the existing object.
  `environment config` file is finally read, deeply merging with the existing object.

  Config-Handler doesn't modify any existing files, simply reads the configuration, deep merge occurs so entire blocks aren't erased.

## Usage

```js
const config = require('config-handler')();
console.log(config) // { name: 'hi', verion: '1.0.0' } ...
```

Here is an example of how the config object is handled:

```js
// package.json
{
  name: 'my-project',
  version: '1.0.0'
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
}
```

```js
// assume either NODE_ENV=development or not set
// config/development.js
module.exports = {
  server: {
    port: 3333,
    db: {
      pass: 'supersecr3t'
    }
  }
}
```

Resulting config object:

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

Check out the [test folder](test) and [example folder](example) for more!

## Installation

```bash
$ npm install config-handler
```

## Features

  * Deeply merge multiple configuration files in hierarchy.
  * Includes package.json if exists.
  * Loads global configuration file.
  * Loads local environment configuration file.
  * Catches errors in config files.
  * Configurable.
  * Supports `.js`, `.json`, `.node` extensions.
  * Simple, fast and light-weight.
  * Written in ES6+ for node.js 6+

## Options

  The options are passed in as an object to the config:

  ```js
  const config = require('config')({ /* options */ });
  ```

  * `dir` - {string} - Name of the config dir, defaults to `config`.
  * `log` - {boolean} - Whether or not to output logging, defaults to `false`.
  * `cwd` - {string} - Current working directory location, defaults to `process.cwd()`
  * `env` - {string} - environment name for local config file, defaults to `NODE_ENV` or `development`.
  * `global` - {string} - name of the global config file to load, defaults to `all`.
  * `logger` - {function | object} - logger to use, defaults to `console`.

## Tests

  From the package 

  ```bash
  $ npm test
  ```

## License

  [MIT](LICENSE)
