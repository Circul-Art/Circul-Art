<template>
    <div class="lg:hidden mt-6 flex-1">
        <p class="text-sm font-semibold mb-4">Catégories</p>
        <nav>
            <ul class="flex flex-col gap-4">
                <li v-for="category in categoriesMock" :key="category.uri">
                    <router-link
                        :to="`/categories/${category.uri}`"
                        class="flex items-center"
                    >
                        <span class="text-on-primary first-letter:uppercase">
                            {{ category.name }}
                        </span>
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="mt-4 flex flex-col gap-4">
            <slot name="navbar-mobile-actions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { categoriesMock } from '../../mock/categories.mock';
</script>
