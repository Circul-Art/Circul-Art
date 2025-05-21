<template>
    <Navbar>
        <template #navbar-actions>
            <NavbarActions :is-menu-mobile="false" />
        </template>
        <template #navbar-mobile-actions>
            <NavbarActions :is-menu-mobile="true" />
        </template>
    </Navbar>
    <slot />
    <Footer />
</template>

<script setup lang="ts">
import NavbarActions from './components/auth/NavbarActions.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>
