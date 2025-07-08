import type { SubSubcategory } from './sub-subcategory.interface';

export interface Product {
    id: number;
    name: string;
    uri: string;
    brand: string;
    price: number;
    subsubcategory: SubSubcategory;
    description?: string;
}
