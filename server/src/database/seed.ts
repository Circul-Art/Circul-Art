import { DataSource } from 'typeorm';
import { getTypeOrmConfig } from '../config/database.config';
import { CategorySeeder } from './seeders/category.seeder';
import { SubcategorySeeder } from './seeders/sub-category.seeder';

interface Seeder {
  run(dataSource: DataSource): Promise<void>;
}

// Type pour le constructeur du seeder
type SeederConstructor = new () => Seeder;

// Liste des seeders à exécuter
const SEEDERS: Array<{ name: string; constructor: SeederConstructor }> = [
  { name: 'CategorySeeder', constructor: CategorySeeder },
  { name: 'SubcategorySeeder', constructor: SubcategorySeeder },
];

// Fonction pour exécuter un seeder
async function executeSeed(
  dataSource: DataSource,
  seederInfo: { name: string; constructor: SeederConstructor },
): Promise<void> {
  console.log(`Running ${seederInfo.name}...`);
  const seeder = new seederInfo.constructor();
  await seeder.run(dataSource);
}

async function seed(): Promise<void> {
  const config = getTypeOrmConfig();
  const dataSource = new DataSource(config);

  try {
    await dataSource.initialize();

    // Exécution séquentielle des seeders
    for (const seederInfo of SEEDERS) {
      await executeSeed(dataSource, seederInfo);
    }

    console.log('Database seeding completed successfully');
  } catch (error: unknown) {
    console.error(
      'Error during database seeding:',
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

void seed();
