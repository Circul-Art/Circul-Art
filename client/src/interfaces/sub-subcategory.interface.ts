import type { Subcategory } from './subcategory.interface';

export interface SubSubcategory {
    id: number;
    name: string;
    subcategory: Subcategory;
}
