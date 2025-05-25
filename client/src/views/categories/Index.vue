<template>
    <section class="flex flex-col sm:flex-row my-10">
        <div class="flex flex-col gap-5 mb-10 mx-4 sm:my-auto sm:w-1/2">
            <h1 class="font-bold text-4xl">
                Découvrez tout notre équipement pour
                {{ category.ARTICLE_DEF }} {{ category.NAME }}
            </h1>
            <p>{{ category.HERO_PARAGRAPH }}</p>
            <div class="flex flex-row gap-4">
                <router-link
                    class="bg-secondary text-on-secondary py-3 px-6"
                    to="/voir-avec-margaux"
                >
                    Voir tout
                </router-link>
                <router-link
                    class="bg-primary text-on-primary py-3 px-6 border border-on-primary"
                    to="/contact"
                >
                    Contact
                </router-link>
            </div>
        </div>
        <div class="w-full h-auto aspect-square sm:w-1/2">
            <img
                :src="placeholderImage"
                alt=""
                srcset=""
                class="w-full h-full"
            />
        </div>
    </section>
    <section class="flex flex-col items-center mx-4 mb-10">
        <div class="hidden sm:block mb-6 w-full">
            <div class="flex flex-row justify-between">
                <button
                    class="flex flex-row items-center gap-2 border border-on-primary bg-primary py-2 px-5"
                >
                    <InlineSvg :src="filter" />
                    <span>Filtres</span>
                </button>
                <button class="flex flex-row items-center gap-2">
                    <span>Trier par</span>
                    <InlineSvg v-flip-vertical="false" :src="chevron" />
                </button>
            </div>
            <div></div>
        </div>
        <div class="mb-10">
            <ul
                class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
            >
                <li>
                    <article class="text-on-primary">
                        <router-link
                            :to="`categories/${category.URI}/products`"
                            class="flex flex-col justify-center items-center text-center"
                        >
                            <div class="aspect-square w-full h-auto mb-2">
                                <img
                                    :src="placeholderImage"
                                    alt=""
                                    class="w-full h-full"
                                />
                            </div>
                            <h3 class="text-base font-bold">
                                Guitare électrique Stratocaster
                            </h3>
                            <p class="text-sm mb-2">Fender</p>
                            <strong class="font-bold text-lg mb-2"
                                >25 €/jour</strong
                            >
                            <button
                                class="border border-on-primary bg-primary text-on-primary px-3 py-2 w-full"
                            >
                                Ajouter au panier
                            </button>
                        </router-link>
                    </article>
                </li>
                <li>
                    <article class="text-on-primary">
                        <router-link
                            :to="`categories/${category.URI}/products`"
                            class="flex flex-col justify-center items-center text-center"
                        >
                            <div class="aspect-square w-full h-auto mb-2">
                                <img
                                    :src="placeholderImage"
                                    alt=""
                                    class="w-full h-full"
                                />
                            </div>
                            <h3 class="text-base font-bold">
                                Guitare électrique Stratocaster
                            </h3>
                            <p class="text-sm mb-2">Fender</p>
                            <strong class="font-bold text-lg mb-2"
                                >25 €/jour</strong
                            >
                            <button
                                class="border border-on-primary bg-primary text-on-primary px-3 py-2 w-full"
                            >
                                Ajouter au panier
                            </button>
                        </router-link>
                    </article>
                </li>
                <li>
                    <article class="text-on-primary">
                        <router-link
                            :to="`categories/${category.URI}/products`"
                            class="flex flex-col justify-center items-center text-center"
                        >
                            <div class="aspect-square w-full h-auto mb-2">
                                <img
                                    :src="placeholderImage"
                                    alt=""
                                    class="w-full h-full"
                                />
                            </div>
                            <h3 class="text-base font-bold">
                                Guitare électrique Stratocaster
                            </h3>
                            <p class="text-sm mb-2">Fender</p>
                            <strong class="font-bold text-lg mb-2"
                                >25 €/jour</strong
                            >
                            <button
                                class="border border-on-primary bg-primary text-on-primary px-3 py-2 w-full"
                            >
                                Ajouter au panier
                            </button>
                        </router-link>
                    </article>
                </li>
                <li>
                    <article class="text-on-primary">
                        <router-link
                            :to="`categories/${category.URI}/products`"
                            class="flex flex-col justify-center items-center text-center"
                        >
                            <div class="aspect-square w-full h-auto mb-2">
                                <img
                                    :src="placeholderImage"
                                    alt=""
                                    class="w-full h-full"
                                />
                            </div>
                            <h3 class="text-base font-bold">
                                Guitare électrique Stratocaster
                            </h3>
                            <p class="text-sm mb-2">Fender</p>
                            <strong class="font-bold text-lg mb-2"
                                >25 €/jour</strong
                            >
                            <button
                                class="border border-on-primary bg-primary text-on-primary px-3 py-2 w-full"
                            >
                                Ajouter au panier
                            </button>
                        </router-link>
                    </article>
                </li>
            </ul>
        </div>
        <div>
            <button
                class="border border-on-primary bg-primary text-on-primary px-5 py-3"
            >
                Tout voir
            </button>
        </div>
    </section>
    <section class="px-4">
        <hgroup class="mb-10">
            <p class="font-bold first-letter:uppercase">{{ category.NAME }}</p>
            <h2 class="font-bold text-3xl mb-3">Contactez-nous</h2>
            <p>
                Pour toute question concernant le département
                {{ category.ARTICLE_PART }} {{ category.NAME }}
            </p>
        </hgroup>
        <div class="flex flex-col sm:flex-row sm:gap-16 lg:gap-32 xl:gap-48">
            <div class="sm:w-1/4">
                <div class="mb-8">
                    <div class="w-8 h-8 flex justify-center items-center">
                        <InlineSvg :src="mail" />
                    </div>
                    <h3 class="font-bold text-lg">Email</h3>
                    <p class="mb-2">Nous sommes là pour vous.</p>
                    <a
                        href="mailto:hello@relume.io"
                        class="underline hover:no-underline active:no-underline"
                        >hello@relume.io</a
                    >
                </div>
                <div class="mb-8">
                    <div class="w-8 h-8 flex justify-center items-center">
                        <InlineSvg :src="phone" />
                    </div>
                    <h3 class="font-bold text-lg">Téléhpone</h3>
                    <p class="mb-2">Appelez-nous pour plus d'infos.</p>
                    <a
                        href="tel:+1 (555) 000-0000"
                        class="underline hover:no-underline active:no-underline"
                        >+1 (555) 000-0000</a
                    >
                </div>
                <div class="mb-8">
                    <div class="w-8 h-8 flex justify-center items-center">
                        <InlineSvg :src="pin" />
                    </div>
                    <h3 class="font-bold text-lg">Bureau</h3>
                    <address class="mb-2">
                        123 Sample St, Sydney NSW 2000 AU
                    </address>
                    <a
                        href="https://www.google.com/maps/place/123+Sample+St,+Sydney+NSW+2000,+Australia"
                        target="_blank"
                        class="flex flex-row items-center gap-1 group"
                    >
                        <span>Obtenir l'itinéraire</span>
                        <InlineSvg :src="chevronright" />
                    </a>
                </div>
            </div>
            <div class="sm:w-3/4">
                <div class="w-full h-[400px] sm:h-full overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=3.054452538490296%2C50.62752057512932%2C3.0638771057128907%2C50.63093834570985&amp;layer=hot&amp;marker=50.62922750733361%2C3.0591723322868347"
                        style="filter: contrast(1.05) saturate(1.1)"
                        loading="lazy"
                        title="Localisation de nos bureaux à Lille"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { CategoriesRepository } from '../../repositories/categories.repository';
import placeholderImage from '../../assets/placeholder-img.jpg';
import { watch } from 'vue';
import { ref } from 'vue';
import mail from '../../assets/mail.svg';
import phone from '../../assets/phone.svg';
import pin from '../../assets/pin.svg';
import chevronright from '../../assets/chevron-right.svg';
import filter from '../../assets/filter.svg';
import chevron from '../../assets/chevron.svg';

const route = useRoute();
const router = useRouter();

const category = ref();

watch(
    () => route.params.category as string,
    (newCategory: string) => {
        category.value = CategoriesRepository.findCategoryByUri(newCategory);
        if (!category.value) {
            router.push({ name: 'NotFound' });
        }
    },
    { immediate: true }
);
</script>
