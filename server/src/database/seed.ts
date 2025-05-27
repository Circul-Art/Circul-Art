import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { getTypeOrmConfig } from '../config/database.config';
import { CategorySeeder } from './seeders/category.seeder';
import { SubcategorySeeder } from './seeders/sub-category.seeder';

async function seed() {
  const config = getTypeOrmConfig();
  const dataSource = new DataSource(config);

  try {
    await dataSource.initialize();

    // Run seeders
    await runSeeders(dataSource, {
      seeds: [CategorySeeder, SubcategorySeeder],
    });

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

void seed();
