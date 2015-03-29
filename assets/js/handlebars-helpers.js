Handlebars.registerHelper('truncateWords', function(context, max, options) {
	max = max || 12; // set the maximum to 12 words if not specified

	// convert input to string if not already one
	if ( typeof context !== 'string' ) {
		return;
	}
	var string = context;

	// if the string is longer than allowed, cut it
	var words = string.split(' '); // split words into an array

	if ( words.length > max ) {
		var spliced = words.splice(0, max); // splice the array and keep only max words
		var newString = spliced.join(' '); // join the remaining words of the array

		string = newString += '...'; // add trailing '...' to the cut string
	} // else just return the original string

	return string;
});