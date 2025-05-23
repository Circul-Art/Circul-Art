<template>
    <div class="product-general-info w-full">
        <h2 class="text-3xl font-bold mb-6">
            Informations générales sur le matériel
        </h2>

        <div class="space-y-4">
            <InputForm
                v-model="productName"
                label-value="Nom du matériel"
                input-name="name"
                placeholder="Ex: Perceuse électrique"
                :error-state="false"
            />

            <InputForm
                v-model="brand"
                label-value="Marque"
                input-name="brand"
                placeholder="Ex: Bosch"
                :error-state="false"
            />

            <InputForm
                v-model="model"
                label-value="Modèle"
                input-name="model"
                placeholder="Ex: PSB 700-2 RE"
                :error-state="false"
            />

            <SelectForm
                v-model="category"
                label-value="Catégorie"
                input-name="category"
                :error-state="false"
            >
                <option value="" disabled>Choisir...</option>
                <option value="outils">Outils & Bricolage</option>
                <option value="jardinage">Jardinage</option>
                <option value="cuisiner">Cuisine</option>
                <option value="sport">Sport & Loisirs</option>
                <option value="multimedia">Multimedia</option>
                <option value="autres">Autres</option>
            </SelectForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import InputForm from '../form/InputForm.vue';
import SelectForm from '../form/SelectForm.vue';

const productName = ref('');
const brand = ref('');
const model = ref('');
const category = ref('');

// Vérifier si le formulaire est valide
const emit = defineEmits(['valid-form']);

const checkFormValidity = () => {
    const isValid =
        productName.value.trim() !== '' &&
        brand.value.trim() !== '' &&
        model.value.trim() !== '' &&
        category.value !== '';
    emit('valid-form', isValid);
};

// Surveiller les changements dans le formulaire
watch([productName, brand, model, category], () => {
    checkFormValidity();
});

onMounted(() => {
    checkFormValidity();
});
</script>
