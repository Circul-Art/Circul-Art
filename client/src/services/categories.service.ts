import type { Category } from '../interfaces/category.interface';
import { categoriesMock } from '../mock/categories.mock';

export class CategoriesService {
    static async fetchCategoryByUri(uri: string): Promise<Category> {
        const category = categoriesMock.find(
            (category) => category.uri === uri
        );

        if (!category) {
            throw new Error(`Category with URI "${uri}" not found`);
        }

        return await category;
    }
}
