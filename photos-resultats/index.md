---
layout: page
title: Photos et résultats
icon: trophy

scripts:
  - "/assets/js/photo-layout.min.js"

stylesheets:
  - "/assets/css/photo-layout.css" 

lightbox: true

---

<div class="row container-photo">
	{% comment %}
	{% capture images %}{% lychee_album_no_cache 1 %}{% endcapture %}
	{% for img in images %}
	{% assign _title = img.title %}
	{% assign _caption = img.description %}
	{% assign _meta = img.tags %}
	{% assign _url = img.url | prepend: site.lychee.url %}
	{% include photo.html title=_title caption=_caption url=_url meta=_meta %}
	{% endfor %}
	{% endcomment %}

	{% lychee_album_no_cache 1 %}
{% comment %}
{% endcomment %}
</div>
