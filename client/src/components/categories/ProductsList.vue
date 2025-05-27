<template>
    <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10">
        <li v-for="product in products" :key="product.id">
            <article class="text-on-primary">
                <router-link
                    :to="`/categories/${category.uri}/product/${product.id}`"
                    class="flex flex-col justify-center items-center text-center"
                >
                    <div class="aspect-square w-full h-auto mb-3">
                        <img
                            :src="placeholderImage"
                            alt=""
                            class="w-full h-full"
                        />
                    </div>
                    <h3 class="text-base font-bold">
                        {{ product.name }}
                    </h3>
                    <p class="text-sm mb-2">{{ product.brand }}</p>
                    <strong class="font-bold text-lg mb-3">
                        {{ product.price }} €/jour
                    </strong>
                    <button
                        type="button"
                        class="border border-on-primary bg-primary text-on-primary px-3 py-2 w-full cursor-pointer"
                    >
                        Ajouter au panier
                    </button>
                </router-link>
            </article>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Category } from '../../interfaces/category.interface';
import type { Product } from '../../interfaces/product.interface';
import placeholderImage from '../../assets/placeholder-img.jpg';

defineProps<{
    category: Category;
    products: Product[];
}>();
</script>
