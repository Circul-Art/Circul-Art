<template>
    <Navbar>
        <template #navbar-actions>
            <NavbarActions :is-menu-mobile="false" />
        </template>
        <template #navbar-mobile-actions>
            <NavbarActions :is-menu-mobile="true" />
        </template>
    </Navbar>
    <Breadcrumb v-if="!$route.meta.hideBreadcrumb" />
    <slot />
    <Footer />
</template>

<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import NavbarActions from './components/visitor/NavbarActions.vue';
</script>
