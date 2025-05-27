<template>
    <div v-if="categoriesStore.category">
        <HeroCategorySection :category="categoriesStore.category" />
        <ProductsSection :category="categoriesStore.category" />
        <ContactSection>
            <template #subtitle>
                <p class="font-bold first-letter:uppercase">
                    {{ categoriesStore.category.name }}
                </p>
            </template>
            <template #intro>
                <p>
                    Pour toute question concernant le département
                    {{ categoriesStore.category.article_part }}
                    {{ categoriesStore.category.name }}
                </p>
            </template>
        </ContactSection>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import { useCategoriesStore } from '../stores/categories.store';
import ProductsSection from '../components/categories/ProductsSection.vue';
import ContactSection from '../components/common/ContactSection.vue';
import HeroCategorySection from '../components/categories/HeroCategorySection.vue';

const route = useRoute();
const router = useRouter();
const categoriesStore = useCategoriesStore();

watch(
    () => route.params.category as string,
    (newCategory: string) => {
        categoriesStore.getCategoryByUri(newCategory);
        if (!categoriesStore.category && !categoriesStore.isLoading) {
            router.push({ name: 'NotFound' });
        }
    },
    { immediate: true }
);
</script>
