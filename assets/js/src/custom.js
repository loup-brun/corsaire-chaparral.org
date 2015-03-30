/*global window, document, qwery, bean, classie*/
(function(win, doc) {

	// include qwery as a selector engine
	bean.setSelectorEngine(qwery);

/*
	// Dropdowns
	var dropdowns = qwery(".dropdown"),
		 ddOpen; // for dropdown state
	if (window.hasTouch) {

		for ( var i = 0; i < dropdowns.length; i++ ) {
			var a = qwery("> a", dropdowns[i])[0],
				 dd = dropdowns[i];
			console.log(a);
			console.log(i, dropdowns[i]);

			bean.on(a, 'click', function(event) {
				event.preventDefault();
				event.stopPropagation();

				// open the menu on click
				classie.toggleClass(dd, "open");
			});
		}
	} else {
		//alert("no touch");

	}
	*/

	// Toggle nav
	var toggled,
		 toggle = qwery("#nav-toggle")[0],
		 nav = qwery("#nav-main")[0];

	bean.on(toggle, 'click', function(event) {
		classie.toggleClass(nav, "toggled");

		if ( classie.has(nav, "toggled") ) {
			toggled = true;
			//alert(toggled);
		} else {
			toggled = false;
			//alert(toggled);
		}
	});

})();
