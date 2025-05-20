<template>
    <Navbar />
    <slot />
    <Footer />
</template>

<script setup lang="ts">
import Footer from './error/Footer.vue';
import Navbar from './error/Navbar.vue';
</script>
