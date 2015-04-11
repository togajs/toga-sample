'use strict';

/**
 * # Toga Sample Formatter
 *
 * Walks a Toga abstract syntax tree, finds all samples, replaces the values
 * with runnable iframed samples.
 */

var through = require('through2'),
	mixin = require('mtil/object/mixin'),
	traverse = require('traverse'),

	/**
	 * Default options.
	 */
	defaults = {
		keys: ['sample']
	};

function runnable(value, options) {
	console.log(value, options);
}

exports.formatter = function (options) {
	options = mixin({}, defaults, options);

	var keys = options.keys;

	function format(value) {
		// jshint validthis:true
		if (keys.indexOf(this.key) === -1 || !value) {
			return;
		}

		this.update(runnable(value, options));
	}

	function walk(file, enc, cb) {
		var ast = file && file.ast;

		if (ast) {
			traverse(ast).forEach(format);
		}

		cb(null, file);
	}

	return through.obj(walk);
};
