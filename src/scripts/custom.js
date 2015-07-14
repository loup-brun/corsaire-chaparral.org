/*global window, document, qwery, bean, classie, head, Velocity*/
(function(win, doc) {

  head.ready(document, function() {

    // small utility to detect touch support
    function isTouch() {
      return 'ontouchstart' in win  ||
        'onmsgesturechange' in win;
    }

    // include qwery as a selector engine
    bean.setSelectorEngine(qwery);

    // Toggle nav
    var toggles = qwery('.toggle-sidebar'),
        sidebar = qwery('#navbar-side')[0],
        body  = qwery('body')[0];

    function toggleNav(handle, navElem) {

      bean.on(handle, 'click', function(event) {

        if (classie.has(navElem, 'toggled')) {
          Velocity(navElem, { translateX: [260, 0] }, { duration: 400, easing: 'easeInCubic', display: 'none' });
        } else {
          Velocity(navElem, { translateX: [0, 260] }, { duration: 800, easing: 'easeOutExpo', display: 'block' });
        }

        classie.toggleClass(body, 'in-modal');
        classie.toggleClass(navElem, 'toggled');
      });
    }

    for (var i in toggles) {
      toggleNav(toggles[i], sidebar);
    }

    // Prevent default on touch screens for dropdowns

    var dropdowns = qwery('.dropdown');

    function catchDropdown(ddown) {
      var counter = 0;

      var a = qwery('a', ddown)[0];

      bean.on(a, 'click', function(e) {
        for (var i in dropdowns) {
          classie.remove(dropdowns[i], 'open');
        }
        
        if (!counter % 2) {
          e.preventDefault();
          classie.add(ddown, 'open');
        }

        counter ++;
      });
    }

    if (isTouch()) {
      for (var k in dropdowns) {
        catchDropdown(dropdowns[k]);
      }
    }

  });
})(window, document);
