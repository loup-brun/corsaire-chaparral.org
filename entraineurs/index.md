---
layout: page
title: Entraîneurs
icon: stopwatch

---

{% for entraineur in site.entraineurs %}
* [{{ entraineur.title }}]({{ entraineur.url | prepend: site.baseurl }})
{% endfor %}
