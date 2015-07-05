/*eslint-env mocha */

var formatter = require('../src/toga-sample').formatter,
	expect = require('expect');

describe('toga-sample spec', function () {
	describe('formatter', function () {
		it('should return a transform stream', function () {
			var retval = formatter();

			expect(retval.pipe).toBeA(Function);
			expect(retval.readable).toBe(true);
			expect(retval.writable).toBe(true);
		});
	});
});
