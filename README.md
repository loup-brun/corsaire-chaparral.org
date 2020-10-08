# Site web du club d'athlétisme Corsaire-Chaparral

Ce répertoire recense le code source du site web du [club d'athlétisme Corsaire-Chaparral](https://corsaire-chaparral.org).
Il est généré avec [Hugo](https://gohugo.io/), un générateur de sites web statiques écrit en Go.

## Installation

### Prérequis

Les instructions documentent un usage en ligne de commande.
Assurez-vous de disposer d'un **terminal** (interface en ligne de commande).

Pour construire ce site, assurez-vous d'avoir installé les logiciels suivants :

- [Hugo](https://gohugo.io/) (v0.63+)
- [Node.js](https://nodejs.org/) (v10+)

### Instructions détaillées

Téléchargez ce dépôt ou, mieux, clonez-le avec Git :

```bash
git clone https://github.com/corsaire-chaparral/corsaire-chaparral.org.git
cd corsaire-chaparral.org
```

Installez les dépendances :

```bash
npm install
```

**npm** installe les outils de développement Node.js pour générer les feuilles de style du site ([postcss](https://github.com/postcss/postcss-cli/), [autoprefixer](https://github.com/postcss/autoprefixer/)).

Vous pouvez à présent construire le site :

```bash
make build  # génère le site dans le dossier public/ 
```

Vous pouvez prévisualiser le site en local, avec les changements en temps réel :

```bash
make serve  # démarre un serveur local à l'adresse locale http://localhost:1313
```

### Configuration

La configuration pour le site Hugo sont dans le fichier `config.yml`.

## Partage de photos

~~Les photos sont partagées à l'adresse `http://corsaire-chaparral.org/photos-partage/`.~~ Solution à étudier.

## Soutien

Envoyez un courriel à [Louis-Olivier Brassard](louis@corsaire-chaparral.org).

## Licence

MIT
