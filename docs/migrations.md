# Gestion des migrations avec TypeORM

Le projet utilise TypeORM pour gérer les migrations de base de données, ce qui permet de contrôler les changements de schéma de manière sécurisée et versionnée, particulièrement important en production.

## Configuration des migrations

Pour tous les environnements (développement et production) :

- La synchronisation automatique est désactivée (synchronize: false)
- Toutes les modifications de schéma se font exclusivement via des migrations
- Cette approche garantit une cohérence entre les environnements et un meilleur contrôle des changements

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


## Seeding de données

Le projet utilise un système de seeding personnalisé pour peupler la base de données avec des données initiales essentielles au fonctionnement de l'application.

### Fonctionnement des seeds

Les seeds sont organisés en classes qui implémentent une interface `Seeder` avec une méthode `run()`. Chaque seeder est responsable d'insérer un type spécifique de données dans la base de données.

### Exécuter les seeds

Pour exécuter tous les seeds configurés :

```
docker compose exec backend npm run seed
```

### Ajouter un nouveau seeder

1. Créez un fichier pour votre seeder dans le dossier `src/database/seeders/` (par exemple `mon-entite.seeder.ts`)
2. Implémentez l'interface `Seeder` avec une méthode `run()`
3. Ajoutez votre seeder à la liste des seeders dans `src/database/seed.ts`

Exemple de structure d'un seeder :

```typescript
import { DataSource } from 'typeorm';
import { MonEntite } from '../../entities/mon-entite.entity';

export class MonEntiteSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MonEntite);
    
    // Vérifier si les données existent déjà
    const count = await repository.count();
    if (count > 0) {
      console.log('MonEntite data already exists, skipping seed');
      return;
    }
    
    // Insérer les données
    await repository.insert([
      { nom: 'Exemple 1', description: 'Description 1' },
      { nom: 'Exemple 2', description: 'Description 2' }
    ]);
    
    console.log(`Inserted ${count} MonEntite records`);
  }
}
```

## Structure des migrations

Les migrations sont stockées dans le dossier "migrations" et sont également montées en volume dans Docker pour assurer une synchronisation entre votre environnement local et le conteneur.

Chaque fichier de migration contient deux méthodes :

- up() : Code exécuté lors de l'application de la migration
- down() : Code exécuté lors de l'annulation de la migration (revert)

## Workflow de développement recommandé

1. Modifiez vos entités selon les besoins du développement
2. Générez une migration pour appliquer ces changements :
```
docker compose exec backend npm run migration:generate --name=DescriptionDesChangements
```
3. Examinez le fichier de migration généré pour vous assurer qu'il reflète bien vos intentions
4. Exécutez la migration pour appliquer les changements à votre base de données:
```
docker compose exec backend npm run migration:run
```
5. Committez le fichier de migration avec votre code

## Déploiement en production

Les migrations sont exécutées automatiquement grâce au workflow GitHub Actions sinon vous pouvez exécuter la commande suivante sur votre serveur :

```
cd /chemin/vers/circul-art/server && npm run migration:run
```