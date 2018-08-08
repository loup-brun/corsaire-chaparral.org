/*global window, document, qwery, bean, classie, Packery, Blazy, nanoajax, Handlebars, imagesLoaded*/
(function(win, doc) {

  var container = qwery('.container-blocks')[0];

  // moved lightbox to lightbox.js

  /**
	 * Lightbox constructor
	 * Requires qwery, bean, Handlebars + the compiled template, classie, imagesLoaded
	 */
  (function() {

    var Lightbox = function(data) {

      var body = doc.getElementsByTagName('body')[0];

      // Private methods
      function centerY(elem) {

        var parentRect	= elem.parentNode.getBoundingClientRect(),
            parentH		= parentRect.bottom - parentRect.top,
            imgH		= elem.offsetHeight,
            offset		= (parentH - imgH) / 2;

        elem.style.marginTop = offset + "px";
      }

      // Fetch Handlebars template and render it into the element
      function insertContent(element, data, callback) {
        callback = callback || function() {};

        data = data || {}; // assign data to empty object if null

        // Grab the Handlebars PRECOMPILED template
        var template = Handlebars.templates.lightbox,
            rendered = template(data);

        element.innerHTML = rendered;

        // Wrap final callback in setTimeout to ensure
        // the previous step is finished
        win.setTimeout(function() {
          callback();
        });
      }

      function close() {
        var elem = qwery('.layer-lightbox')[0];
        classie.remove(elem, 'open');

        win.setTimeout(function() {
          // Remove events
          bean.off(elem.children);
          //bean.off(this.elements.dim);

          // Remove the element from the dom
          body.removeChild(elem);
        }, 300); // leave delay for fadeOut
      }

      function init() {

        // Before start, destroy any other lightbox
        var lightboxes = qwery('.layer-lightbox'), i;

        if (lightboxes) {
          for (i = 0; i < lightboxes.length; i++) {
            doc.removeChild(lightboxes[i]);
          }
        }

        // Our lightbox master element
        var masterElement  = doc.createElement('div');

        // Append the master element to the body
        body.appendChild(masterElement);

        // Add the class to the master element
        masterElement.className = 'layer-lightbox';

        // Insert the content into the lightbox
        insertContent(masterElement, data, function() {

          // Attached events on Lightbox elements
          var closeElem = qwery('.close-lightbox', masterElement)[0],
              dimElem = qwery('.dim-lightbox', masterElement)[0],
              //loader = qwery('.loader', masterElement)[0],
              imgElem = qwery('img', masterElement)[0];


          // On click, close the lightbox
          bean.on(closeElem, 'click', function() {
            close();
          });

          // Do the same thing on dim
          bean.clone(dimElem, closeElem);

          // We are ready, open the lightbox
          classie.add(masterElement, 'open');

          // Listen to image loading on lightbox img
          var imgLoad = imagesLoaded( imgElem );
          // Only when the image is loaded center the image
          imgLoad.on('always', function() {
            centerY(imgElem);
            // do this async for transition fade in
            classie.add(imgElem, 'ready');

            // Firefox bug
            // trigger layout jsut in case
            win.setTimeout(function() {
              imgElem.style.width = '1px';
              imgElem.style.width = 'auto';
            },30);

          });
        });
      }

      // Public API
      return {
        init: init,
        destroy: close
      };

    };

    // Assign Lightbox to the global window object
    win.Lightbox = Lightbox;

  })();


  // ajax content
  // 
  // Retrieve photos with the Lychee API
  // NOTE: the `description` property has been added to
  // the lychee `getAlbum` function.
  // `getAlbum` returns an object with a collection of photos
  // as its `content` property. We can now grab each photo's
  // title, description, url and tags just by calling the
  // `getAlbum` function (and not retrieve each photo individually...)

  var mainAlbum,
      photos = [],
      blockTemplate = Handlebars.templates.block;

  nanoajax.ajax({
    url: 'http://corsaire-chaparal.org/photos-partage/php/api.php',
    method: 'POST',
    body: 'function=getAlbum&albumID=1&password=""' // get album 1 (site web)
  }, function (code, responseText, request) { // callback
    mainAlbum = JSON.parse(responseText);

    for (var key in mainAlbum.content) {
      var photo = mainAlbum.content[key];
      photos.push(photo);
    }

    // iterate through the photos array
    for ( var i = 0; i < photos.length; i++ ) {
      var _photo = photos[i];

      // Add larger thumb (manually for now...)
      _photo.thumbUrl = _photo.thumbUrl.replace('.jpeg', '@2x.jpeg');

      var result = blockTemplate(_photo);

      container.innerHTML += result;

      // create an instance of the lightbox on each photo
      (function(index, photo) {
        var lbx = new Lightbox(photo);

        // Apply
        win.setTimeout(function() {
          // Get the ith figure and show the corresponding lightbox on click
          var figure = qwery('.figure-float', container)[index];

          bean.on(figure, 'click', function() {
            lbx.init();
          });
        });
      })(i, _photo);
    }

    // Create a new instance of Packery now that we've loaded our page
    // Packery

    // in case we're having trouble w/ Packery (IE7)
    //if (typeof Packery != 'undefined') {
    try {
      var pckry = new Packery(container, { // options
        itemSelector: '.figure-float',
        gutter: 20
      });

      // once the files are added, run Blazy
      var bLazy = new Blazy({
        selector: '[data-src]',
        errorClass: 'blazy-error',
        offset: -40,
        success: function(element){
          win.setTimeout(function(){
            // We want to remove the loader gif now.

            element.className = element.className.replace(/\blazy\b/,'');
          }, 200);

          // call Packery on success to ensure the layout
          // is computed according to the loaded imgs
          if ( pckry ) {
            pckry.layout();
          }
        }
      });
    } catch(e) {
      // Problem w/ pckry
      console.error(e);
    }
  });

})(window, document);
