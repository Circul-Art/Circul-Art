<template>
    <section class="flex flex-row mb-4 px-6 sm:px-8 lg:px-10">
        <div class="flex justify-center items-center">
            <router-link to="/" class="text-sm h-5.5">Accueil</router-link>
        </div>
        <div
            v-for="(path, index) in paths"
            :key="path"
            class="flex flex-row justify-center items-center [&>svg]:mt-0"
        >
            <InlineSvg :src="chevronright" class="mx-2" />
            <router-link
                :to="toPath(index)"
                exact-active-class="font-semibold"
                class="first-letter:uppercase text-sm h-5.5"
            >
                {{ path }}
            </router-link>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import chevronright from '../../assets/chevron-right.svg';
import { useRoute } from 'vue-router';

const route = useRoute();
const paths = computed(() =>
    route.fullPath.split('/').filter((path) => path !== '')
);

function toPath(index: number): string {
    return `/${paths.value.slice(0, index + 1).join('/')}`;
}
</script>
