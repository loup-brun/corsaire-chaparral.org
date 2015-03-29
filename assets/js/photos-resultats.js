/*global window, document, qwery, bean, classie, Packery, Blazy, nanoajax, Handlebars*/
(function(win, doc) {

	var container			= qwery('.container-blocks')[0],
			body					= qwery('body')[0];

	// moved lightbox to lightbox.js

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
			function insertContent(element, data) {
				var source;

				data = data || {}; // assign data to empty object if null

				// GET the lightbox template
				nanoajax.ajax('/assets/html/lightbox.html', function(code, responseText) {
					source = responseText;
					console.log(source);

					var template = Handlebars.compile(source),
							rendered = template(data);	
					console.log(rendered);

					element.innerHTML = rendered;
				});
			}

			function close(elem) {
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
				// Our lightbox master element
				var masterElement  = doc.createElement('div');

				// Append the master element to the body
				body.appendChild(masterElement);

				// Add the class to the master element
				masterElement.className = 'layer-lightbox';

				// Insert the content into the lightbox
				insertContent(masterElement, data);
				
				// Attached events on Lightbox elements
				var closeElem = qwery('.close-lightbox', masterElement)[0],
						dimElem = qwery('.dim-lightbox', masterElement)[0],
						imgElem = qwery('img', masterElement)[0];

				centerY(imgElem);

				// On click, close the lightbox
				bean.on(closeElem, 'click', function() {
					close(masterElement);
				});

				// Do the same thing on dim
				bean.clone(dimElem, closeElem);

				// We are ready, open the lightbox
				classie.add(masterElement, 'open');
			}

			// TODO: Public API
			return {
				init: init()
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



	/*
	nanoajax.ajax({
		url: 'http://corsaire-chaparal.org/photos-partage/php/api.php',
		method: 'POST',
		body: 'function=getAlbum&albumID=1&password=""' // get album 1 (site web)
	}, function (code, responseText, request) { // callback
		mainAlbum = JSON.parse(responseText);

		console.log('Album parsed was ', responseText);

		for (var key in mainAlbum.content) {
			var photo = mainAlbum.content[key];
			photos.push(photo);
		}

		// iterate through the photos array
		win.setTimeout(function() { // make sure the previous step is complete
			for ( var i = 0; i < photos.length; i++ ) {
				var template = Handlebars.compile(source);
				var _photo = photos[i];
				var result = template(_photo);
				console.log('result',result);

				allPhotosHtml += result;
				//container.innerHTML += result;
			}
		},0);
	});
	*/

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
})(window, document);
