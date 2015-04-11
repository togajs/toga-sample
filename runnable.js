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

            slice
                .call(el.querySelectorAll('.css'))
                .map(post.bind(null, win, 'css'))
                .join('');

            slice
                .call(el.querySelectorAll('.html'))
                .map(post.bind(null, win, 'html'))
                .join('');

            slice
                .call(el.querySelectorAll('.js'))
                .map(post.bind(null, win, 'js'))
                .join('');
        };

        vm.src = 'runnable.html';

        el.appendChild(vm);
    }

    function append(event) {
        var data = event.data;
        var type = data && data.type;
        var text = data && data.text;

        switch (type) {
            case 'css':
                return document.body
                    .insertAdjacentHTML('beforeend', '<style>' + text + '</style>');

            case 'html':
                return document.body
                    .insertAdjacentHTML('beforeend', text);

            case 'js':
                return eval(text); //jshint ignore: line
        }
    }

    window.addEventListener('message', append, false);

    slice
        .call(document.querySelectorAll('.runnable'))
        .forEach(build);
}());
