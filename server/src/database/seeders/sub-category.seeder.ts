import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Subcategory } from '../../sub-categories/entities/sub-category.entity';
import { Category } from '../../categories/entities/category.entity';

export class SubcategorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Subcategory);
    const categoryRepository = dataSource.getRepository(Category);

    // Check if subcategories already exist
    const count = await repository.count();
    if (count > 0) {
      console.log('Subcategories already seeded');
      return;
    }

    // Fetch all categories to create associations
    const danse = await categoryRepository.findOneBy({ name: 'Danse' });
    const musique = await categoryRepository.findOneBy({ name: 'Musique' });
    const theatre = await categoryRepository.findOneBy({ name: 'Théâtre' });
    const cinema = await categoryRepository.findOneBy({ name: 'Cinéma' });

    if (!danse || !musique || !theatre || !cinema) {
      console.error('Categories not found. Please run category seeder first.');
      return;
    }

    // Create subcategories with their associations
    const subcategories = [
      // Danse subcategories
      {
        name: 'Ballet',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M7 12h10"/></svg>',
        categories: [danse],
      },
      {
        name: 'Contemporain',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M19 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M5 15a4 4 0 0 1 4-4h6a4 4 0 0 0 4-4"/></svg>',
        categories: [danse],
      },

      // Musique subcategories
      {
        name: 'Rock',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M6 9l6-3 6 3M6 20V9M18 20V9"/></svg>',
        categories: [musique],
      },
      {
        name: 'Classique',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M7 12h10"/></svg>',
        categories: [musique],
      },

      // Théâtre subcategories
      {
        name: 'Comédie',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
        categories: [theatre],
      },
      {
        name: 'Improvisation',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 3H5c-1 0-2 .6-2 1.5V15c0 1 .5 1.5 2 1.5h4l3 3 3-3h4c1.5 0 2-.5 2-1.5V4.5c0-1-1-1.5-2-1.5z"/></svg>',
        categories: [theatre],
      },

      // Cinéma subcategories
      {
        name: 'Animation',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a7 7 0 1 0-14.8 0"/></svg>',
        categories: [cinema],
      },
      {
        name: 'Documentaire',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>',
        categories: [cinema],
      },

      // Multi-category subcategories
      {
        name: 'Performance',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
        categories: [danse, theatre],
      },
    ];

    // Insert subcategories with their relations
    await repository.save(subcategories);

    console.log('Subcategories seeded successfully');
  }
}
