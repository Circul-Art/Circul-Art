import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { Category } from '../interfaces/category.interface';

export const useCategoriesStore = defineStore('categories', () => {
    const categories: Ref<Category[]> = ref([]);
    const category: Ref<Category | null> = ref(null);
    const isLoading: Ref<boolean> = ref(false);

    return {
        // state
        categories,
        category,
        isLoading,

        // actions
        setCategories(newCategories: Category[]) {
            categories.value = newCategories;
        },
        setCategory(newCategory: Category | null) {
            category.value = newCategory;
        },
        setIsLoading(loading: boolean) {
            isLoading.value = loading;
        }
    };
});
