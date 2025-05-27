<template>
    <section class="py-12">
        <div class="flex flex-row justify-between mb-4">
            <button
                class="flex flex-row items-center gap-2 border border-on-primary bg-primary py-2 px-5 cursor-pointer"
            >
                <InlineSvg :src="filter" />
                <span>Filtres</span>
            </button>
            <button
                class="flex flex-row items-center gap-1 cursor-pointer"
                @click="toggleSort"
            >
                <span>Trier par</span>
                <InlineSvg v-flip-vertical="openSort" :src="chevron" />
            </button>
        </div>
        <div class="flex flex-row justify-between">
            <button
                type="button"
                class="bg-tertiary p-2 flex flex-row items-center gap-1 cursor-pointer"
            >
                <span class="text-on-tertiary">Tag</span>
                <span>
                    <InlineSvg :src="xmark" class="w-6 h-6" />
                </span>
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import filter from '../../assets/filter.svg';
import chevron from '../../assets/chevron.svg';
import xmark from '../../assets/xmark.svg';
import { ref } from 'vue';

const openSort = ref(false);
const toggleSort = () => {
    openSort.value = !openSort.value;
};
</script>
