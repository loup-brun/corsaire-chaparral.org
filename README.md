# Site web du club d'athlétisme Corsaire-Chaparral

Ce répertoire recense le code source du site web du [club d'athlétisme Corsaire-Chaparral](https://corsaire-chaparral.org). Il est généré avec [Hugo](https://gohugo.io/), un générateur de sites web statiques écrit en Go.

## Installation

Pour construire ce site, assurez-vous d'avoir installé [Hugo](https://gohugo.io/) et [Node.js](https://nodejs.org/) sur votre système.

### En deux temps, trois mouvements

Si tout est déjà installé (incluant `grunt-cli` et `bower`), entrez :

```shell
npm install  # installe les outils de développements tels que postcss
```

### Instructions détaillées

Téléchargez ce répertoire ou, mieux, clonez-le dans votre environnement :

```bash
git clone https://github.com/corsaire-chaparral/corsaire-chaparral.org.git
cd corsaire-chaparral.org
```

Installez les dépendances :

```bash
npm install
```

**npm** installe les fichiers de développement Node.js pour générer les feuilles de style du site.

Vous pouvez à présent construire le site:

```bash
make build  # génère le site dans le dossier public/ 
```

Dans un environnement local, Hugo peut surveiller les fichiers afin de les compiler lorsqu'ils sont modifiés :

```shell
make serve  # démarre un serveur local à l'adresse locale http://localhost:1313
```

### Configuration

La configuration pour le site Hugo sont dans le fichier `config.yml`.

## Partage de photos

~~Les photos sont partagées à l'adresse `http://corsaire-chaparral.org/photos-partage/`.~~ Solution à étudier.

## Soutien

Envoyez un courriel à [Louis-Olivier Brassrad](louis@corsaire-chaparral.org).

## Licence

MIT
