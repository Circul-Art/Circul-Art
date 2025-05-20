<template>
    <div
        class="min-h-screen max-h-screen font-sans antialiased"
        :class="{
            'overflow-hidden': isOverflowHidden,
            'overflow-auto': !isOverflowHidden
        }"
    >
        <ContainerLayout>
            <router-view />
        </ContainerLayout>
    </div>
</template>

<script setup lang="ts">
import ContainerLayout from './layouts/AppContainerLayout.vue';
import { useOverflow } from './composables/overflow';

const { isOverflowHidden } = useOverflow();
</script>
