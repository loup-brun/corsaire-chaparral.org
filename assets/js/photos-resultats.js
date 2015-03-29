/*global window, document, qwery, bean, classie, Packery, Blazy, nanoajax, Handlebars*/
(function(win, doc) {

	var container			= qwery('.container-blocks')[0];

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
			allPhotosHtml,
			source;

	// GET the lightbox template
	nanoajax.ajax('/assets/html/lightbox.html', function(code, responseText) {
		source = responseText;
		
		console.log('Retrieved template: ', responseText);
	});

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
