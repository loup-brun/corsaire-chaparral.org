/*global window, document, qwery, bean, classie, head, Velocity, Swipe*/
(function(win, doc) {

  // `window.headLoader` replaces `head` because of some conflicts sometimes
  win.headLoader.ready(doc, function() {

    // include qwery as a selector engine
    bean.setSelectorEngine(qwery);

    // Home slider
    if (document.getElementById('landing-slider')) {

      (function sliderBusiness() {
        // begin slider business

        // variable definitions
        var sliderElem = doc.getElementById('landing-slider'),
            prevElem = doc.getElementById('landing-slider-btn-controls-left'),
            nextElem = doc.getElementById('landing-slider-btn-controls-right'),
            //slides = sliderElem.getElementsByTagName('div')[0].children,
            bulletsSliderElem = doc.getElementById('landing-slider-bullets'),

            landingSlider = new Swipe(sliderElem, {
              speed: 650,
              auto: 4000,
              callback: function(index, elem) {
                updateSliderBullets(index, bulletsSliderElem);
              }
            });

        // Add bullets at the bottom of the slider
        addSliderBullets(landingSlider, bulletsSliderElem);

        // Initially highlight bullet 0 (since the slider starts at 0)
        updateSliderBullets(0, bulletsSliderElem);

        // Bind events on next/prev buttons
        bean.on(prevElem, 'click', function(e) {
          landingSlider.prev();
          e.preventDefault();
        });
        bean.on(nextElem, 'click', function(e) {
          landingSlider.next();
          e.preventDefault();
        });

        // Bind keyboard events for slider
        makeSliderKeyInteractive(landingSlider);

        /**
         * @param slider {Object} [Swipe]
         * @param bullets {DOM Object}
         */
        function addSliderBullets(slider, bullets) {
          var length = slider.getNumSlides(), i;

          for (i = 0; i < length; i++) {
            bindEach(i);	
          }

          // private function for individual binding
          function bindEach(index) {
            var li = doc.createElement('li'),
                a = doc.createElement('a');

            // Bind click events on bullets
            bean.on(a, 'click', function() {
              slider.slide(index); // got to the nth-slide
            });

            li.appendChild(a);

            bullets.appendChild(li);
          }
        }

        function updateSliderBullets(slideIndex, bullets) {
          var children = qwery('li a', bullets), i;

          for (i = 0; i < children.length; i++) {
            removeActive(i);
          }

          // Temporary fix if there are only two slides
          // This strange error happens after resizing the
          // window. The slide index then continues beyond
          // the actual number of slides, then comes back to 0.
          if (slideIndex >= children.length) {
            slideIndex = slideIndex - 2;
          }

          // add active class on nth-bullet
          var current = children[slideIndex];
          classie.add(current, 'active');

          // private function for individual class removal
          function removeActive(n) {
            var a = children[n];

            classie.remove(a, 'active');
          }
        }

        // keyboard interaction, event binding
        function makeSliderKeyInteractive(slider) {
          bean.on(document, 'keydown', function (e) {
            if (e !== undefined) { // IE7 not handling event
              switch (parseInt(e.which, 10)) {
                case 37: // left arrow
                  slider.prev();
                  break;
                case 39: // right arrow
                  slider.next();
                  break;
              }
            }
          });
        }
      })();
    }

    // Toggle nav
    var toggleElem = document.getElementById('toggle-sidebar'),
        sidebar = qwery('#navbar-side')[0],
        body  = qwery('body')[0];

    bean.on(toggleElem, 'click', toggleSidebar);

    function toggleSidebar() {
      
//      var windowWidth = window.innerWidth;

//      if (classie.has(sidebar, 'toggled')) {
//        Velocity(sidebar, { translateX: [-380, 0] }, { duration: 400, easing: 'easeInCubic', display: 'none' });
//      } else {
//        Velocity(sidebar, { translateX: [0, -380] }, { duration: 800, easing: 'easeOutExpo', display: 'block' });
//      }
//
      classie.toggleClass(body, 'in-modal');
      classie.toggleClass(sidebar, 'toggled');
    }

    // Prevent default on touch screens for dropdowns

    var navbar = qwery('.navbar-main')[0],
        dropdowns = qwery('.dropdown', navbar),
        nestedDropdowns = qwery('.dropdown .dropdown', navbar);

    function catchDropdown(ddown) {

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
        
        // ensure there are no overlays
        
        var existingOverlays = qwery('.invisible-overlay'), d, o;
        
        for (o in existingOverlays) {
          body.removeChild(existingOverlays[o]);
        }
        
        for (d in dropdowns) {
          classie.remove(dropdowns[d], 'open');
        }
      }
    }

    //if (head.touch()) {
    for (var k in dropdowns) {
      catchDropdown(dropdowns[k]);
    }
    //}

    // Banner announcements
    var announcementBanner = document.getElementById('fixed-banner');

    if (announcementBanner) {
      var closeBannerBtn = announcementBanner.querySelector('.banner__close');
      bean.on(closeBannerBtn, 'click', function (ev) {
        classie.add(announcementBanner, 'none');

        if (win.localStorage) {
          win.localStorage.setItem('hideBanniereAlerte20190308', true);
        }
      });

      // Run on page load - has the user seen the banner?
      if (win.localStorage) {
        if (win.localStorage.getItem('hideBanniereAlerte20190308')) {
          classie.add(announcementBanner, 'none');
        } else {
          classie.remove(announcementBanner, 'none');
        }
      }
    }

  });
})(window, document);
