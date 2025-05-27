import type { Product } from '../interfaces/product.interface';
import { subcategoriesMock } from './subcategories.mock';

export const productsMock: Product[] = [
    {
        id: 1,
        name: 'Guitare électrique Stratocaster',
        brand: 'Fender',
        price: 25,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.uri === 'guitar'
        )!
    },
    {
        id: 2,
        name: 'Batterie acoustique Stage Custom',
        brand: 'Yamaha',
        price: 45,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.uri === 'drums'
        )!
    }
];
