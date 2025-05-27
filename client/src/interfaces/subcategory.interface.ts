import type { Category } from './category.interface';

export interface Subcategory {
    id: number;
    name: string;
    uri: string;
    category: Category;
}
