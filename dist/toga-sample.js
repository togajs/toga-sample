/**
 * # Toga Sample
 *
 * Walks a Toga abstract syntax tree, finds all samples, and replaces the values
 * with runnable iframed samples.
 *
 * @title Toga Sample
 * @name toga-sample
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.formatter = formatter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _trifle = require('trifle');

var _trifle2 = _interopRequireDefault(_trifle);

var _toga = require('toga');

var formatterDefaults = {
	name: 'toga-sample'
};

function formatter(options) {
	options = _extends({}, formatterDefaults, options);

	var formatterStream;var assetStream;var name = options.name;

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

	formatterStream = new _trifle2['default'](options).add(formatSample);

	assetStream = (0, _toga.src)('./assets/**', { cwd: __dirname, base: __dirname }).pipe((0, _toga.map)(toAsset));

	return formatterStream.pipe((0, _toga.add)(assetStream));
}
