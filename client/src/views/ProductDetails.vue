<template>
    <div v-if="product">
        <div class="mb-8 flex flex-col sm:gap-12 md:flex-row">
            <ImageSection />
            <DetailsSection :product="product" />
        </div>
        <div>
            <RatingsSection />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import type { Product } from '../interfaces/product.interface';
import RatingsSection from '../components/details/RatingsSection.vue';
import ImageSection from '../components/details/ImageSection.vue';
import DetailsSection from '../components/details/DetailsSection.vue';
import { computed } from 'vue';
import { useProduct } from '../composables/useProduct';

const route = useRoute();
const router = useRouter();

const slug = computed(() => route.params.product as string);
const { product } = useProduct(slug);

watch(
    () => product.value,
    (product) => {
        if (product !== null && !isAllSlugsMatch(product)) {
            router.push({ name: 'NotFound' });
        }
    }
);

function isAllSlugsMatch(product: Product): boolean {
    const subsubcategoryUri = route.params.subsubcategory as string;
    const subcategoryUri = route.params.subcategory as string;
    const categoryUri = route.params.category as string;

    return (
        product.subsubcategory.subcategory.category.name === categoryUri &&
        product.subsubcategory.subcategory.name === subcategoryUri &&
        product.subsubcategory.name === subsubcategoryUri
    );
}
</script>
