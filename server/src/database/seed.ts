import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';
import { getTypeOrmConfig } from '../config/database.config';
import { CategorySeeder } from './seeders/category.seeder';
import { SubcategorySeeder } from './seeders/sub-category.seeder';

async function seed(): Promise<void> {
  const config = getTypeOrmConfig();
  const dataSource = new DataSource(config);

  try {
    await dataSource.initialize();

    const seeders: (new () => Seeder)[] = [CategorySeeder, SubcategorySeeder];

    // Run seeders
    await runSeeders(dataSource, {
      seeds: seeders,
    });

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
