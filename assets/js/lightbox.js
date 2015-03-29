/*global window, document, qwery, bean, classie*/
(function(win, doc) {

	// create a new lightbox object

	var container			= qwery('.container-blocks')[0],
			figures				= qwery(".figure-float", container),
			lightbox			= qwery(".layer-lightbox")[0];

	// TODO: modularize click events


	var wrapper = lightbox, // make this editable for reuse
			body = document.getElementsByTagName('body')[0];

	// lightbox Handlebars template
	// takes in an object with an image url, a title, a description and a meta tag
	// var lightboxHtml = '<figure class="figure-lightbox"><div id="lightbox-display" class="lightbox-display"><div class="dim-lightbox"></div><img class="img-responsive" id="img-lightbox" src="{{ url }}" alt="{{ title }}" /><a class="icon icon-close close-lightbox" href="javascript:;" title="Fermer"></a></div><figcaption><small class="title-meta" id="meta-lightbox">{{ meta }}</small><h3 id="title-lightbox">{{ title }}</h3><p id="caption-lightbox">{{ description }}</p></figcaption></figure>';
	var lightboxLayer = document.createElement('div');
	lightboxLayer.className = 'layer-lightbox';

	function open(data) {
		var lightboxHtml = require(['lightboxHtml']),
				template = Handlebars.compile(lightboxHtml),
				result = template(data);

		lightboxLayer.innerHTML = result;

		body.appendChild(lightboxLayer);
		var lightboxWrapper = lightboxLayer;

		// put the body in lightbox mode
		classie.add(body, "body-lightbox");
		classie.add(wrapper, "open");


		//title_target.innerHTML = t;
		//caption_target.innerHTML = c;
		//meta_target.innerHTML = m;
		//img_target.setAttribute("src", u);

		centerY();
	}

	function close() {
		body.removeChild(lightboxLayer); // remove lightbox
		classie.remove(body, "body-lightbox"); // remove class from body


		//title_target.innerHTML = "";
		//caption_target.innerHTML = "";
		//meta_target.innerHTML = "";
		//img_target.setAttribute("src", "");
		//
		//img_target.style.marginTop = ""; // clear margin
	}

	function centerY() {
		win.setTimeout(function() { // avoid bad initial values
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

	// make the lightbox part of the window object
	win.Lightbox = Lightbox;

	// bind window resize to image positioning in lightbox
	win.onresize = function() {
		Lightbox.center()
	};

	// bind lightbox activity to click events
	for ( var i = 0; i < figures.length; i++ ) {

		var this_img = qwery('img', figures[i])[0];

		// object that will be injected into the lightbox template
		var imgData = {
			title: this_img.getAttribute('data-title'),
			description: this_img.getAttribute('data-caption'),
			meta: this_img.getAttribute('data-meta'),
			url: this_img.getAttribute('data-src') || this_img.getAttribute('src')
		};

		// attach click event on figures
		// since this is a loop, we must enclose
		// the contents of the function to preserve variables
		(function(fig, data) {
			bean.on(fig, 'click', function(e) {
				Lightbox.open(data);
			});
		})(figures[i], imgData);
	}

	// Click close button to close
	bean.on(close, 'click', function() {
		Lightbox.close();
	});

	// clone the `close()` function on the dim
	bean.clone(dim, close, 'click');

});(window, document);
