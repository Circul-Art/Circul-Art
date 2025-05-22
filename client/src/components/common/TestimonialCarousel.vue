<template>
    <div class="testimonial-carousel text-center max-w-md w-full">
        <div class="text-2xl mb-2">★★★★★</div>

        <carousel
            :items-to-show="1"
            :wrap-around="true"
            :autoplay="autoplayInterval"
            :transition="500"
            snap-align="center"
        >
            <slide
                v-for="(testimonial, index) in testimonialsList"
                :key="index"
            >
                <div class="px-4 py-2">
                    <blockquote class="text-lg font-semibold mb-6">
                        "{{ testimonial.quote }}"
                    </blockquote>
                    <div class="flex items-center justify-center mb-2 gap-2">
                        <div class="w-10 h-10 rounded-full overflow-hidden">
                            <img
                                v-if="testimonial.avatar"
                                :src="testimonial.avatar"
                                :alt="testimonial.name"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="text-left text-sm">
                            <div class="font-medium">
                                {{ testimonial.name }}
                            </div>
                            <div>
                                {{ testimonial.role }}
                            </div>
                        </div>
                    </div>
                </div>
            </slide>

            <template #addons>
                <div class="flex items-center justify-center gap-4 mt-4">
                    <navigation class="flex items-center gap-2">
                        <template #prev>
                            <button class="carousel-nav">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-chevron-left"
                                >
                                    <polyline
                                        points="15 18 9 12 15 6"
                                    ></polyline>
                                </svg>
                            </button>
                        </template>
                        <template #next>
                            <button class="carousel-nav">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-chevron-right"
                                >
                                    <polyline
                                        points="9 18 15 12 9 6"
                                    ></polyline>
                                </svg>
                            </button>
                        </template>
                    </navigation>
                    <pagination />
                </div>
            </template>
        </carousel>
    </div>
</template>

<script setup lang="ts">
import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { computed } from 'vue';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    avatar?: string;
}

const props = defineProps({
    testimonials: {
        type: Array as () => Testimonial[],
        default: () => []
    },
    autoplayInterval: {
        type: Number,
        default: 6000
    },
    useDefaultTestimonials: {
        type: Boolean,
        default: true
    }
});

// Témoignages par défaut
const defaultTestimonials = [
    {
        quote: 'Un service vraiment pratique pour les professionnels de la culture ! Bravo pour cette belle initiative !',
        name: 'Claire M.',
        role: 'Régisseuse Théâtre',
        avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    {
        quote: "Grâce à Circul'Art, nous avons pu trouver des matériaux récupérés pour notre exposition éphémère à moindre coût.",
        name: 'Thomas R.',
        role: 'Scénographe',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
    },
    {
        quote: "Je recommande cette plateforme à tous mes collègues du secteur culturel. C'est une ressource incontournable pour une démarche écoresponsable.",
        name: 'Sophie L.',
        role: 'Directrice de festival',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
        quote: "Une plateforme intuitive qui m'a aidée à trouver rapidement les matériaux dont j'avais besoin pour mon installation artistique.",
        name: 'Amélie F.',
        role: 'Artiste plasticienne',
        avatar: 'https://randomuser.me/api/portraits/women/89.jpg'
    },
    {
        quote: "Circul'Art a transformé notre façon de concevoir nos décors. Plus écologique et plus économique !",
        name: 'Jean P.',
        role: 'Décorateur',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
];

// Utilisez les témoignages fournis en props ou les témoignages par défaut
const testimonialsList = computed(() => {
    if (props.testimonials && props.testimonials.length > 0) {
        return props.testimonials;
    }
    if (props.useDefaultTestimonials) {
        return defaultTestimonials;
    }
    return [];
});
</script>

<style scoped>
/* Personnalisation du carrousel */
:deep(.carousel__pagination) {
    padding: 0;
    margin-top: 0.5rem;
}

:deep(.carousel__pagination-button) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d1d5db;
    /* gray-300 */
}

:deep(.carousel__pagination-button--active) {
    background-color: #000;
    /* black */
}

:deep(.carousel__slide) {
    padding: 0;
}

:deep(.carousel__viewport) {
    perspective: 2000px;
}

.carousel-nav {
    margin: 0 10px;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.3s;
}
</style>
