Site web du club d'athlétisme Corsaire-Chaparal
===

Ce répertoire recense le code source du site web du [club d'athlétisme Corsaire-Chaparal](http://corsaire-chaparal.org). Il est généré avec [Assemble](http://assemble.io), un générateur de sites web statiques écrit en [Node.js](https://nodejs.org/), une tâche [Grunt](http://gruntjs.com).

### Installation

Pour construire ce site, assurez-vous d'avoir installé [Node.js](https://nodejs.org/) sur votre système.

#### En deux temps, trois mouvements

Si tout est déjà installé (incluant `grunt-cli`, `bower` et [sass](http://sass-lang.com/) pour les feuilles de style), entrez:

```shell
npm install        # installe les outils de développements tels que Grunt
bower install      # installe les bibliothèques javascript
grunt build        # construit le site dans `dist/`
```

#### Instructions détaillées

Installez `bower` et `grunt`

```shell
npm install -g bower       # installe bower et le rend disponible à partir de l'interface ligne de commande
npm install -g grunt-cli   # installe grunt-cli et le rend disponible à partir de l'interface ligne de commande
```

Pour compiler les feuilles de style `.scss`, vous pouvez utiliser le compilateur `sass` en [Ruby](http://sass-lang.com) ou [libsass](http://(libsass.org)).

Téléchargez ce répertoire ou clonez-le dans votre environnement:

```shell
git clone https://github.com/loup-brun/coch.git
cd coch
```

Installez les dépendances:

```
npm install
bower install
```

**npm** installe les fichiers de développement Node.js pour générer les ressources du site (avec Grunt).

**bower** installe les bibliothèques (_front-end_) du site web. Voyez le fichier bower.json pour la liste des dépendances (surtout des scripts `.js`). Les bibliothèques seront installées dans `bower_components/`. Vous _devez_ installer les bibliothèques pour produire les scripts correctement.

Vous pouvez à présent construire le site:

```shell
grunt              # `grunt build` fait la même chose
```

Dans un environnement de développement, Grunt peut surveiller les fichiers afin de les compiler lorsqu'ils sont modifiés: 

```shell
grunt server       # Sert le site à l'adresse locale http://localhost:9000
```

### Configuration

Les données pour la génération des pages, la compilation `.js` et `sass` ainsi que les outils de développement sont dans le fichier `Gruntfile.js`.

### Partage de photos

Les photos sont partagées à l'adresse `http://corsaire-chaparal.org/photos-partage/`. Solution à étudier.

### Questions

Envoyez un courriel à louis.oli.br@gmail.com

**Louis-Olivier Brassard**

