require.config({
	baseUrl: 'assets/lib',
	paths: {
		text: 'text/text',
		bonzo: 'bonzo/bonzo',
		qwery: 'qwery/qwery',
		bean: 'bean/bean',
		packery: 'packery/dist/packery.pkgd',
		blazy: 'blazy/blazy',
		nanoajax: 'nanoajax/nanoajax.min',
		handlebars: 'handlebars/handlebars',
		'handlebars-helpers': 'text!../js/hadlebars-helpers',
		lightbox: '../js/lightbox',

		lightboxHtml: 'text!../html/lightbox.html'
	},
	
	shim: {
		packery: {
			exports: 'Packery'
		},
		blazy: {
			exports: 'Blazy'
		},
		handlebars: {
			deps: ['handlebars-helpers'],
			exports: 'Handlebars'
		},
		nanoajax: {
			exports: 'nanoajax'
		},
		ligthbox: {
			exports: 'lightbox'
		}
	}
});

require([], function(){
	
});