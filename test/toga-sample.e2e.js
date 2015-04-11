'use strict';

var samp = require('../index'),
	es = require('event-stream'),
	expect = require('expect.js'),
	toga = require('toga'),

	config = {
		src:  __dirname + '/fixtures/**/*.json',
		dest: __dirname + '/actual'
	};

describe('toga-sample e2e', function () {
	var count;

	function toAst(file, cb) {
		count++;

		file.ast = JSON.parse(file.contents.toString());
		cb(null, file);
	}

	function toEqualExpected(file, cb) {
		count++;

		var expected = file.path.replace('fixtures', 'expected');
		expect(JSON.stringify(file.ast)).to.be(JSON.stringify(require(expected)));
		cb(null, file);
	}

	function toEqualUndefined(file, cb) {
		count++;

		expect(file.ast).to.be(undefined);
		cb(null, file);
	}

	beforeEach(function () {
		count = 0;
	});

	it('should parse files with an ast', function (done) {
		toga
			.src(config.src)
			.pipe(es.map(toAst))
			.pipe(samp.formatter())
			.pipe(es.map(toEqualExpected))
			.pipe(toga.dest(config.dest))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(4);
				done();
			});
	});

	it('should not parse files without an ast', function (done) {
		var files = [
			{ path: 'foo.js' },
			{ path: 'foo.js', content: null }
		];

		es
			.readArray(files)
			.pipe(samp.formatter())
			.pipe(es.map(toEqualUndefined))
			.on('error', done)
			.on('end', function () {
				expect(count).to.be(2);
				done();
			});
	});
});
