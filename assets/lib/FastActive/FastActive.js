(function (d, w, activeClass) {
    w.hasTouch = (('ontouchstart' in w) || w.DocumentTouch && d instanceof DocumentTouch);
    if (!w.hasTouch) {
        d.documentElement.className += ' no-touch';
    } else {
        var activeElement = null,
            clearActive = function() {
                if (activeElement) {
                    activeElement.classList.remove(activeClass);
                    activeElement = null;
                }
            },
            setActive = function(e) {
                clearActive();
                if (e.target.tagName == 'A') {
                    activeElement = e.target;
                    activeElement.classList.add(activeClass);
                }
            };
        d.documentElement.classList.add('touch');
        d.documentElement.classList.remove('no-touch');
        d.body.addEventListener('touchstart', setActive, false);
        d.body.addEventListener('touchmove', clearActive, false);
    }
})(document, window, 'active');
