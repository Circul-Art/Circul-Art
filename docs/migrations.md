# Gestion des migrations avec TypeORM

Le projet utilise TypeORM pour gérer les migrations de base de données, ce qui permet de contrôler les changements de schéma de manière sécurisée et versionnée, particulièrement important en production.

## Configuration des migrations

En environnement de développement (NODE_ENV différent de 'production') :

- La synchronisation automatique est activée (synchronize: true)
- Les changements dans les entités sont appliqués automatiquement à la base de données

En environnement de production (NODE_ENV=production) :

- La synchronisation automatique est désactivée (synchronize: false)
- Seules les migrations explicites peuvent modifier le schéma de la base de données

## Commandes pour les migrations

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

## Structure des migrations

Les migrations sont stockées dans le dossier "migrations" et sont également montées en volume dans Docker pour assurer une synchronisation entre votre environnement local et le conteneur.

Chaque fichier de migration contient deux méthodes :

- up() : Code exécuté lors de l'application de la migration
- down() : Code exécuté lors de l'annulation de la migration (revert)

## Workflow de développement recommandé

1. Développez en local avec NODE_ENV=development pour bénéficier de la synchronisation automatique
2. Une fois vos modifications d'entités stabilisées, générez une migration :
```
docker compose exec backend npm run migration:generate --name=DescriptionDesChangements
```
3. Examinez le fichier de migration généré pour vous assurer qu'il reflète bien vos intentions
4. Testez l'application et l'exécution de la migration dans un environnement similaire à la production
5. Committez le fichier de migration avec votre code

## Déploiement en production

En production, les migrations sont exécutées automatiquement au démarrage de l'application grâce à la configuration dans app.module.ts, qui utilise migrationsRun: true lorsque NODE_ENV=production.

Si vous préférez exécuter les migrations manuellement avant de démarrer l'application (approche recommandée pour plus de contrôle), vous pouvez modifier le workflow GitHub Actions ou exécuter la commande suivante sur votre serveur :

```
cd /chemin/vers/circul-art/server && npm run migration:run
```