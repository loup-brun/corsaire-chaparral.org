/*global window, document, qwery, bean, classie, head, TweenLite*/
(function(win, doc) {

  head.ready(document, function() {

    // include qwery as a selector engine
    bean.setSelectorEngine(qwery);

    // Toggle nav
    var toggles = qwery('.toggle-sidebar'),
        sidebar = qwery('#navbar-side')[0],
        body  = qwery('body')[0];

    function toggleNav(navElem) {

      if (classie.has(navElem, 'toggled')) {
        TweenLite.fromTo(navElem, 0.2, {x: 0, display: 'block'}, {x: 260, display: 'none'});
      } else {
        TweenLite.fromTo(navElem, 0.3, {x: 260, display: 'block'}, {x: 0, display: 'block'});
      }
      
      classie.toggleClass(body, 'in-modal');
      classie.toggleClass(navElem, 'toggled');
    }

    for (var i in toggles) {
      bean.on(toggles[i], 'click', function(event) {
        toggleNav(sidebar);
      });
    }

  });
})(window, document);
