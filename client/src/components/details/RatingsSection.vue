<template>
    <section class="flex flex-col justify-center items-center mb-4">
        <hgroup class="text-center mb-4">
            <h2 class="mb-2">Avis clients</h2>
            <p class="text-sm">14 avis vérifiés sur les 24 derniers mois.</p>
        </hgroup>
        <ul
            class="flex flex-col flex-wrap md:flex-row justify-center items-center gap-8"
        >
            <RatingCard />
            <RatingCard />
            <RatingCard />
            <RatingCard />
            <RatingCard />
        </ul>
    </section>
</template>

<script setup lang="ts">
import RatingCard from './RatingCard.vue';
</script>
