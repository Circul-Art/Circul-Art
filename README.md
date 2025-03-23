# Circul'Art - Plateforme de location de matériel culturel durable

Circul’Art est une plateforme dédiée à la location de matériels culturels (décors, costumes, équipements audiovisuels, éclairages, etc.), avec une approche innovante et durable. Elle vise à répondre à la demande croissante des professionnels de la culture en matière de flexibilité et d’accessibilité, tout en promouvant une économie circulaire pour réduire l'impact environnemental.

## Sommaire
- [Installation](docs/installation.md)
- [Migrations avec TypeORM](docs/migrations.md)
- [Sauvegarde et Restauration de la base de données](docs/sauvegarde-restauration.md)
- [Gestion des Dépendances](docs/gestion-dependances.md)

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