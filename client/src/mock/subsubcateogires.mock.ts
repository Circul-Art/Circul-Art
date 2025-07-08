import type { SubSubcategory } from '../interfaces/sub-subcategory.interface';
import { subcategoriesMock } from './subcategories.mock';

export const subSubcategoriesMock: SubSubcategory[] = [
    {
        id: 1,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.name === 'instruments'
        )!,
        name: 'guitares'
    },
    {
        id: 2,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.name === 'instruments'
        )!,
        name: 'batterie'
    },
    {
        id: 3,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.name === 'instruments'
        )!,
        name: 'piano'
    },
    {
        id: 4,
        subcategory: subcategoriesMock.find(
            (subcategory) => subcategory.name === 'instruments'
        )!,
        name: 'basse'
    }
];
