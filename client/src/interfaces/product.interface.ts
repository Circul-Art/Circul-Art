import type { Subcategory } from './subcategory.interface';

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    subcategory: Subcategory;
}
