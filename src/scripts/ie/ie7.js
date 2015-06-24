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
		'icon-cup': '&#xe604;',
		'icon-times': '&#xe608;',
		'icon-angle-right': '&#xe609;',
		'icon-angle-left': '&#xe60a;',
		'icon-hamburger': '&#xe60b;',
		'icon-list': '&#xe60c;',
		'icon-star': '&#xe60d;',
		'icon-person': '&#xe60e;',
		'icon-phone': '&#xe60f;',
		'icon-twitter': '&#xe610;',
		'icon-facebook': '&#xe611;',
		'icon-mail': '&#xe612;',
		'icon-map': '&#xe613;',
		'icon-calendar': '&#xe614;',
		'icon-stopwatch': '&#xe615;',
		'icon-partenaire': '&#xe607;',
		'icon-endurance': '&#xe605;',
		'icon-logo-coch': '&#xe606;',
		'icon-high-jump': '&#xe600;',
		'icon-athletics-3': '&#xe601;',
		'icon-javelin': '&#xe602;',
		'icon-run': '&#xe603;',
		'icon-pencil': '&#xf040;',
		'icon-asterisk': '&#xf069;',
		'icon-chain': '&#xf0c1;',
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
