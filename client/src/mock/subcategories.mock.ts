import type { Subcategory } from '../interfaces/subcategory.interface';
import { categoriesMock } from './categories.mock';

export const subcategoriesMock: Subcategory[] = [
    {
        id: 1,
        name: 'Instruments',
        uri: 'instruments',
        category: categoriesMock.find((category) => category.uri === 'music')!
    }
];
