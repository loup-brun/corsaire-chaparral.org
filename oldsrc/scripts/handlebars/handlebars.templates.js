this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["block"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<figure class=\"figure-float col col-4 tablet-col-6 phone-col12\">\r\n	<img class=\"blazy\" src=\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\" data-src=\"http://corsaire-chaparal.org/photos-partage/"
    + alias3(((helper = (helper = helpers.thumbUrl || (depth0 != null ? depth0.thumbUrl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"thumbUrl","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" />\r\n	<figcaption>\r\n		<h5>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\r\n		<p>"
    + ((stack1 = (helpers.truncateWords || (depth0 && depth0.truncateWords) || alias1).call(depth0,(depth0 != null ? depth0.description : depth0),12,{"name":"truncateWords","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</p>\r\n	</figcaption>\r\n</figure>";
},"useData":true});

this["Handlebars"]["templates"]["lightbox"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<figure class=\"figure-lightbox\">\r\n	<div id=\"lightbox-display\" class=\"lightbox-display\">\r\n		<div class=\"dim-lightbox\"></div>\r\n		<img class=\"img-responsive\" src=\"http://corsaire-chaparal.org/photos-partage/"
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" />\r\n		<div class=\"loader\"></div>\r\n		<a class=\"icon icon-close close-lightbox\" href=\"javascript:;\" title=\"Fermer\"></a>\r\n	</div>\r\n	<figcaption>\r\n		<small class=\"title-meta\">"
    + alias3(((helper = (helper = helpers.tags || (depth0 != null ? depth0.tags : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tags","hash":{},"data":data}) : helper)))
    + "</small>\r\n		<h3>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\r\n		<p>"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n	</figcaption>\r\n</figure>";
},"useData":true});