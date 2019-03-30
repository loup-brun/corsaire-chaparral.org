{{- $scratch := newScratch -}}
{{- $scratch.Set "title" (.Name | replaceRE "^[0-9]{1,3}-(.+)" "$1") -}}
---
title: {{ $scratch.Get "title" }}
subtitle: ""
slug: {{ $scratch.Get "title" }}
images:
- /nouvelles/{{ .Date | dateFormat "2006" }}/{{ .Date | dateFormat "01" }}/{{ .Date | dateFormat "01" }}/{{ $scratch.Get "title" }}/couverture.jpg
date: {{ .Date | dateFormat "2006-01-02" }}
author: Club d’athlétisme Corsaire-Chaparral
description: 
---