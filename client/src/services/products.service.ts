import type { Product } from '../interfaces/product.interface';
import { productsMock } from '../mock/products.mock';

export class ProductsService {
    static async fetchProductsByCategoryUri(uri: string): Promise<Product[]> {
        return await productsMock.filter(
            (product) => product.subcategory.category.uri === uri
        );
    }
}
