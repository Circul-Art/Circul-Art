import { storeToRefs } from 'pinia';
import { CategoriesService } from '../services/categories.service';
import { useCategoriesStore } from '../stores/categories.store';
import { useQuery } from '@tanstack/vue-query';
import { watch, type Ref } from 'vue';

export function useCategory(categoryUri: Ref<string>) {
    const store = useCategoriesStore();
    const { category } = storeToRefs(store);

    const { data, isLoading } = useQuery({
        queryKey: ['category', categoryUri],
        queryFn: () => CategoriesService.fetchCategoryByUri(categoryUri.value),
        enabled: () => !!categoryUri.value, // n'exécute pas si vide
        staleTime: 1000 * 60 * 5 // facultatif : cache 5 minutes
    });

    watch(data, (category) => {
        if (category) {
            store.setCategory(category);
        }
    });

    return {
        category,
        isLoading
    };
}
