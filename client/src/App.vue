<template>
    <div
        id="scrollable-container"
        class="min-h-screen max-h-screen font-sans antialiased"
        :class="{
            'overflow-hidden': isOverflowHidden,
            'overflow-auto': !isOverflowHidden
        }"
    >
        <ContainerLayout>
            <div class="w-full px-6 sm:px-8 lg:px-10 mx-auto container">
                <router-view />
            </div>
        </ContainerLayout>
    </div>
</template>

<script setup lang="ts">
import ContainerLayout from './layouts/AppContainerLayout.vue';
import { useOverflow } from './composables/useOverflow';

const { isOverflowHidden } = useOverflow();
</script>
