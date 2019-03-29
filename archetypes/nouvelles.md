---
title: {{ .Name | replaceRE "^[0-9]{1,3}-(.+)" "$1" }}
subtitle: ""
slug: {{ .Name | replaceRE "^[0-9]{1,3}-(.+)" "$1" }}
date: {{ .Date | dateFormat "2006-01-02" }}
author: Club d’athlétisme Corsaire-Chaparral
description: 
images:
- /nouvelles/{{ .Date | dateFormat "2006" }}/{{ .Date | dateFormat "01" }}/{{ .Date | dateFormat "01" }}/{{ .Name | replaceRE "^[0-9]{1,3}-(.+)" "$1" }}/couverture.jpg
---