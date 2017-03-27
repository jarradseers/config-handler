# Object Merger

  Merge Objects properly instead of overwriting them.  Essentially a deep `Object.assign`. It's very simple, written in ES6+ and handles a basic deep copy of objects.

  This was written out of frustrations with `Object.assign` and the heavier weight of some alternative packages trying to support everything.

## Usage

```js
const merge = require('object-merger');
const obj4 = merge(obj1, obj2, obj3); // returns a new object, doesn't modify existing.
```

Optionally you could add a static to the `Object`

```js
Object.merge = require('object-merger');
const obj4 = Object.merge(obj1, obj2, obj3); // returns a new object, doesn't modify existing.
```

Check out the [test folder](test) for more!

## Installation

```bash
$ npm install object-merger
```

## Features

  * Merge multiple objects instead of overwrite them.
  * Simple, fast, light-weight with no external dependencies
  * Written in ES6+ for node.js 6+
  * Test driven

## Options

  As many objects as you'd like to merge from left to right.

## Tests

  From the package 

  ```bash
  $ npm test
  ```

## License

  [MIT](LICENSE)
