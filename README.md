Site web du club d'athlétisme Corsaire-Chaparal
===

Ce répertoire recense le code source du site web du [club d'athlétisme Corsaire-Chaparal](http://corsaire-chaparal.org). Il est généré avec l'outil **Jekyll**, un Ruby Gem qui permet de générer des sites web statiques.

### Installation

Pour construire ce site, assurez-vous d'avoir installé les langages suivants sur votre système:

- Node.js
- Ruby


Installez Jekyll

```
$ gem install jekyll
```

Vous pouvez vérifier si Jekyll est installé comme ceci:

```
$ jekyll -v
```

Pour les utilisateurs Windows, n'oubliez pas les [étapes supplémentaires](http://jekyll-windows.juthilo.com/1-ruby-and-devkit/).

Téléchargez ce répertoire Github ou clonez-le dans votre environnement:

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

**npm** installe les modules Node.js pour la compilation (concatenation et minification) de scripts `js` et de fichiers `sass` (en CSS). La compilation se fait à l'aide de [Grunt.js](http://gruntjs.com/).

**bower** installe les bibliothèques du site web. Voyez le fichier bower.json pour la liste des dépendances (surtout des scripts `.js`).

Vous pouvez maintenant construire les ressources (qui se trouveront dans le dossier `assets/`):

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
* **serve**: sert le site à l'adresse locale `http://localhost:4000`

### Configuration

Les données de configuration pour générer le site sont situées dans le fichier `_config.yml`.

### Partage de photos

Les photos sont partagées à l'adresse http://corsaire-chaparal.org/photos-partage/



### Questions
Envoyez un courriel à louis.oli.br@gmail.com

**Louis-Olivier Brassard**

