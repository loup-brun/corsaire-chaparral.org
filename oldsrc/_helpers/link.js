module.exports.register = function(Handlebars, options, params) {
  Handlebars.registerHelper('link', function(url) {

    var baseurl = params.assemble.options.baseurl;

    var combo = baseurl + url;
    // Trim trailing 'index.html' at the end of the string
    combo = combo.replace(/(index.html)$/g, '');
    
    return new Handlebars.SafeString(combo);
  });
};