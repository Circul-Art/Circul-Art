import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { Product } from '../interfaces/product.interface';

export const useProductsStore = defineStore('products', () => {
    const products: Ref<Product[]> = ref([]);
    const product: Ref<Product | null> = ref(null);
    const isLoading: Ref<boolean> = ref(false);

    return {
        // state
        products,
        product,
        isLoading,

        // actions
        setProducts(newProducts: Product[]) {
            products.value = newProducts;
        },
        setProduct(newProduct: Product | null) {
            product.value = newProduct;
        },
        setIsLoading(loading: boolean) {
            isLoading.value = loading;
        }
    };
});
