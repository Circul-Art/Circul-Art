<template>
    <router-link
        to="/login"
        class="bg-primary border-on-primary border px-5 py-2"
        :class="isMenuMobile ? 'block w-full' : 'hidden lg:flex'"
    >
        <span class="whitespace-nowrap text-on-primary"> Se connecter </span>
    </router-link>
    <router-link
        to="/register"
        class="bg-secondary border-secondary border px-5 py-2"
        :class="isMenuMobile ? 'block w-full' : 'hidden lg:flex'"
    >
        <span class="whitespace-nowrap text-on-secondary">
            Créer un compte
        </span>
    </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    isMenuMobile: boolean;
}>();
</script>
