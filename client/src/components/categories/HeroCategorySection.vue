<template>
    <section
        class="flex flex-col sm:flex-row h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] overflow-hidden py-2 sm:py-10 sm:gap-8 lg:gap-12 xl:gap-16"
    >
        <div class="flex flex-col gap-5 mb-10 sm:my-auto sm:w-1/2">
            <h1>
                Découvrez tout notre équipement pour
                {{ category.article_def }} {{ category.name }}
            </h1>
            <p>{{ category.hero_paragraph }}</p>
            <div class="flex flex-row gap-4">
                <router-link
                    class="bg-secondary text-on-secondary py-3 px-6"
                    to="/voir-avec-margaux"
                >
                    Voir tout
                </router-link>
                <router-link
                    class="bg-primary text-on-primary py-3 px-6 border border-on-primary"
                    to="/contact"
                >
                    Contact
                </router-link>
            </div>
        </div>
        <div
            class="h-full w-full sm:w-1/2 flex justify-end items-center flex-1"
        >
            <img
                :src="placeholderImage"
                alt=""
                srcset=""
                class="w-full h-auto max-h-full aspect-square"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import placeholderImage from '../../assets/placeholder-img.jpg';
import type { Category } from '../../interfaces/category.interface';

defineProps<{
    category: Category;
}>();
</script>
