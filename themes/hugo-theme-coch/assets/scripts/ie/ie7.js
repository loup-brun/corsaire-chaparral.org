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
		'icon-phone': '&#xe608;',
		'icon-cup': '&#xe604;',
		'icon-error': '&#xe000;',
		'icon-warning': '&#xe002;',
		'icon-mail': '&#xe07c;',
		'icon-stopwatch': '&#xe1b6;',
		'icon-map': '&#xe1f3;',
		'icon-map-marker': '&#xe1f7;',
		'icon-angle-left': '&#xe207;',
		'icon-angle-right': '&#xe208;',
		'icon-angle-up': '&#xe20a;',
		'icon-angle-down': '&#xe20b;',
		'icon-hamburger': '&#xe20e;',
		'icon-assignment': '&#xe272;',
		'icon-assignment_ind': '&#xe273;',
		'icon-list': '&#xe2aa;',
		'icon-thumb_up': '&#xe2ee;',
		'icon-star': '&#xe60d;',
		'icon-twitter': '&#xe610;',
		'icon-facebook': '&#xe611;',
		'icon-partenaire': '&#xe607;',
		'icon-endurance': '&#xe605;',
		'icon-logo-coch': '&#xe606;',
		'icon-highjump': '&#xe600;',
		'icon-athletics-3': '&#xe601;',
		'icon-javelin': '&#xe602;',
		'icon-run': '&#xe603;',
		'icon-close': '&#xf00d;',
		'icon-pencil': '&#xf040;',
		'icon-asterisk': '&#xf069;',
		'icon-calendar': '&#xf073;',
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
