---
layout: page
title: Photos et résultats
icon: trophy

scripts:
  - "/assets/js/photos-resultats.min.js"

stylesheets:
  - "/assets/css/blocks-layout.css"

---

<div class="row container-blocks">
	{% comment %}
	{% capture images %}{% lychee_album_no_cache 1 %}{% endcapture %}
	{% for img in images %}
	{% assign _title = img.title %}
	{% assign _caption = img.description %}
	{% assign _meta = img.tags %}
	{% assign _url = img.url | prepend: site.lychee.url %}
	{% include block.html title=_title caption=_caption url=_url meta=_meta %}
	{% endfor %}
	
	{% lychee_album_no_cache 1 %}
	{% endcomment %}
	
</div>

### ;/

Les photos ne sont pas disponibles pour le moment.
