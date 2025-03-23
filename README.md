# Circul'Art - Installation et Utilisation avec Docker

## Prérequis
Avant de commencer, assurez-vous d'avoir installé :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation et Lancement du Projet

1. **Cloner le projet** :
   ```sh
   git clone https://github.com/votre-repo/circul-art.git
   cd circul-art
   ```

2. **Créer un fichier `.env` pour le backend** (si non existant) :
   ```sh
   cp server/.env.example server/.env
   ```
   Modifiez les variables d'environnement si nécessaire. Le fichier devrait contenir :
   ```
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=circul-art
   NODE_ENV=development
   ```

3. **Lancer l'application avec Docker Compose** :
   ```sh
   docker compose up --watch
   ```
   Cette commande va :
   - Construire et démarrer les conteneurs (`frontend`, `backend`, `db`, `pgadmin`).
   - Synchroniser automatiquement les modifications dans `client/src` et `server/src`.
   - Recompiler le projet si `package.json` est modifié.

## Explication du `docker-compose.yml`

### Services

- **frontend** :
  - Construit à partir du dossier `client` avec `Dockerfile`.
  - Exposé sur le port `5173`.
  - Synchronisation des fichiers source pour un développement fluide.
  - Se reconstruit si `package.json` change.
  - Dépend du `backend`.

- **backend** :
  - Construit à partir du dossier `server` avec `Dockerfile`.
  - Exposé sur le port `3001` (mappé sur `3000` dans le conteneur).
  - Charge les variables d'environnement depuis `.env`.
  - Synchronisation des fichiers source et reconstruction si `package.json` change.
  - Dépend de la base de données `db`.

- **db (PostgreSQL 16)** :
  - Conteneur nommé `circul-art-db-1`.
  - Base de données `circul-art` créée au démarrage.
  - Exposé sur le port `5432`.
  - Stocke les données dans un volume nommé `db_data`.
  - Intègre une vérification de santé (healthcheck).

- **pgadmin** :
  - Interface web pour gérer la base de données PostgreSQL.
  - Exposé sur le port `8080`.
  - Email de connexion : `admin@admin.com`
  - Mot de passe : `admin`
  - Connecté à `db`.

### Volumes
- `db_data` : Stocke les données PostgreSQL de manière persistante.
- `pgadmin_data` : Stocke la configuration et les données de pgAdmin.

## Gestion des Dépendances

Si vous souhaitez ajouter un nouveau package, utilisez les commandes suivantes :

### Ajouter un package au frontend :
```sh
docker compose exec frontend npm install <nom_du_package>
```

### Ajouter un package au backend :
```sh
docker compose exec backend npm install <nom_du_package>
```

## Installation complète des dépendances

### Approche entièrement conteneurisée (recommandée)

Avec notre configuration Docker, il **n'est pas nécessaire** d'installer les dépendances en local. 
Docker s'occupe d'installer et gérer toutes les dépendances à l'intérieur des conteneurs.

Pour démarrer le projet sans aucune installation locale (hormis Docker) :
```sh
docker compose up --watch
```

### Installation locale des dépendances (optionnel)

