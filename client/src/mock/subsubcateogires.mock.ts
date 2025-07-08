import type { SubSubcategory } from '../interfaces/sub-subcategory.interface';
import { subcategoriesMock } from './subcategories.mock';

export const subSubcategoriesMock: SubSubcategory[] = [
    {
        id: 1,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.uri === 'instruments'
        )!,
        name: 'guitares',
        uri: 'guitars'
    },
    {
        id: 2,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.uri === 'instruments'
        )!,
        name: 'batterie',
        uri: 'drums'
    },
    {
        id: 3,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.uri === 'instruments'
        )!,
        name: 'piano',
        uri: 'piano'
    },
    {
        id: 4,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.uri === 'instruments'
        )!,
        name: 'basse',
        uri: 'bass'
    }
];
