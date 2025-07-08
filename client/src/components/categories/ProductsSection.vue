<template>
    <section class="py-10">
        <div v-if="products.length > 0" class="flex flex-col items-center">
            <div class="hidden sm:block mb-6 w-full">
                <FiltersBar />
            </div>
            <div class="mb-10 w-full">
                <ProductsList :category="category" :products="products" />
            </div>
            <div>
                <button
                    type="button"
                    class="border border-on-primary bg-primary text-on-primary px-5 py-3 cursor-pointer"
                >
                    Tout voir
                </button>
            </div>
        </div>
        <div
            v-else
            class="flex flex-col items-center justify-center py-8 sm:py-16 text-on-primary"
        >
            <img :src="emptbox" alt="Aucun produit" class="w-20 h-20 mb-4" />
            <p class="text-lg font-medium mb-1">Aucun produit disponible</p>
            <p class="text-sm">
                Reviens bientôt, de nouveaux produits seront ajoutés !
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Category } from '../../interfaces/category.interface';
import ProductsList from './ProductsList.vue';
import FiltersBar from './FiltersBar.vue';
import emptbox from '../../assets/empty-box.svg';
import { computed } from 'vue';
import { useProducts } from '../../composables/useProducts';

const props = defineProps<{
    category: Category;
}>();

const categoryUri = computed(() => props.category.name);
const { products } = useProducts(categoryUri);
</script>
