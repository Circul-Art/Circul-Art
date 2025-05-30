import { DataSource } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Image } from '../../images/entities/image.entity';
import { SubSubcategory } from '../../sub-subcategories/entities/sub-subcategory.entity';

export class ProductSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);
    const imageRepository = dataSource.getRepository(Image);
    const subSubcategoryRepository = dataSource.getRepository(SubSubcategory);

    // Check if products already exist
    const count = await productRepository.count();
    if (count > 0) {
      console.log('Products already seeded');
      return;
    }

    // Fetch needed sub-subcategories for associations
    const balletClassique = await subSubcategoryRepository.findOneBy({
      name: 'Ballet classique',
    });
    const hardRock = await subSubcategoryRepository.findOneBy({
      name: 'Hard Rock',
    });
    const musiqueBaroque = await subSubcategoryRepository.findOneBy({
      name: 'Musique baroque',
    });
    const musiqueRomantique = await subSubcategoryRepository.findOneBy({
      name: 'Musique romantique',
    });
    const animation3D = await subSubcategoryRepository.findOneBy({
      name: 'Animation 3D',
    });
    const documentaireNature = await subSubcategoryRepository.findOneBy({
      name: 'Documentaire nature',
    });
    const opera = await subSubcategoryRepository.findOneBy({ name: 'Opéra' });
    const cineConcert = await subSubcategoryRepository.findOneBy({
      name: 'Ciné-concert',
    });

    if (
      !balletClassique ||
      !hardRock ||
      !musiqueBaroque ||
      !musiqueRomantique ||
      !animation3D ||
      !documentaireNature ||
      !opera ||
      !cineConcert
    ) {
      console.error(
        'Required sub-subcategories not found. Please run sub-subcategory seeder first.',
      );
      return;
    }

    // Create products with their associations
    const products = [
      // Produits pour la musique
      {
        name: 'Violon Stradivarius',
        description:
          'Réplique professionnelle du célèbre violon Stradivarius, parfait pour les concerts classiques',
        size: 'Standard 4/4',
        brand: 'Cremona',
        basePrice: 75.0,
        promotion: 10,
        subSubcategories: [musiqueBaroque, musiqueRomantique, opera],
      },
      {
        name: 'Guitare électrique Fender Stratocaster',
        description:
          'Guitare électrique professionnelle, idéale pour les concerts rock',
        size: 'Standard',
        brand: 'Fender',
        basePrice: 60.0,
        promotion: undefined,
        subSubcategories: [hardRock, cineConcert],
      },
      {
        name: 'Piano à queue Yamaha',
        description:
          'Piano à queue de concert pour performances classiques et modernes',
        size: 'Demi-queue',
        brand: 'Yamaha',
        basePrice: 150.0,
        promotion: 5,
        subSubcategories: [musiqueRomantique, opera, cineConcert],
      },
      {
        name: 'Violoncelle professionnel',
        description: 'Violoncelle de qualité pour concerts et enregistrements',
        size: 'Standard 4/4',
        brand: 'Stentor',
        basePrice: 85.0,
        promotion: undefined,
        subSubcategories: [musiqueBaroque, musiqueRomantique],
      },

      // Produits pour la danse
      {
        name: 'Tutus de ballet professionnels',
        description:
          'Lot de 5 tutus professionnels pour performances de ballet',
        size: 'S-M-L',
        brand: 'Bloch',
        basePrice: 40.0,
        promotion: undefined,
        subSubcategories: [balletClassique],
      },
      {
        name: 'Chaussons de pointe',
        description:
          'Lot de 10 paires de chaussons de pointe pour ballet classique',
        size: '36-41',
        brand: 'Capezio',
        basePrice: 30.0,
        promotion: 15,
        subSubcategories: [balletClassique],
      },

      // Produits pour le cinéma
      {
        name: 'Caméra professionnelle 4K',
        description:
          'Caméra cinéma 4K avec accessoires pour tournages professionnels',
        size: 'Standard',
        brand: 'Canon',
        basePrice: 120.0,
        promotion: undefined,
        subSubcategories: [documentaireNature, animation3D],
      },
      {
        name: "Système d'éclairage complet",
        description: "Kit complet pour l'éclairage de scène ou de tournage",
        size: '5 projecteurs',
        brand: 'Neewer',
        basePrice: 65.0,
        promotion: 5,
        subSubcategories: [cineConcert, animation3D, documentaireNature],
      },
    ];

    // Insert products
    for (const productData of products) {
      const { subSubcategories, ...productInfo } = productData;

      // Create and save the product
      const product = productRepository.create(productInfo);
      const savedProduct = await productRepository.save(product);

      // Set the many-to-many relationship
      savedProduct.subSubcategories = subSubcategories;
      await productRepository.save(savedProduct);

      // Create images for each product
      const images = [
        {
          name: `${savedProduct.name.toLowerCase().replace(/\s+/g, '_')}_main.jpg`,
          productId: savedProduct.id,
        },
        {
          name: `${savedProduct.name.toLowerCase().replace(/\s+/g, '_')}_detail.jpg`,
          productId: savedProduct.id,
        },
      ];

      await imageRepository.save(images);
    }

    console.log('Products and their images seeded successfully');
  }
}
