import { storeToRefs } from 'pinia';
import { ProductsService } from '../services/products.service';
import { useQuery } from '@tanstack/vue-query';
import { watch, type Ref } from 'vue';
import { useProductsStore } from '../stores/products.store';

export function useProduct(productUri: Ref<string>) {
    const store = useProductsStore();
    const { product } = storeToRefs(store);

    const { data, isLoading } = useQuery({
        queryKey: ['product', productUri],
        queryFn: () => ProductsService.fetchProductByUri(productUri.value),
        enabled: () => !!productUri.value, // n'exécute pas si vide
        staleTime: 1000 * 60 * 5 // facultatif : cache 5 minutes
    });

    watch(data, (product) => {
        if (product) {
            store.setProduct(product);
        }
    });

    return {
        product,
        isLoading
    };
}
