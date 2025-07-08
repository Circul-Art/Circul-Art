import { CategoriesService } from '../services/categories.service';
import { useQuery } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';

export function useCategory(categoryUri: Ref<string>) {
    const { data, isLoading, isFetched } = useQuery({
        queryKey: ['category', categoryUri],
        queryFn: () => CategoriesService.fetchCategoryByUri(categoryUri.value),
        enabled: () => !!categoryUri.value, // n'exécute pas si vide
        staleTime: 1000 * 60 * 5 // facultatif : cache 5 minutes
    });

    const category = computed(() => {
        return data.value || null;
    });

    return {
        category,
        isLoading,
        isFetched
    };
}
