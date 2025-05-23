<template>
    <div class="flex flex-col lg:flex-row min-h-screen">
        <!-- Partie gauche - Formulaire -->
        <div
            class="w-full lg:w-1/2 flex flex-col order-1 lg:order-1 py-8 lg:py-0"
        >
            <div class="flex-grow flex flex-col justify-center lg:px-8">
                <div
                    class="progress-container mb-10 max-w-md mx-auto w-full mt-4 lg:mt-0"
                >
                    <div class="h-1.5 bg-gray overflow-hidden mb-3">
                        <div
                            class="h-full bg-secondary transition-all duration-700 ease-in-out"
                            :style="{
                                width: `${((currentStep + 1) / steps.length) * 100}%`
                            }"
                        ></div>
                    </div>

                    <span class="font-medium text-sm"
                        >Étape {{ currentStep + 1 }}/{{ steps.length }}</span
                    >
                </div>

                <!-- Formulaire par étapes -->
                <div v-if="currentStep === 0">
                    <ProductGeneralInfo
                        ref="generalInfoRef"
                        @valid-form="stepValid = $event"
                    />
                </div>

                <div v-else-if="currentStep === 1">
                    <ProductDescription
                        ref="descriptionRef"
                        @valid-form="stepValid = $event"
                    />
                </div>

                <div v-else-if="currentStep === 2">
                    <WarehousePickup
                        ref="warehousePickupRef"
                        @valid-form="stepValid = $event"
                    />
                </div>

                <div v-else-if="currentStep === 3">
                    <WarehouseAvailability
                        ref="warehouseAvailabilityRef"
                        @valid-form="stepValid = $event"
                    />
                </div>

                <div v-else-if="currentStep === 4">
                    <RegistrationConfirmation />
                </div>

                <!-- Navigation entre les étapes -->
                <div v-if="currentStep < 4" class="flex justify-end mt-8 mb-4">
                    <div class="flex space-x-4">
                        <button
                            v-if="currentStep > 0"
                            class="text-secondary hover:bg-secondary hover:text-primary px-6 py-2 border transition-colors"
                            @click="previousStep"
                        >
                            Précédent
                        </button>

                        <button
                            :disabled="!stepValid"
                            :class="[
                                'px-6 py-2 text-primary transition-colors',
                                stepValid
                                    ? 'bg-secondary'
                                    : 'bg-secondary cursor-not-allowed'
                            ]"
                            @click="nextStep"
                        >
                            {{
                                currentStep === steps.length - 2
                                    ? 'Terminer'
                                    : 'Suivant'
                            }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Partie droite - Image -->
        <div
            class="w-full lg:w-1/2 h-80 lg:h-auto bg-primary order-2 lg:order-2"
        >
            <img
                src="../assets/images/musical-instruments.jpg"
                alt="Instruments de musique"
                class="h-full w-full object-cover"
                onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1770&auto=format&fit=crop';"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductGeneralInfo from '../components/product-sale/ProductGeneralInfo.vue';
import ProductDescription from '../components/product-sale/ProductDescription.vue';
import WarehousePickup from '../components/product-sale/WarehousePickup.vue';
import WarehouseAvailability from '../components/product-sale/WarehouseAvailability.vue';
import RegistrationConfirmation from '../components/product-sale/RegistrationConfirmation.vue';

const currentStep = ref(0);
const stepValid = ref(false);
const generalInfoRef = ref(null);
const descriptionRef = ref(null);
const warehousePickupRef = ref(null);
const warehouseAvailabilityRef = ref(null);

const steps = [
    'Informations générales',
    'Description',
    'Lieu de collecte',
    'Disponibilité',
    'Confirmation'
];

const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++;
        stepValid.value = false;
    }
};

const previousStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
        stepValid.value = true;
    }
};
</script>

<style scoped>
.progress-container {
    max-width: 100%;
}

/* Animation pour transition entre les étapes */
@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.3);
    }

    100% {
        transform: scale(1);
    }
}

.scale-125 {
    animation: pulse 0.5s ease-in-out;
}
</style>
