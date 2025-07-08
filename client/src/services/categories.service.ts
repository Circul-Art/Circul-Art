import type { Category } from '../interfaces/category.interface';
import { categoriesMock } from '../mock/categories.mock';

export class CategoriesService {
    static async fetchCategoryByUri(uri: string): Promise<Category | null> {
        return (
            (await categoriesMock.find((category) => category.uri === uri)) ||
            null
        );
    }
}
