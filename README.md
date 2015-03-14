Site web du club d'athlétisme Corsaire-Chaparal
===

Ce répertoire recense le code source du site web du [club d'athlétisme Corsaire-Chaparal](http://corsaire-chaparal.org). Il est généré avec l'outil **Jekyll**, un Ruby Gem qui permet de générer des sites web statiques.

### Installation

Pour construire ce site, assurez-vous d'avoir installé les langages suivants sur votre système:

- [Node.js](https://nodejs.org/)
- [Ruby](https://www.ruby-lang.org/fr/)
- [Bower](http://bower.io/)

Installez Jekyll:

```
$ gem install jekyll
```

Vous pouvez vérifier si Jekyll est installé en tapant

```
$ jekyll -v
```

Pour les utilisateurs Windows, n'oubliez pas les [étapes supplémentaires](http://jekyll-windows.juthilo.com/1-ruby-and-devkit/).

Téléchargez ce répertoire ou clonez-le dans votre environnement:

```
$ mkdir coch
$ cd coch
$ git clone https://github.com/loup-brun/coch.git
```

Installez les dépendances:

```
$ npm install
$ bower install
```

**npm** installe les fichiers de développement (_back-end_) Node.js pour la compilation (concatenation et minification) de scripts `js` et de fichiers `sass` (en CSS). La compilation se fait à l'aide de [Grunt.js](http://gruntjs.com/).

**bower** installe les bibliothèques (_front-end_) du site web. Voyez le fichier bower.json pour la liste des dépendances (surtout des scripts `.js`). Les bibliothèques seront installées dans `assets/lib/`. Vous _devez_ installer les bibliothèques pour générer le site correctement.

Vous pouvez à présent construire les ressources (qui se trouveront dans le dossier `assets/lib/`.

```
$ grunt build
```

Dans un environnement de développement, Grunt peut surveiller les fichiers afin de les compiler lorsqu'ils sont modifiés: 

```
$ grunt watch
```

Finalement, il ne reste qu'à générer le site web:

```
$ jekyll build
$ jekyll build --watch
$ jekyll serve
```

* **build**: génère le site
* **build --watch**: regénère le site lorsqu'un fichier est modifié
* **serve**: le site est servi sur un serveur local à l'adresse `http://localhost:4000`.

### Configuration

Les données de configuration pour générer le site sont situées dans le fichier `_config.yml`.

Les données pour la compilation `.js` et `sass` sont dans le fichier `Gruntfile.js`.

### Partage de photos

Les photos sont partagées à l'adresse http://corsaire-chaparal.org/photos-partage/

### Questions
Envoyez un courriel à louis.oli.br@gmail.com

**Louis-Olivier Brassard**

