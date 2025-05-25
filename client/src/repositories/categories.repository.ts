import { CATEGORIES } from '../constants/categories.constants';

export class CategoriesRepository {
    public static findCategoryByUri(uri: string) {
        const categories = Object.values(CATEGORIES);
        const category = categories.find((category) => category.URI === uri);

        if (!category) {
            throw new Error(`Category with URI "${uri}" not found`);
        }

        return category;
    }
}
