<template>
    <Navbar />
    <slot />
    <Footer />
</template>

<script setup lang="ts">
import Footer from './auth/Footer.vue';
import Navbar from './auth/Navbar.vue';
</script>
