<template>
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30">
        Navbar error
    </header>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue';

const profileMenuOpen = ref(false);
const profileMenuContainer = ref<HTMLElement | null>(null);

// Ferme le menu si on clique ailleurs sur la page
function handleClickOutside(event: MouseEvent) {
    if (
        profileMenuOpen.value &&
        profileMenuContainer.value &&
        !profileMenuContainer.value.contains(event.target as Node)
    ) {
        profileMenuOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style>
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slideIn {
    animation: slideIn 0.2s ease-out forwards;
}
</style>
