import type { Product } from '../interfaces/product.interface';
import { productsMock } from '../mock/products.mock';

export class ProductsService {
    static async fetchProductsByCategoryUri(uri: string): Promise<Product[]> {
        return productsMock.filter(
            (product) => product.subsubcategory.subcategory.category.uri === uri
        );
    }

    static async fetchProductByUri(uri: string): Promise<Product | null> {
        return productsMock.find((p) => p.uri === uri) || null;
    }
}
