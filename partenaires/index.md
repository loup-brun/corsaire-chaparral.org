---

layout: page
title: Partenaires
title-meta: 2014-2015
icon: partenaire

---

<div class="row">
<div class="col col-6 tablet-col-12">
	{% assign _half = site.data.partenaires | size | divided_by:2 %}
	
	{% for partenaire in site.data.partenaires limit:_half %}
	{% assign _name = partenaire.name %}
	{% assign _url = partenaire.url %}
	{% assign _img = partenaire.image %}
	{% include partenaire.html name=_name url=_url img=_img %}
	{% endfor %}
</div>
<div class="col col-6 tablet-col-12">
	{% for partenaire in site.data.partenaires offset:_half %}
	{% assign _name = partenaire.name %}
	{% assign _url = partenaire.url %}
	{% assign _img = partenaire.image %}
	{% include partenaire.html name=_name url=_url img=_img %}
	{% endfor %}
</div>

</div>
