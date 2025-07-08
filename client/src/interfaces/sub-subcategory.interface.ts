import type { Subcategory } from './subcategory.interface';

export interface SubSubcategory {
    id: number;
    name: string;
    uri: string;
    subcategory: Subcategory;
}
