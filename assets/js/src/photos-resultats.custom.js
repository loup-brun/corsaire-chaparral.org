/*global window, document, qwery, bean, classie, Packery, Blazy, nanoajax, Handlebars*/
(function(win, doc) {

	var container			= qwery('.container-blocks')[0],
			body					= qwery('body')[0];

	// moved lightbox to lightbox.js

	/**
	 * Lightbox constructor
	 * Requires qwery, bean, Handlebars, classie, nanoajax
	 */
	(function() {

		var Lightbox = function(data) {

			var body = doc.getElementsByTagName('body')[0];

			// Private methods
			function centerY(elem) {
				win.setTimeout(function() { // avoid bad initial values
					var parentRect	= elem.parentNode.getBoundingClientRect(),
							parentH		= parentRect.bottom - parentRect.top,
							imgH			= elem.offsetHeight,
							offset		= (parentH - imgH) / 2;

					elem.style.marginTop = offset + "px";
				}, 30);
			}

			// Fetch Handlebars template and render it into the element
			function insertContent(element, data, callback) {
				callback = callback || function() {};
				var source;

				data = data || {}; // assign data to empty object if null

				// GET the lightbox template
				nanoajax.ajax('/assets/html/lightbox.html', function(code, responseText) {
					source = responseText;

					var template = Handlebars.compile(source),
							rendered = template(data);

					element.innerHTML = rendered;

					// Wrap final callback in setTimeout to ensure
					// the previous step is finished
					win.setTimeout(function() {
						callback();
					});
				});
			}

			function close() {
				var elem = qwery('.layer-lightbox')[0];
				classie.remove(elem, 'open');

				win.setTimeout(function() {
					// Remove events
					//bean.off(this.elements.close);
					//bean.off(this.elements.dim);

					// Remove the element from the dom
					body.removeChild(elem);
				}, 1000); // leave delay for fadeOut
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
							imgElem = qwery('img', masterElement)[0];


					// On click, close the lightbox
					bean.on(closeElem, 'click', function() {
						close();
					});

					// Do the same thing on dim
					bean.clone(dimElem, closeElem);

					win.setTimeout(function() {
						centerY(imgElem);
					},50);

					// We are ready, open the lightbox
					classie.add(masterElement, 'open');
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
			blockHtml,
			photos = [];

	nanoajax.ajax({
		url: 'http://corsaire-chaparal.org/photos-partage/php/api.php',
		method: 'POST',
		body: 'function=getAlbum&albumID=1&password=""' // get album 1 (site web)
	}, function (code, responseText, request) { // callback
		mainAlbum = JSON.parse(responseText);

		console.log('Album parsed was ', mainAlbum);

		for (var key in mainAlbum.content) {
			var photo = mainAlbum.content[key];
			photos.push(photo);
		}

		nanoajax.ajax('/assets/html/block.html', function(code, responseText) {
			blockHtml = responseText;

			// iterate through the photos array
			for ( var i = 0; i < photos.length; i++ ) {
				var template = Handlebars.compile(blockHtml);
				var _photo = photos[i];
				var result = template(_photo);
				console.log('result',result);

				container.innerHTML += result;
			}

			// Create a new instance of Packery now that we've loaded our page
			// Packery

			// in case we're having trouble w/ Packery (IE7)
			if (typeof Packery != 'undefined') {
				var pckry = new Packery(
					container,
					{ // options
						itemSelector: '.figure-float',
						gutter: 20
					});
			}

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
		});
	});

})(window, document);
