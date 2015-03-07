/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'coch-icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-partenaire': '&#xe607;',
		'icon-endurance': '&#xe605;',
		'icon-logo-coch': '&#xe606;',
		'icon-high-jump': '&#xe600;',
		'icon-athletics-3': '&#xe601;',
		'icon-javelin': '&#xe602;',
		'icon-run': '&#xe603;',
		'icon-stopwatch': '&#xe604;',
		'icon-star': '&#xf005;',
		'icon-close': '&#xf00d;',
		'icon-pencil': '&#xf040;',
		'icon-map-marker': '&#xf041;',
		'icon-asterisk': '&#xf069;',
		'icon-calendar': '&#xf073;',
		'icon-twitter-square': '&#xf081;',
		'icon-facebook-square': '&#xf082;',
		'icon-trophy': '&#xf091;',
		'icon-phone': '&#xf095;',
		'icon-chain': '&#xf0c1;',
		'icon-bars': '&#xf0c9;',
		'icon-envelope': '&#xf0e0;',
		'icon-angle-left': '&#xf104;',
		'icon-angle-right': '&#xf105;',
		'icon-angle-up': '&#xf106;',
		'icon-angle-down': '&#xf107;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
