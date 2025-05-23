<template>
    <header
        class="bg-primary sticky top-0 z-50"
        :class="isMenuMobileOpen ? 'h-screen' : 'h-auto'"
    >
        <div class="py-4 flex flex-col h-full mx-auto container px-4">
            <div class="flex flex-row justify-between items-center">
                <div class="flex justify-center items-center h-8">
                    <router-link
                        to="/"
                        class="lg:mr-6 xl:mr-8 h-full flex items-center justify-center w-auto"
                    >
                        <img :src="logo" alt="Logo" />
                    </router-link>
                    <nav class="hidden lg:flex justify-center">
                        <ul class="flex space-x-4">
                            <li class="mr-6 xl:mr-8">
                                <router-link
                                    to="/"
                                    class="flex items-center"
                                    active-class="font-semibold"
                                >
                                    <span
                                        class="text-on-primary whitespace-nowrap"
                                        >Accueil</span
                                    >
                                </router-link>
                            </li>
                            <li class="mr-6 xl:mr-8">
                                <router-link
                                    to="/location"
                                    class="flex items-center"
                                >
                                    <span
                                        class="text-on-primary whitespace-nowrap"
                                        >Louer matériel</span
                                    >
                                </router-link>
                            </li>
                            <li class="mr-6 xl:mr-8">
                                <router-link
                                    to="/sell-product"
                                    class="flex items-center"
                                >
                                    <span
                                        class="text-on-primary whitespace-nowrap"
                                        >Vendre matériel</span
                                    >
                                </router-link>
                            </li>
                            <li>
                                <MenuCategories />
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="flex justify-end gap-4">
                    <slot name="navbar-actions" />
                    <button class="block lg:hidden" @click="toggleMenuMobile">
                        <img
                            v-if="!isMenuMobileOpen"
                            :src="burger"
                            alt="Ouvrir le menu mobile"
                        />
                        <img v-else :src="xmark" alt="Fermer le menu mobile" />
                    </button>
                </div>
            </div>
            <div v-if="isMenuMobileOpen" class="lg:hidden mt-6 flex-1">
                <p class="text-sm font-semibold mb-4">Catégories</p>
                <nav>
                    <ul class="flex flex-col gap-4">
                        <li>
                            <router-link
                                to="/categories/cinema"
                                class="flex items-center"
                            >
                                <span class="text-on-primary">Cinéma</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/categories/theatre"
                                class="flex items-center"
                            >
                                <span class="text-on-primary">Théâtre</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/categories/danse"
                                class="flex items-center"
                            >
                                <span class="text-on-primary">Danse</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/categories/musique"
                                class="flex items-center"
                            >
                                <span class="text-on-primary">Musique</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
                <div class="mt-4 flex flex-col gap-4">
                    <slot name="navbar-mobile-actions" />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import logo from '../../assets/logo.svg';
import burger from '../../assets/burger.svg';
import xmark from '../../assets/xmark.svg';
import { ref } from 'vue';
import { useOverflow } from '../../composables/overflow';
import MenuCategories from './MenuCategories.vue';

const isMenuMobileOpen = ref(false);
const { setOverflow } = useOverflow();

function toggleMenuMobile() {
    isMenuMobileOpen.value = !isMenuMobileOpen.value;
    setOverflow(isMenuMobileOpen.value);
}
</script>
