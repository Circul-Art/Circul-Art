<template>
    <Navbar />
    <slot />
    <Footer />
</template>

<script setup lang="ts">
import Navbar from './visitor/Navbar.vue';
import Footer from './visitor/Footer.vue';
</script>
