<template>
    <Navbar />
    <slot />
    <Footer />
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
import Navbar from './visitor/Navbar.vue';
</script>
