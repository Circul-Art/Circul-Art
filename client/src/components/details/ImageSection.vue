<template>
    <section class="w-full mb-6 md:basis-1/2 md:flex md:flex-row md:gap-3">
        <div class="flex-col gap-3 basis-1/6 hidden md:flex">
            <img
                :src="placeholderImage"
                class="w-full max-h-[calc(100vh-3.5rem)] md:h-auto aspect-square"
            />
            <img
                :src="placeholderImage"
                class="w-full max-h-[calc(100vh-3.5rem)] md:h-auto aspect-square"
            />
            <img
                :src="placeholderImage"
                class="w-full max-h-[calc(100vh-3.5rem)] md:h-auto aspect-square"
            />
            <img
                :src="placeholderImage"
                class="w-full max-h-[calc(100vh-3.5rem)] md:h-auto aspect-square"
            />
        </div>
        <div class="basis-5/6">
            <img
                :src="placeholderImage"
                class="w-full max-h-[calc(100vh-3.5rem)] md:h-auto aspect-square"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import placeholderImage from '../../assets/placeholder-img.jpg';
</script>
