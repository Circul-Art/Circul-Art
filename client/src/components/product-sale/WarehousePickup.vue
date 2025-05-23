<template>
    <div class="warehouse-pickup w-full">
        <h2 class="text-3xl font-bold mb-6">Informations de retrait/dépôt</h2>

        <div class="space-y-4">
            <SelectForm
                v-model="pickupLocation"
                label-value="Lieu de collecte"
                input-name="pickup-location"
                :error-state="false"
            >
                <option value="" disabled selected>
                    Sélectionnez un lieu de collecte
                </option>
                <option
                    v-for="location in availableLocations"
                    :key="location.id"
                    :value="location.id"
                >
                    {{ location.name }} - {{ location.address }}
                </option>
            </SelectForm>

            <div v-if="pickupLocation && selectedLocation" class="mt-6">
                <h3 class="font-medium text-lg mb-2">
                    Informations sur l'entrepôt
                </h3>

                <div class="mb-4">
                    <p class="mb-1">
                        <strong>Adresse:</strong> {{ selectedLocation.address }}
                    </p>
                    <p class="mb-1">
                        <strong>Horaires:</strong> {{ selectedLocation.hours }}
                    </p>
                    <p class="mb-3">
                        <strong>Contact:</strong> {{ selectedLocation.contact }}
                    </p>
                </div>

                <!-- Carte OpenStreetMap -->
                <div class="w-full h-[300px] overflow-hidden border">
                    <iframe
                        width="100%"
                        height="100%"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        :src="`https://www.openstreetmap.org/export/embed.html?bbox=${selectedLocation.lng - 0.005}%2C${selectedLocation.lat - 0.002}%2C${selectedLocation.lng + 0.005}%2C${selectedLocation.lat + 0.002}&amp;layer=hot&amp;marker=${selectedLocation.lat}%2C${selectedLocation.lng}`"
                        style="filter: contrast(1.05) saturate(1.1)"
                        loading="lazy"
                        title="Localisation de l'entrepôt"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import SelectForm from '../form/SelectForm.vue';

interface Location {
    id: number;
    name: string;
    address: string;
    hours: string;
    contact: string;
    lat: number;
    lng: number;
}

// Définir pickupLocation comme une string car SelectForm peut traiter les valeurs comme des strings
const pickupLocation = ref('');

const availableLocations = ref<Location[]>([
    {
        id: 1,
        name: 'Entrepôt Paris Centre',
        address: '15 rue de la République, 75001 Paris',
        hours: 'Lun-Sam: 9h-18h',
        contact: '01 23 45 67 89',
        lat: 48.8566,
        lng: 2.3522
    },
    {
        id: 2,
        name: 'Entrepôt Paris Est',
        address: '42 avenue du Général Leclerc, 75020 Paris',
        hours: 'Lun-Ven: 10h-19h, Sam: 10h-17h',
        contact: '01 98 76 54 32',
        lat: 48.8646,
        lng: 2.411
    },
    {
        id: 3,
        name: 'Entrepôt Banlieue Sud',
        address: '8 rue des Acacias, 92120 Montrouge',
        hours: 'Lun-Ven: 9h-19h',
        contact: '01 45 67 89 10',
        lat: 48.8198,
        lng: 2.3195
    }
]);

// Utiliser computed pour obtenir l'entrepôt sélectionné
const selectedLocation = computed(() => {
    if (!pickupLocation.value) return null;

    // Convertir pickupLocation en nombre pour comparer avec les IDs
    const locationId = parseInt(pickupLocation.value, 10);

    return (
        availableLocations.value.find((loc) => loc.id === locationId) || null
    );
});

// Émettre l'événement de validation du formulaire
const emit = defineEmits(['valid-form']);

const checkFormValidity = () => {
    const isValid = !!pickupLocation.value;
    emit('valid-form', isValid);
};

// Observer les changements et vérifier la validité
watch(pickupLocation, () => {
    checkFormValidity();
});

onMounted(() => {
    checkFormValidity();
});
</script>
