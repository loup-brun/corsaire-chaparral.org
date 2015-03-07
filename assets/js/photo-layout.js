onDomReady(function() {

	// IMPORTANT
	// start with lightbox
	var container			= qwery('.container-photo')[0],
		 figures				= qwery(".figure-float", container),
		 lightbox			= qwery(".layer-lightbox")[0],
		 dim					= qwery(".dim-lightbox")[0],
		 close				= qwery(".close-lightbox")[0],
		 title_target		= qwery("#title-lightbox")[0],
		 caption_target	= qwery("#caption-lightbox")[0],
		 meta_target		= qwery("#meta-lightbox")[0],
		 img_target			= qwery("#img-lightbox")[0];

	// create a new lightbox object
	(function(w) {

		var wrapper = lightbox, // make this editable for reuse
			 body = document.getElementsByTagName('body')[0];

		function open(t, c, m, u) {
			var config = {}; // todo
			// put the body in lightbox mode
			classie.add(body, "body-lightbox");
			classie.add(wrapper, "open");

			title_target.innerHTML = t;
			caption_target.innerHTML = c;
			meta_target.innerHTML = m;
			img_target.setAttribute("src", u);

			centerY();
		}

		function close() {
			classie.remove(wrapper, "open");
			classie.remove(body, "body-lightbox");

			title_target.innerHTML = "";
			caption_target.innerHTML = "";
			meta_target.innerHTML = "";
			img_target.setAttribute("src", "");

			img_target.style.marginTop = ""; // clear margin
		}

		function centerY() {
			setTimeout(function() { // avoid bad initial values
				var parentRect	= document.getElementById('lightbox-display').getBoundingClientRect(),
					 parentH		= parentRect.bottom - parentRect.top,
					 img			= document.getElementById('img-lightbox'),
					 imgH			= img.height,
					 offset		= (parentH - imgH) / 2;

				img.style.marginTop = offset + "px";
			}, 30);
		}

		// our Lightbox object
		var Lightbox = {
			wrapper: wrapper,
			centerY: centerY,
			center: centerY,
			open: open,
			close: close
		}

		window.Lightbox = Lightbox;

		window.onresize = function() {
			Lightbox.center()
		};
	})(window);


	for ( var i = 0; i < figures.length; i++ ) {

		var this_img		= qwery('img', figures[i])[0],
			 this_title		= this_img.getAttribute('data-title'),
			 this_caption	= this_img.getAttribute('data-caption'),
			 this_meta	= this_img.getAttribute('data-meta'),
			 this_url		= this_img.getAttribute('data-src') || this_img.getAttribute('src');

		// attach click event on figures
		(function(fig, t, c, m, u) {
			bean.on(figures[i], 'click', function(e) {
				Lightbox.open(t, c, m, u);
			});
		})(figures[i], this_title, this_caption, this_meta, this_url);
	}

	// Click close button to close
	bean.on(close, 'click', function() {
		Lightbox.close();
	});

	// Same close function for the dim
	bean.clone(dim, close, 'click');

	// Packery

	// in case we're having trouble w/ Packery (IE7)
	if (typeof Packery != 'undefined') {
		var pckry = new Packery( container, {
			// options
			itemSelector: '.figure-float',
			gutter: 20
		});
	}

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
