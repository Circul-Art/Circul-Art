<template>
    <div class="flex flex-row gap-3">
        <router-link
            to="/favorites"
            class="justify-center items-center mr-3"
            :class="isMenuMobile ? 'flex' : 'hidden lg:flex'"
        >
            <InlineSvg :src="heart" />
        </router-link>
        <router-link
            to="/account"
            class="justify-center items-center mr-3"
            :class="isMenuMobile ? 'flex' : 'hidden lg:flex'"
        >
            <InlineSvg :src="user" />
        </router-link>
        <router-link
            to="/orders"
            class="justify-center items-center"
            :class="isMenuMobile ? 'flex' : 'hidden lg:flex'"
        >
            <InlineSvg :src="shoppingbag" />
        </router-link>
    </div>
</template>

<script setup lang="ts">
import heart from '../../../assets/heart.svg';
import user from '../../../assets/user.svg';
import shoppingbag from '../../../assets/shopping-bag.svg';
import { defineProps } from 'vue';

defineProps<{
    isMenuMobile: boolean;
}>();
</script>
