define(['packery', 'blazy', 'handlebars', 'nanoajax'],function(Packery, Blazy, Handlebars, nanoajax) {

	// IMPORTANT
	// start with lightbox
	var container			= qwery('.container-blocks')[0],
			figures				= qwery(".figure-float", container),
			lightbox			= qwery(".layer-lightbox")[0],
			dim					= qwery(".dim-lightbox")[0],
			close				= qwery(".close-lightbox")[0],
			title_target		= qwery("#title-lightbox")[0],
			caption_target	= qwery("#caption-lightbox")[0],
			meta_target		= qwery("#meta-lightbox")[0],
			img_target			= qwery("#img-lightbox")[0];

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
			source = '<figure class="figure-float col col-4 tablet-col-6 mobile-col-12"><img class="blazy" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src-sm="{{ thumbUrl }}" data-src="{{url}}" data-title="{{ title }}" data-caption="{{ description }}" alt="{{ title }}"{{#if meta}} data-meta="{{ meta }}"{{/if}} /><figcaption><h5>{{ title }}</h5><p>{{#truncateWords description 12}}{{/truncateWords}}</p></figcaption></figure>';

	nanoajax.ajax(
		'http://corsaire-chaparal.org/photos-partage/php/api.php',
		'function=getAlbum&albumID=1&password=""', // get album 1 (site web)
		function(code, response) { // callback
			mainAlbum = JSON.parse(response);
			for (var key in mainAlbum.content) {
				var photo = mainAlbum.content[key]
				photos.push(photo);
			}

			// iterate through the photos array
			setTimeout(function() { // make sure the previous step is done
				for ( var i = 0; i < photos.length; i++ ) {
					var template = Handlebars.compile(source);
					var include = photos[i];
					var result = template(include);
					console.log('result',result);

					allPhotosHtml += result
					//container.innerHTML += result;
				}
			},0);
		}
	);

	var bLazy = new Blazy({
		selector: '[data-src]',
		errorClass: 'blazy-error',
		offset: -40,
		success: function(element){
			setTimeout(function(){
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
