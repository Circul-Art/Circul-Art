import { DataSource } from 'typeorm';
import { SubSubcategory } from '../../sub-subcategories/entities/sub-subcategory.entity';
import { Subcategory } from '../../sub-categories/entities/sub-category.entity';

export class SubSubcategorySeeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SubSubcategory);
    const subcategoryRepository = dataSource.getRepository(Subcategory);

    // Check if sub-subcategories already exist
    const count = await repository.count();
    if (count > 0) {
      console.log('Sub-subcategories already seeded');
      return;
    }

    // Fetch all subcategories to create associations
    const ballet = await subcategoryRepository.findOneBy({ name: 'Ballet' });
    const contemporain = await subcategoryRepository.findOneBy({
      name: 'Contemporain',
    });
    const rock = await subcategoryRepository.findOneBy({ name: 'Rock' });
    const classique = await subcategoryRepository.findOneBy({
      name: 'Classique',
    });
    const comedie = await subcategoryRepository.findOneBy({ name: 'Comédie' });
    const improvisation = await subcategoryRepository.findOneBy({
      name: 'Improvisation',
    });
    const animation = await subcategoryRepository.findOneBy({
      name: 'Animation',
    });
    const documentaire = await subcategoryRepository.findOneBy({
      name: 'Documentaire',
    });
    const performance = await subcategoryRepository.findOneBy({
      name: 'Performance',
    });

    if (
      !ballet ||
      !contemporain ||
      !rock ||
      !classique ||
      !comedie ||
      !improvisation ||
      !animation ||
      !documentaire ||
      !performance
    ) {
      console.error(
        'Subcategories not found. Please run subcategory seeder first.',
      );
      return;
    }

    // Create sub-subcategories with their associations
    const subSubcategories = [
      // Ballet sub-subcategories
      {
        name: 'Ballet classique',
        description:
          'Le ballet classique est caractérisé par sa technique rigoureuse et sa grâce',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M8 8v8M16 8v8"/></svg>',
        subcategories: [ballet],
      },
      {
        name: 'Ballet néo-classique',
        description:
          'Style de ballet qui utilise les techniques classiques mais avec plus de liberté',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5v14M4 19l16-14M20 19L4 5"/></svg>',
        subcategories: [ballet],
      },

      // Contemporain sub-subcategories
      {
        name: 'Danse contemporaine',
        description:
          'Style de danse développé au 20e siècle avec des mouvements libres et expressifs',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M20 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M4 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M20 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M4 15v-2"/><path d="M20 15v-2"/><path d="M12 15v-2"/></svg>',
        subcategories: [contemporain],
      },
      {
        name: 'Danse-théâtre',
        description:
          'Forme artistique qui combine éléments de danse et techniques de théâtre',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/><path d="M3 4h18v16H3z"/><path d="M12 4v16"/></svg>',
        subcategories: [contemporain, performance],
      },

      // Rock sub-subcategories
      {
        name: 'Hard Rock',
        description:
          'Style de rock avec guitares distordues et rythmiques intenses',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2v4l2 1 1 2h-6l1-2 2-1V2"/><path d="M9 9h6v9a2 2 0 1 1-6 0V9z"/></svg>',
        subcategories: [rock],
      },
      {
        name: 'Rock progressif',
        description:
          'Style de rock avec structures complexes et influences classiques',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 18.5V9"/><path d="M8 13l4-4 4 4"/><path d="M8 21h8"/></svg>',
        subcategories: [rock],
      },

      // Classique sub-subcategories
      {
        name: 'Musique baroque',
        description:
          'Période musicale de 1600 à 1750 avec Bach, Vivaldi et Handel',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><path d="M9 9h6M9 12h6M9 15h6"/></svg>',
        subcategories: [classique],
      },
      {
        name: 'Musique romantique',
        description:
          'Période musicale du 19e siècle avec Chopin, Liszt et Wagner',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M8 8h8M8 16h8"/></svg>',
        subcategories: [classique],
      },

      // Comédie sub-subcategories
      {
        name: 'Comédie de boulevard',
        description:
          'Genre théâtral français léger axé sur les quiproquos et situations cocasses',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg>',
        subcategories: [comedie],
      },
      {
        name: 'Stand-up',
        description:
          "Format comique où l'artiste s'adresse directement au public",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M8 21v-2a4 4 0 0 1 4-4v0a4 4 0 0 1 4 4v2"/><path d="M19 8v3M19 15h.01"/></svg>',
        subcategories: [comedie],
      },

      // Improvisation sub-subcategories
      {
        name: "Match d'impro",
        description: "Format compétitif d'improvisation avec deux équipes",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
        subcategories: [improvisation],
      },
      {
        name: 'Catch impro',
        description: "Format rapide d'improvisation avec contraintes",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14"/><path d="M7 10h10"/><path d="M7 14h8"/></svg>',
        subcategories: [improvisation],
      },

      // Animation sub-subcategories
      {
        name: 'Animation 3D',
        description:
          'Animation créée dans un environnement tridimensionnel numérique',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/></svg>',
        subcategories: [animation],
      },
      {
        name: 'Animation japonaise',
        description:
          "Style d'animation développé au Japon avec une esthétique distinctive",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"/><path d="M9 12s.5-1 3-1 3 1 3 1"/></svg>',
        subcategories: [animation],
      },

      // Documentaire sub-subcategories
      {
        name: 'Documentaire nature',
        description:
          'Films sur la faune et la flore dans leur environnement naturel',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h2M20 12h2M12 2v2M12 20v2"/><circle cx="12" cy="12" r="9"/><path d="M8 12s2-3 4-3 4 3 4 3-2 3-4 3-4-3-4-3z"/></svg>',
        subcategories: [documentaire],
      },
      {
        name: 'Documentaire social',
        description:
          'Exploration des questions et phénomènes sociaux contemporains',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
        subcategories: [documentaire],
      },

      // Performance sub-subcategories
      {
        name: 'Performance multimédia',
        description: 'Fusion de performance live avec technologies numériques',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
        subcategories: [performance],
      },
      {
        name: 'Performance participative',
        description:
          'Œuvres où le public devient partie intégrante de la création',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        subcategories: [performance],
      },

      // Cross-subcategory items
      {
        name: 'Opéra',
        description:
          'Art combinant musique classique et théâtre avec des performances chantées',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 15a8 8 0 1 0-16 0v1a8 8 0 0 0 16 0v-1z"/><path d="M2 15v1a8 8 0 0 0 16 0v-1"/><path d="M12 16v-8M8 12v4M16 12v4"/></svg>',
        subcategories: [classique, performance],
      },
      {
        name: 'Ciné-concert',
        description:
          "Projection de film accompagnée d'une performance musicale live",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M9 13v4m3-4v4m-6-4v4"/></svg>',
        subcategories: [classique, rock, animation, documentaire],
      },
    ];

    // Insert sub-subcategories with their relations
    await repository.save(subSubcategories);

    console.log('Sub-subcategories seeded successfully');
  }
}
