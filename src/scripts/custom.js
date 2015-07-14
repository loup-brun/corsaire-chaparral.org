/*global window, document, qwery, bean, classie, head, Velocity*/
(function(win, doc) {

  head.ready(doc, function() {

    // include qwery as a selector engine
    bean.setSelectorEngine(qwery);

    // Toggle nav
    var toggles = qwery('.toggle-sidebar'),
        sidebar = qwery('#navbar-side')[0],
        body  = qwery('body')[0];

    function toggleSidebar() {

      if (classie.has(sidebar, 'toggled')) {
        Velocity(sidebar, { translateX: [260, 0] }, { duration: 400, easing: 'easeInCubic', display: 'none' });
      } else {
        Velocity(sidebar, { translateX: [0, 260] }, { duration: 800, easing: 'easeOutExpo', display: 'block' });
      }

      classie.toggleClass(body, 'in-modal');
      classie.toggleClass(sidebar, 'toggled');
    }

    for (var i in toggles) {
      bean.on(toggles[i], 'click touchstart', toggleSidebar);
    }

    // Prevent default on touch screens for dropdowns

    var navbar = qwery('.navbar-main')[0],
        dropdowns = qwery('.dropdown', navbar),
        nestedDropdowns = qwery('.dropdown .dropdown', navbar);

    function catchDropdown(ddown) {

      function isNestedDropdown(ddown) {
        var ret = false;

        for (var j in nestedDropdowns) {
          if (ddown === nestedDropdowns[j]) {
            ret = true;
          }
        }

        return ret;
      }

      function clearAllDropdowns() {
        for (var i in dropdowns) {
          classie.remove(dropdowns[i], 'open');
        }
      }

      var a = qwery('a', ddown)[0];

      bean.on(a, 'click touchstart', function(e) {

        var overlay = doc.createElement('div');
        body.appendChild(overlay);
        classie.add(overlay, 'invisible-overlay');
        bean.on(overlay, 'click touchstart', function() {
          clearAllDropdowns();
          bean.off(overlay);
          body.removeChild(overlay);
        });

        if (!classie.hasClass(ddown, 'open')) {
          e.preventDefault();
          for (var i in dropdowns) {

            // Don't cancel parent dropdowns
            if (isNestedDropdown(ddown)) {
              var parent = ddown.parentElement;

              // Reach the parent dropdown
              while (!classie.has(parent, 'dropdown')) {
                parent = parent.parentElement;
              }

              // If this is not a parent of a child dropdown,
              // close the dropdown
              if ( dropdowns[i] !== parent) {
                classie.remove(dropdowns[i], 'open');
              }
            } else {
              classie.remove(dropdowns[i], 'open');
            }
          }
          // Ensure the class is added after closing all other dropdowns
          win.setTimeout(function() {
            classie.add(ddown, 'open');
          }, 100);
        }

      });
    }

    //if (head.touch()) {
    for (var k in dropdowns) {
      catchDropdown(dropdowns[k]);
    }
    //}

  });
})(window, document);
