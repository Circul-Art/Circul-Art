<template>
    <div class="registration-confirmation w-full">
        <h2 class="text-3xl font-bold mb-6">
            Votre demande a bien été effectuée !
        </h2>
        <p class="mb-8">
            Nous vous tiendrons au courant des prochaines étapes.
        </p>

        <button
            class="px-6 py-2 bg-secondary text-primary border"
            @click="goToHomePage"
        >
            Retourner à l'accueil
        </button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHomePage = () => {
    router.push('/');
};
</script>
