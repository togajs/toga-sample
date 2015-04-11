'use strict';

var samp = require('../index'),
	expect = require('expect.js');

describe('toga-sample spec', function () {
	describe('formatter', function () {
		it('should return a transform stream', function () {
			var retval = samp.formatter();

			expect(retval.pipe).to.be.a(Function);
			expect(retval.readable).to.be(true);
			expect(retval.writable).to.be(true);
		});
	});
});
