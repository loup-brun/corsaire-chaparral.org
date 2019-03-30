---
name: Nouvelles
about: "✏️ Gabarit pour les nouvelles."
title: 'Nouvelle: [Titre]'
labels: "\U0001F4D3 contenu, \U0001F5C4\U0001F4F0 section/nouvelles, \U0001F64B‍♀️\U0001F64B‍♂️➕
  requête/ajout"
assignees: loup-brun

---

## Liste à cocher

* [ ] Créer la branche (`##-nouvelle-titre-de-larticle`) où `##` est le numéro de cette Issue
* [ ] Créer l'article (`hugo new nouvelles/000-titre-de-larticle/index.md`)
* [ ] Éditer les métadonnées de l'article
* [ ] Rédiger une courte introduction (~1 phrase)
* [ ] Ajouter l'image de couverture (`nouvelles/000-titre-de-larticle/couverture.jpg`)
* [ ] Rédiger l'article avec des niveaux d'en-tête 2 (`h2`)
* [ ] Ajouter d'autres images à l'article (au besoin)
* [ ] Visualiser (`make serve`)
* [ ] Faire une [demande de fusion _(Pull Request)_](https://github.com/corsaire-chaparral/corsaire-chaparral.org/compare) pour intégrer dans `master`
* [ ] Déployer `master` (`./deploy-production`)
