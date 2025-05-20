<template>
    <div class="min-h-screen max-h-screen font-sans antialiased" :class="{
        'overflow-hidden': isOverflowHidden,
        'overflow-auto': !isOverflowHidden
    }">
        <ContainerLayout>
            <div
                class="w-full px-6 sm:px-8 lg:px-10 mx-auto sm:max-w-[1200px] md:max-w-[1400px] lg:max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2000px]">
                <router-view />
            </div>
        </ContainerLayout>
    </div>
</template>

<script setup lang="ts">
import ContainerLayout from './layouts/AppContainerLayout.vue';
import { useOverflow } from './composables/overflow';

const { isOverflowHidden } = useOverflow();
</script>
