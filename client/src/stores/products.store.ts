import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { ProductsService } from '../services/products.service';
import type { Product } from '../interfaces/product.interface';

export const useProductsStore = defineStore('product', () => {
    const products: Ref<Product[]> = ref([]);

    async function fetchProductsByCategoryUri(categoryUri: string) {
        products.value =
            await ProductsService.fetchProductsByCategoryUri(categoryUri);
    }

    return {
        products,
        fetchProductsByCategoryUri
    };
});
