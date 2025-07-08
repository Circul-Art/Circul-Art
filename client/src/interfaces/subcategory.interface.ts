import type { Category } from './category.interface';

export interface Subcategory {
    id: number;
    name: string;
    category: Category;
}
