**NOTE: This project is under active development. APIs subject to change.**

# `toga-sample`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

Walks a [Toga](http://togajs.github.io) abstract syntax tree, finds all samples, and compiles them into an iframed demo.

## Install

    $ npm install toga-sample

## Usage

```js
var toga = require('toga'),
    js = require('toga-js'),
    sample = require('toga-sample'),
    pura = require('toga-pura'),

    config = {
        src: './src/assets/**/*.js',
        dest: './web/docs'
    };

toga
    .src(config.src)
    .pipe(js.parser())
    .pipe(sample.formatter())
    .pipe(pura.compiler())
    .pipe(toga.dest(config.dest));
```

## Contribute

[![Tasks][waffle-img]][waffle-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

    $ npm test

----

© 2015 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/togajs/toga-sample/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/togajs/toga-sample
[downloads-img]: http://img.shields.io/npm/dm/toga-sample.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/togajs/toga
[npm-img]:       http://img.shields.io/npm/v/toga-sample.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/toga-sample
[travis-img]:    http://img.shields.io/travis/togajs/toga-sample.svg?style=flat-square
[travis-url]:    https://travis-ci.org/togajs/toga-sample
[waffle-img]:    http://img.shields.io/github/issues/togajs/toga-sample.svg?style=flat-square
[waffle-url]:    http://waffle.io/togajs/toga-sample
