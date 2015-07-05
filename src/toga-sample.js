/**
 * # Toga Sample
 *
 * Walks a Toga abstract syntax tree, finds all samples, and replaces the values
 * with runnable iframed samples.
 *
 * @title Toga Sample
 * @name toga-sample
 */

import Trifle from 'trifle';
import { add, map, src } from 'toga';

var formatterDefaults = {
	name: 'toga-sample'
};

export function formatter(options) {
	options = {
		...formatterDefaults,
		...options
	};

	var formatterStream, assetStream,
		{ name } = options;

	function formatSample(node, value) {
		if (!value || value.tag !== 'sample') {
			return;
		}

		var tagList = node.parent,
			comment = tagList.parent;

		console.log('\n----\n\n', comment.node);
	}

	function toAsset(file, cb) {
		file.isAsset = true;
		file.fromPlugin = name;
		cb(null, file);
	}

	formatterStream = new Trifle(options)
		.add(formatSample);

	assetStream = src('./assets/**', { cwd: __dirname, base: __dirname })
		.pipe(map(toAsset));

	return formatterStream
		.pipe(add(assetStream));
}
