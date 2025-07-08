<template>
    <div v-if="category">
        <HeroCategorySection :category="category" />
        <ProductsSection :category="category" />
        <ContactSection>
            <template #subtitle>
                <p class="font-bold first-letter:uppercase">
                    {{ category.name }}
                </p>
            </template>
            <template #intro>
                <p>
                    Pour toute question concernant le département
                    {{ category.article_part }}
                    {{ category.name }}
                </p>
            </template>
        </ContactSection>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import ProductsSection from '../components/categories/ProductsSection.vue';
import ContactSection from '../components/common/ContactSection.vue';
import HeroCategorySection from '../components/categories/HeroCategorySection.vue';
import { useCategory } from '../composables/useCategory';
import { computed, watch } from 'vue';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.category as string);
const { category, isFetched, isLoading } = useCategory(slug);

watch(
    [() => category.value, () => isFetched.value, () => isLoading.value],
    ([currentCategory, fetched, loading]) => {
        if (loading) return;
        if (fetched && currentCategory === null) {
            router.push({ name: 'NotFound' });
        }
    },
    {
        immediate: true
    }
);
</script>
