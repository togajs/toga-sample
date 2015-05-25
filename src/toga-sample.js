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
	name: 'toga-sample',
	assets: './assets'
};

export function formatter(options) {
	options = {
		...formatterDefaults,
		...options
	};

	var formatterStream, assetStream,
		{ assets, name } = options;

	function formatSample(node, value) {
		if (value && value.tag === 'sample') {
			console.log(node.key, value);
		}
	}

	function toAsset(file) {
		file.isAsset = true;
		file.fromPlugin = name;

		return file;
	}

	formatterStream = new Trifle(options)
		.add(formatSample);

	assetStream = src(assets)
		.pipe(map(toAsset));

	return formatterStream
		.pipe(add(assetStream));
}
