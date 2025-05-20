<template>
    <component :is="$route.meta.layoutComponent">
        <main>
            <slot />
        </main>
    </component>
</template>

<script setup lang="ts"></script>
