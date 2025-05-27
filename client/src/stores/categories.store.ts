import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { CategoriesService } from '../services/categories.service';
import type { Category } from '../interfaces/category.interface';

export const useCategoriesStore = defineStore('categories', () => {
    const categories: Ref<Category[]> = ref([]);
    const category: Ref<Category | null> = ref(null);
    const isLoading: Ref<boolean> = ref(false);

    async function getCategoryByUri(categoryUri: string) {
        isLoading.value = true;
        category.value =
            await CategoriesService.fetchCategoryByUri(categoryUri);
        isLoading.value = false;
    }

    return {
        categories,
        category,
        getCategoryByUri,
        isLoading
    };
});
