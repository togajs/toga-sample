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

var formatterDefaults = {
};

function yank(arr, test) {
	var item,
		i = arr.length,
		yanked = [];

	while (i--) {
		item = arr[i];

		if (test(item)) {
			yanked.unshift(item);
			arr.splice(i, 1);
		}
	}

	return yanked;
}

function isSample(item) {
	return item.tag === 'sample';
}

export function formatter(options) {
	options = {
		...formatterDefaults,
		...options
	};

	var stream = new Trifle();

	function parseSamples(commentBlock) {
		var tags = commentBlock.tags;

		commentBlock.samples = yank(tags, isSample);

		console.log(commentBlock);

		return commentBlock;
	}

	function updateCommentBlocks(node, value) {
		if (value && value.type === 'CommentBlock') {
			node.update(parseSamples(value));
		}
	}

	return stream
		.add(updateCommentBlocks);
}
