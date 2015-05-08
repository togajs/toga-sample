/**
 * # Toga Sample Formatter
 *
 * Walks a Toga abstract syntax tree, finds all samples, replaces the values
 * with runnable iframed samples.
 */

import through from 'through2';
import mixin from 'mtil/object/mixin';
import traverse from 'traverse';

var formatterDefaults = {
	tags: ['sample']
};

export function formatter(options) {
	options = mixin({}, formatterDefaults, options);

	var tags = options.tags;

	function runnable(value) {
		console.log(value, options);
	}

	function format(value) {
		// jshint validthis:true
		if (tags.indexOf(this.key) === -1 || !value) {
			return;
		}

		this.update(runnable(value));
	}

	return through.obj(
		function (file, enc, cb) {
			var ast = file && file.ast;

			if (ast) {
				traverse(ast).forEach(format);
			}

			cb(null, file);
		},
		function (cb) {
			console.log('flush sample');

			cb();
		}
	);
}
