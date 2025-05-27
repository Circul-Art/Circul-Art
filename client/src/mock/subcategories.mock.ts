import type { Subcategory } from '../interfaces/subcategory.interface';
import { categoriesMock } from './categories.mock';

export const subcategoriesMock: Subcategory[] = [
    {
        id: 1,
        category: categoriesMock.find((category) => category.uri === 'music')!,
        name: 'guitare',
        uri: 'guitar'
    },
    {
        id: 2,
        category: categoriesMock.find((category) => category.uri === 'music')!,
        name: 'batterie',
        uri: 'drums'
    },
    {
        id: 3,
        category: categoriesMock.find((category) => category.uri === 'music')!,
        name: 'piano',
        uri: 'piano'
    },
    {
        id: 4,
        category: categoriesMock.find((category) => category.uri === 'music')!,
        name: 'basse',
        uri: 'bass'
    }
];
