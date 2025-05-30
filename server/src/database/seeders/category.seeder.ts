import { DataSource } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

export class CategorySeeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Category);

    // Check if categories already exist
    const count = await repository.count();
    if (count > 0) {
      console.log('Categories already seeded');
      return;
    }

    const categories = [
      {
        name: 'Danse',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 15a6 6 0 1 1 12 0 6 6 0 0 1-12 0z"/><path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M9 7h6"/><path d="M12 7v6"/></svg>',
      },
      {
        name: 'Musique',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><path d="M6 15h3"/><path d="M18 16h3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="19" r="3"/></svg>',
      },
      {
        name: 'Théâtre',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h18v16H3z"/><path d="M12 4v16"/><path d="M8 8c1 0 2 1 2 2M16 8c-1 0-2 1-2 2M8 16c1 0 2-1 2-2M16 16c-1 0-2-1-2-2"/></svg>',
      },
      {
        name: 'Cinéma',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 8h20v12H2z"/><path d="M7 4l2 4M15 4l2 4"/><path d="M7 20l2-4M15 20l2-4"/><path d="M4 8v12M20 8v12"/><path d="M2 12h20M2 16h20"/></svg>',
      },
    ];

    // Insert categories
    await repository.save(categories);

    console.log('Categories seeded successfully');
  }
}