Si vous souhaitez avoir les dépendances en local (pour l'autocomplétion dans votre IDE par exemple) :

**Frontend** :
```sh
cd client
npm install
```

**Backend** :
```sh
cd server
npm install
```

**Important** : L'installation locale des dépendances est purement optionnelle et ne change pas le fonctionnement de l'application dans les conteneurs Docker.

**Note importante sur les dépendances locales** : Si vous installez des packages localement et que vous utilisez VSCode ou un autre IDE, vous pourriez rencontrer des incohérences entre votre environnement de développement local et l'environnement Docker. Par exemple :

- Des erreurs de linting ou d'intellisense dans VSCode pour des modules qui fonctionnent parfaitement dans Docker
- Des différences de comportement entre l'exécution locale et l'exécution dans Docker
- Des modules qui fonctionnent dans un environnement mais pas dans l'autre en raison de différences de système d'exploitation

En cas de divergence, considérez l'environnement Docker comme la référence, puisque c'est là que votre application s'exécute réellement. Si nécessaire, vous pouvez synchroniser manuellement les package.json et package-lock.json entre les environnements.

### Comment les dépendances sont-elles gérées ?

Notre configuration Docker :

1. **Lors de la construction des images** :
   - Docker exécute `npm install` dans les conteneurs en se basant sur les fichiers `package.json`
   - Les dépendances sont installées dans les conteneurs, pas sur votre machine

2. **Lors du développement** :
   - Si vous modifiez un `package.json`, Docker reconstruira automatiquement le conteneur correspondant
   - Les commandes comme `docker compose exec backend npm install <package>` installent les packages dans le conteneur

3. **Le fichier `package-lock.json`** :
   - Est généré/mis à jour dans les conteneurs
   - Peut être différent de celui généré localement en raison des différences d'environnement (Linux dans Docker vs Windows/Mac en local)
   - C'est le fichier dans le conteneur qui fait autorité pour l'exécution

## Gestion des migrations de base de données avec TypeORM

Le projet utilise TypeORM pour gérer les migrations de base de données, ce qui permet de contrôler les changements de schéma de manière sécurisée et versionnée, particulièrement important en production.

### Configuration des migrations

En environnement de développement (NODE_ENV différent de 'production') :

- La synchronisation automatique est activée (synchronize: true)
- Les changements dans les entités sont appliqués automatiquement à la base de données

En environnement de production (NODE_ENV=production) :

- La synchronisation automatique est désactivée (synchronize: false)
- Seules les migrations explicites peuvent modifier le schéma de la base de données

### Commandes pour les migrations

Toutes les commandes liées aux migrations doivent être exécutées dans le conteneur backend :

1. **Créer une migration vide** :

Utile pour les modifications manuelles, les transformations de données ou l'ajout de données initiales (seeding) :

```
docker compose exec backend npm run migration:create --name=NomDeLaMigration
```

2. **Générer une migration basée sur les changements d'entités** :

Après avoir modifié/ajouté des entités, générez une migration qui appliquera ces changements :

```
docker compose exec backend npm run migration:generate --name=NomDeLaMigration
```

3. **Exécuter toutes les migrations en attente** :

```
docker compose exec backend npm run migration:run
```

4. **Annuler la dernière migration appliquée** :

```
docker compose exec backend npm run migration:revert
```

### Structure des migrations

Les migrations sont stockées dans le dossier "migrations" et sont également montées en volume dans Docker pour assurer une synchronisation entre votre environnement local et le conteneur.

Chaque fichier de migration contient deux méthodes :

- up() : Code exécuté lors de l'application de la migration
- down() : Code exécuté lors de l'annulation de la migration (revert)

### Workflow de développement recommandé

1. Développez en local avec NODE_ENV=development pour bénéficier de la synchronisation automatique
2. Une fois vos modifications d'entités stabilisées, générez une migration :
```
docker compose exec backend npm run migration:generate --name=DescriptionDesChangements
```
3. Examinez le fichier de migration généré pour vous assurer qu'il reflète bien vos intentions
4. Testez l'application et l'exécution de la migration dans un environnement similaire à la production
5. Committez le fichier de migration avec votre code

### Déploiement en production

En production, les migrations sont exécutées automatiquement au démarrage de l'application grâce à la configuration dans app.module.ts, qui utilise migrationsRun: true lorsque NODE_ENV=production.

Si vous préférez exécuter les migrations manuellement avant de démarrer l'application (approche recommandée pour plus de contrôle), vous pouvez modifier le workflow GitHub Actions ou exécuter la commande suivante sur votre serveur :

```
cd /chemin/vers/circul-art/server && npm run migration:run
```

## Sauvegarde et Restauration de la Base de Données

Le projet contient un dossier `db` structuré comme suit :

```
db/
├── dump.sql         # Dump initial de la base de données
├── backups/         # Dossier contenant les sauvegardes de la base de données
└── script/
    ├── backup-db.ps1  # Script PowerShell pour sauvegarder la base de données
    └── restore-db.ps1 # Script PowerShell pour restaurer la base de données
```

### Exécuter une sauvegarde de la base de données

Le script `backup-db.ps1` permet de créer une sauvegarde et de mettre à jour `dump.sql`. Pour l'exécuter, utilisez :
```powershell
.\db\script\backup-db.ps1
```

Ce script :
1. Crée un dossier `db/backups/` s'il n'existe pas.
2. Génère un dump de la base de données `circul-art` et le stocke dans `db/backups/` avec un horodatage.
3. Met à jour `db/dump.sql` avec la dernière sauvegarde.

### Restaurer la base de données

Pour restaurer la base de données à partir du fichier `dump.sql`, exécutez :
```powershell
.\db\script\restore-db.ps1
```

Ce script restaure l'état de la base de données à partir du fichier `dump.sql`. Vous pourriez voir des erreurs concernant des objets déjà existants, ce qui est normal si certaines structures existent déjà dans la base.

## Arrêter les conteneurs
```sh
docker compose down
```

## Nettoyer les volumes (supprime les données persistantes !)
```sh
docker compose down -v
```

## Accès aux Services

- **Frontend** : [http://localhost:5173](http://localhost:5173)
- **Backend API** : [http://localhost:3001](http://localhost:3001)
- **API Documentation** : [http://localhost:3001/api](http://localhost:3001/api)
- **pgAdmin** : [http://localhost:8080](http://localhost:8080)
  - Email : `admin@admin.com`
  - Mot de passe : `admin`
  
### Connexion à PostgreSQL depuis pgAdmin

1. Après vous être connecté à pgAdmin, cliquez sur "Add New Server"
2. Dans l'onglet "General", donnez un nom au serveur (ex: "Circul'Art DB")
3. Dans l'onglet "Connection", entrez les informations suivantes :
   - Host name/address: `db`
   - Port: `5432`
   - Maintenance database: `circul-art`
   - Username: `postgres`
   - Password: `postgres`
4. Cliquez sur "Save"