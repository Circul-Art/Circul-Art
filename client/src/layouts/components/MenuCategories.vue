<template>
    <div @mouseenter="openMenu" @mouseleave="closeMenu">
        <button
            class="flex items-center justify-center gap-1 cursor-pointer relative"
            @focus="openMenu"
            @focusout="closeMenu"
        >
            <span class="text-on-primary whitespace-nowrap">Catégories</span>
            <span>
                <img v-flip-vertical="isMenuOpen" :src="chevron" />
            </span>
            <div
                class="absolute w-full top-0 left-0"
                :class="isMenuOpen ? 'h-[calc(100%+2rem)]' : 'h-full'"
            ></div>
        </button>
        <section v-if="isMenuOpen" class="absolute top-0 left-0 w-full mt-14">
            <div
                class="bg-primary border-b border-on-primary shadow-lg z-50"
                :class="isMenuProceedClosing ? 'animation' : 'animation'"
            >
                <div
                    class="flex flex-row mx-auto container mb-8 px-6 sm:px-8 lg:px-10"
                >
                    <div class="mr-16">
                        <h3 class="text-sm font-semibold mb-4">Catégories</h3>
                        <nav>
                            <ul class="flex flex-col gap-4">
                                <li
                                    v-for="category in categoriesMock"
                                    :key="slugify(category.name)"
                                >
                                    <router-link
                                        :to="`/${slugify(category.name)}`"
                                        class="flex items-center"
                                    >
                                        <span
                                            class="text-on-primary first-letter:uppercase"
                                        >
                                            {{ category.name }}
                                        </span>
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
                            <div class="flex-1">
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
                            <div class="flex-1">
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
                            <div class="flex-1">
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
                            <div class="flex-1">
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
                            <div class="flex-1">
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
                            <div class="flex-1">
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
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import placeholderImage from '../../assets/placeholder-img.jpg';
import chevron from '../../assets/chevron.svg';
import { categoriesMock } from '../../mock/categories.mock';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { slugify } from '../../lib/utils';

const isMenuOpen = ref(false);
const isMenuProceedClosing = ref(false);

function openMenu() {
    isMenuOpen.value = true;
    isMenuProceedClosing.value = false;
}

function closeMenu() {
    isMenuProceedClosing.value = true;
    setTimeout(() => {
        if (isMenuProceedClosing.value) {
            isMenuOpen.value = false;
        }
    }, 350);
}

const route = useRoute();

watch(route, () => {
    isMenuOpen.value = false;
});
</script>
