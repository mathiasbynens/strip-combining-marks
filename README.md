# strip-combining-marks [![Build status](https://travis-ci.org/mathiasbynens/strip-combining-marks.svg?branch=master)](https://travis-ci.org/mathiasbynens/strip-combining-marks) [![Dependency status](https://gemnasium.com/mathiasbynens/strip-combining-marks.svg)](https://gemnasium.com/mathiasbynens/strip-combining-marks)

_strip-combining-marks_ removes Unicode combining marks from strings. It leaves unmatched combining marks (i.e. marks that appear at the start of the string, and don’t belong to a symbol) intact.

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install strip-combining-marks
```

Via [Bower](http://bower.io/):

```bash
bower install strip-combining-marks
```

Via [Component](https://github.com/component/component):

```bash
component install mathiasbynens/strip-combining-marks
```

In a browser:

```html
<script src="strip-combining-marks.js"></script>
```

In [Node.js](https://nodejs.org/), [io.js](https://iojs.org/), [Narwhal](http://narwhaljs.org/), and [RingoJS](http://ringojs.org/):

```js
var stripCombiningMarks = require('strip-combining-marks');
```

In [Rhino](http://www.mozilla.org/rhino/):

```js
load('strip-combining-marks.js');
```

Using an AMD loader like [RequireJS](http://requirejs.org/):

```js
require(
  {
    'paths': {
      'strip-combining-marks': 'path/to/strip-combining-marks'
    }
  },
  ['strip-combining-marks'],
  function(stripCombiningMarks) {
    console.log(stripCombiningMarks);
  }
);
```

## API

### `stripCombiningMarks.version`

A string representing the semantic version number.

### `stripCombiningMarks.reverse(string)`

This function takes a string and returns the stripped version of that string, where any combining marks that were applied to other symbols have been removed.

#### Usage example

```js
stripCombiningMarks('Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞');
'ZALGO!'
```

## Support

strip-combining-marks has been tested in Chrome 27, Firefox 3, Safari 4, Opera 10, IE 6, Node.js v0.10.0, io.js v1.0.0, Narwhal 0.3.2, RingoJS 0.8, PhantomJS 1.9.1, and Rhino 1.7RC4.

## Unit tests & code coverage

After cloning this repository, run `npm install` to install the dependencies needed for strip-combining-marks development and testing. You may want to install Istanbul _globally_ using `npm install istanbul -g`.

Once that’s done, you can run the unit tests in Node using `npm test` or `node tests/tests.js`. To run the tests in Rhino, Ringo, Narwhal, and web browsers as well, use `grunt test`.

To generate the code coverage report, use `grunt cover`.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

strip-combining-marks is available under the [MIT](https://mths.be/mit) license.
