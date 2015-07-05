/*eslint-env browser */
(function () {
	var slice = Array.prototype.slice;

	function post(win, type, el) {
		var data = {
			type: type,
			text: el.innerText
		};

		win.postMessage(data, '*');
	}

	function build(el) {
		var vm = document.createElement('iframe');

		vm.onload = function () {
			var win = vm.contentWindow;

			['css', 'html', 'js'].forEach(function (type) {
				slice
					.call(el.querySelectorAll('.' + type))
					.map(post.bind(null, win, type))
					.join('');
			});
		};

		vm.src = 'sample.html';

		el.appendChild(vm);
	}

	slice
		.call(document.querySelectorAll('.toga-sample'))
		.forEach(build);
})();
