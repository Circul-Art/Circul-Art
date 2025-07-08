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
import { useRoute } from 'vue-router';
import ProductsSection from '../components/categories/ProductsSection.vue';
import ContactSection from '../components/common/ContactSection.vue';
import HeroCategorySection from '../components/categories/HeroCategorySection.vue';
import { useCategory } from '../composables/useCategories';
import { computed } from 'vue';

const route = useRoute();

const slug = computed(() => route.params.category as string);
const { category } = useCategory(slug);
</script>
