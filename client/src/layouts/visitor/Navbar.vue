<template>
    <header
        class="bg-primary sticky top-0 z-50"
        :class="isMenuMobileOpen ? 'h-screen' : 'h-auto'"
    >
        <div class="p-4 flex flex-col h-full">
            <div class="flex flex-row justify-between items-center">
                <div class="flex justify-center items-center h-8">
                    <div
                        class="lg:mr-8 h-full flex items-center justify-center w-auto"
                    >
                        <img :src="logo" alt="Logo" />
                    </div>
                    <nav class="hidden lg:flex justify-center">
                        <ul class="flex space-x-4">
                            <li class="mr-8">
                                <router-link
                                    to="/"
                                    class="flex items-center"
                                    active-class="font-semibold"
                                >
                                    <span class="text-on-primary">Accueil</span>
                                </router-link>
                            </li>
                            <li class="mr-8">
                                <router-link
                                    to="/location"
                                    class="flex items-center"
                                >
                                    <span class="text-on-primary"
                                        >Louer matériel</span
                                    >
                                </router-link>
                            </li>
                            <li class="mr-8">
                                <router-link
                                    to="/vente"
                                    class="flex items-center"
                                >
                                    <span class="text-on-primary"
                                        >Vendre matériel</span
                                    >
                                </router-link>
                            </li>
                            <li>
                                <button
                                    class="flex items-center justify-center gap-1 cursor-pointer"
                                    @click="toggleMenuCategories"
                                >
                                    <span class="text-on-primary"
                                        >Catégories</span
                                    >
                                    <span>
                                        <img
                                            v-flip-vertical="
                                                !isMenuCategoriesOpen
                                            "
                                            :src="chevron"
                                        />
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="flex justify-end gap-4">
                    <button
                        class="hidden lg:block bg-primary text-on-primary border-on-primary border px-5 py-2 cursor-pointer"
                    >
                        Se connecter
                    </button>
                    <button
                        class="hidden lg:block bg-secondary text-on-secondary border-secondary border px-5 py-2 cursor-pointer"
                    >
                        Créer un compte
                    </button>
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
                    <button
                        class="block w-full bg-primary text-on-primary border-on-primary border px-5 py-2 cursor-pointer"
                    >
                        Se connecter
                    </button>
                    <button
                        class="block w-full bg-secondary text-on-secondary border-secondary border px-5 py-2 cursor-pointer"
                    >
                        Créer un compte
                    </button>
                </div>
            </div>
            <div v-if="isMenuCategoriesOpen" class="hidden lg:block mt-8">
                <div class="flex flex-row">
                    <div class="mr-16">
                        <p class="text-sm font-semibold mb-4">Catégories</p>
                        <nav>
                            <ul class="flex flex-col gap-4">
                                <li>
                                    <router-link
                                        to="/categories/cinema"
                                        class="flex items-center"
                                    >
                                        <span class="text-on-primary"
                                            >Cinéma</span
                                        >
                                    </router-link>
                                </li>
                                <li>
                                    <router-link
                                        to="/categories/theatre"
                                        class="flex items-center"
                                    >
                                        <span class="text-on-primary"
                                            >Théâtre</span
                                        >
                                    </router-link>
                                </li>
                                <li>
                                    <router-link
                                        to="/categories/danse"
                                        class="flex items-center"
                                    >
                                        <span class="text-on-primary"
                                            >Danse</span
                                        >
                                    </router-link>
                                </li>
                                <li>
                                    <router-link
                                        to="/categories/musique"
                                        class="flex items-center"
                                    >
                                        <span class="text-on-primary"
                                            >Musique</span
                                        >
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div
                        class="grid grid-cols-2 grid-rows-3 gap-4 xl:gap-16 flex-1 p-4"
                    >
                        <article class="flex flex-row items-center gap-2">
                            <div class="min-h-26 min-w-40 mr-4 w-1/3 h-auto">
                                <img
                                    :src="placeholderImage"
                                    alt="Placeholder"
                                    class="w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 class="text-base font-bold">
                                    Les meilleurs locations
                                </h3>
                                <p class="text-sm">
                                    Retrouvez les équipements les plus loués du
                                    mois, les coups de cœur des utilisateurs et
                                    le matériel ayant reçu les meilleures notes
                                </p>
                                <router-link to="/locations">
                                    <span
                                        class="text-on-primary underline text-sm"
                                    >
                                        Découvrir
                                    </span>
                                </router-link>
                            </div>
                        </article>
                        <article class="flex flex-row items-center gap-2">
                            <div class="min-h-26 min-w-40 mr-4 w-1/3 h-auto">
                                <img
                                    :src="placeholderImage"
                                    alt="Placeholder"
                                    class="w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 class="text-base font-bold">
                                    Les accessoires complémentaires
                                </h3>
                                <p class="text-sm">
                                    Retrouvez tous les câbles, housses,
                                    supports, etc. Ainsi que le matériel "petit
                                    format" mais indispensable
                                </p>
                                <router-link to="/locations">
                                    <span
                                        class="text-on-primary underline text-sm"
                                    >
                                        Découvrir
                                    </span>
                                </router-link>
                            </div>
                        </article>
                        <article class="flex flex-row items-center gap-2">
                            <div class="min-h-26 min-w-40 mr-4 w-1/3 h-auto">
                                <img
                                    :src="placeholderImage"
                                    alt="Placeholder"
                                    class="w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 class="text-base font-bold">
                                    Les nouveautés
                                </h3>
                                <p class="text-sm">
                                    Retrouvez les derniers matériels ajoutés à
                                    la location et les nouveaux équipements
                                    disponibles
                                </p>
                                <router-link to="/locations">
                                    <span
                                        class="text-on-primary underline text-sm"
                                    >
                                        Découvrir
                                    </span>
                                </router-link>
                            </div>
                        </article>
                        <article class="flex flex-row items-center gap-2">
                            <div class="min-h-26 min-w-40 mr-4 w-1/3 h-auto">
                                <img
                                    :src="placeholderImage"
                                    alt="Placeholder"
                                    class="w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 class="text-base font-bold">
                                    Le matériel événementiel
                                </h3>
                                <p class="text-sm">
                                    Retrouvez tout le matériel pour la
                                    sonorisation, l’éclairage, la structure de
                                    scène ainsi que le matériel pour les
                                    concerts, festivals et spectacles
                                </p>
                                <router-link to="/locations">
                                    <span
                                        class="text-on-primary underline text-sm"
                                    >
                                        Découvrir
                                    </span>
                                </router-link>
                            </div>
                        </article>
                        <article class="flex flex-row items-center gap-2">
                            <div class="min-h-26 min-w-40 mr-4 w-1/3 h-auto">
                                <img
                                    :src="placeholderImage"
                                    alt="Placeholder"
                                    class="w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 class="text-base font-bold">
                                    Les offres spéciales
                                </h3>
                                <p class="text-sm">
                                    Retrouvez les promotions temporaires, les
                                    réductions sur certaines locations et les
                                    locations longue durée avantageuses
                                </p>
                                <router-link to="/locations">
                                    <span
                                        class="text-on-primary underline text-sm"
                                    >
                                        Découvrir
                                    </span>
                                </router-link>
                            </div>
                        </article>
                        <article class="flex flex-row items-center gap-2">
                            <div class="min-h-26 min-w-40 mr-4 w-1/3 h-auto">
                                <img
                                    :src="placeholderImage"
                                    alt="Placeholder"
                                    class="w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 class="text-base font-bold">
                                    Le matériel disponible rapidement
                                </h3>
                                <p class="text-sm">
                                    Retrouvez tous les équipements pouvant être
                                    retirés en moins de 24h
                                </p>
                                <router-link to="/locations">
                                    <span
                                        class="text-on-primary underline text-sm"
                                    >
                                        Découvrir
                                    </span>
                                </router-link>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import logo from '../../assets/logo.svg';
import burger from '../../assets/burger.svg';
import xmark from '../../assets/xmark.svg';
import chevron from '../../assets/chevron.svg';
import { ref } from 'vue';
import { useOverflow } from '../../composables/overflow';
import placeholderImage from '../../assets/placeholder-img.jpg';

const isMenuMobileOpen = ref(false);
const isMenuCategoriesOpen = ref(false);
const { setOverflow } = useOverflow();

function toggleMenuMobile() {
    isMenuMobileOpen.value = !isMenuMobileOpen.value;
    setOverflow(isMenuMobileOpen.value);
}

function toggleMenuCategories() {
    isMenuCategoriesOpen.value = !isMenuCategoriesOpen.value;
}
</script>
