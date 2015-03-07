Site web du club d'athlétisme Corsaire-Chaparal
===

Ce répertoire recense le code source du site web du [club d'athlétisme Corsaire-Chaparal](http://corsaire-chaparal.org). Il est généré avec l'outil **Jekyll**, un Ruby Gem qui permet de générer des sites web statiques.

Pour construire ce site, assurez-vous d'avoir installé les systèmes suivants sur votre système:

- Node.js
- Ruby

Ensuite, assurez-vous d'avoir installé Jekyll:

```shell
$ jekyll -v
```

Si ce n'est pas le cas, installez-le à partir d'une ligne de commande:

```shell
$ gem install jekyll
```

Pour les utilisateurs Windows, n'oubliez pas les [étapes supplémentaires](http://jekyll-windows.juthilo.com/1-ruby-and-devkit/).

Téléchargez ce répertoire ou clonez-le dans votre environnement:

```shell
$ mkdir coch
$ cd coch
$ git clone https://github.com/loup-brun/coch.git
```

Installez les dépendances:

```shell
$ npm install
$ bower install
```

*npm* installe les modules Node.js pour la compilation (concatenation et minification) de scripts `js` et de fichiers `sass` (en CSS). La compilation se fait à l'aide de [Grunt.js](http://gruntjs.com/).

*bower* installe les bibliothèques du site web. Voyez le fichier bower.json pour la liste des dépendances (surtout des scripts `.js`).

Vous pouvez maintenant construire les ressources (qui se trouveront dans le dossier `assets/`):

```shell
$ grunt build
```

Dans un environnement de développement, Grunt peut surveiller les fichiers afin de les compiler lorsqu'ils sont modifiés: 

```shell
$ grunt watch
```

Finalement, il ne reste qu'à générer le site web.

```shell
$ jekyll build
$ jekyll build --watch // refait la commande build lorsqu'un fichier est modifié
$ jekyll serve // testez le site à http://localhost:4000/
```

Louis-Olivier Brassard

