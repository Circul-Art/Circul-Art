import { storeToRefs } from 'pinia';
import { ProductsService } from '../services/products.service';
import { useQuery } from '@tanstack/vue-query';
import { watch, type Ref } from 'vue';
import { useProductsStore } from '../stores/products.store';

export function useProducts(categoryUri: Ref<string>) {
    const store = useProductsStore();
    const { products } = storeToRefs(store);

    const { data, isLoading } = useQuery({
        queryKey: ['products', categoryUri],
        queryFn: () =>
            ProductsService.fetchProductsByCategoryUri(categoryUri.value),
        enabled: () => !!categoryUri.value, // n'exécute pas si vide
        staleTime: 1000 * 60 * 5 // facultatif : cache 5 minutes
    });

    watch(data, (products) => {
        if (products) {
            store.setProducts(products);
        }
    });

    return {
        products,
        isLoading
    };
}
