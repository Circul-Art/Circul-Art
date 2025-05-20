<template>
    <section class="py-12 relative">
        <div
            class="relative text-white py-24 2xl:py-36 overflow-hidden min-h-[400px] 2xl:min-h-[600px]"
        >
            <div class="absolute inset-0 w-full h-full">
                <carousel
                    :items-to-show="1"
                    :wrap-around="true"
                    :autoplay="autoplayInterval"
                    :transition="1000"
                    :pause-autoplay-on-hover="false"
                    class="h-full"
                >
                    <slide
                        v-for="(image, index) in images"
                        :key="index"
                        class="h-full"
                    >
                        <div class="w-full h-full">
                            <img
                                :src="image"
                                :alt="`Background image ${index + 1}`"
                                class="w-full h-full object-cover"
                            />
                            <div
                                class="absolute inset-0 bg-black opacity-50"
                            ></div>
                        </div>
                    </slide>
                </carousel>
            </div>

            <div
                class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10"
            >
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-4xl md:text-5xl font-bold mb-6">
                        La créativité commence par des choix responsables.
                    </h1>
                    <p class="text-lg md:text-xl mb-8 leading-relaxed">
                        Nous vous offrons une plateforme dédiée à la location et
                        à la vente de matériel scénique et de production, pensée
                        pour les professionnels de la culture. Avec des
                        équipements de qualité, accessibles et durables, nous
                        vous aidons à donner vie à vos projets tout en
                        contribuant à une économie circulaire.
                    </p>
                    <div class="flex justify-center gap-4">
                        <button
                            class="bg-white text-gray-800 px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
                        >
                            Louer
                        </button>
                        <button
                            class="text-white hover:bg-white hover:text-gray-800 px-8 py-3 font-medium border border-white transition-colors"
                        >
                            Vendre
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { onMounted, ref } from 'vue';

const images = ref([
    'https://picsum.photos/id/1071/1200/600', // Equipment
    'https://picsum.photos/id/1073/1200/600', // Theater
    'https://picsum.photos/id/1057/1200/600', // Stage
    'https://picsum.photos/id/146/1200/600', // Event
    'https://picsum.photos/id/1082/1200/600' // Performance
]);

const props = defineProps({
    backgroundImages: {
        type: Array as () => string[],
        default: () => []
    },
    autoplayInterval: {
        type: Number,
        default: 5000
    }
});

onMounted(() => {
    if (props.backgroundImages && props.backgroundImages.length > 0) {
        images.value = props.backgroundImages;
    }
});
</script>

<style scoped>
:deep(.carousel__slide) {
    padding: 0;
    height: 100%;
    overflow: hidden;
}

:deep(.carousel__viewport) {
    height: 100%;
}

:deep(.carousel__track) {
    height: 100%;
}

:deep(.carousel__item) {
    height: 100%;
}

:deep(.carousel__pagination) {
    display: none;
}

:deep(.carousel) {
    height: 100%;
}
</style>
