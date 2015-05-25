'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.formatter = formatter;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * # Toga Sample
 *
 * Walks a Toga abstract syntax tree, finds all samples, and replaces the values
 * with runnable iframed samples.
 *
 * @title Toga Sample
 * @name toga-sample
 */

var _trifle = require('trifle');

var _trifle2 = _interopRequireDefault(_trifle);

var _mtilObjectMixin = require('mtil/object/mixin');

var _mtilObjectMixin2 = _interopRequireDefault(_mtilObjectMixin);

var formatterDefaults = {
	name: 'toga-sample'
};

function formatter(options) {
	options = _mtilObjectMixin2['default']({}, formatterDefaults, options);

	options.formatters = [{
		key: 'sample',
		format: function format(value, key) {
			console.log(key, value);
		}
	}];

	return new _trifle2['default'](options);
}