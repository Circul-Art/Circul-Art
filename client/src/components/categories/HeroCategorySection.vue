<template>
    <section
        class="flex flex-col sm:flex-row h-[93vh] max-h-[93vh] py-2 sm:py-10 sm:gap-8 lg:gap-12 xl:gap-16"
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
            class="w-full h-auto sm:w-1/2 flex justify-center items-center flex-1"
        >
            <img
                :src="placeholderImage"
                alt=""
                srcset=""
                class="w-full h-full sm:h-auto sm:aspect-square"
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
