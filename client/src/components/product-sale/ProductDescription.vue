<template>
    <div class="product-description w-full">
        <div class="space-y-4">
            <SelectForm
                v-model="condition"
                label-value="État du matériel"
                input-name="condition"
                :error-state="false"
            >
                <option value="" disabled>Sélectionnez l'état</option>
                <option value="comme_neuf">Comme neuf</option>
                <option value="tres_bon">Très bon état</option>
                <option value="bon">Bon état</option>
                <option value="satisfaisant">État satisfaisant</option>
                <option value="a_reparer">À réparer</option>
            </SelectForm>

            <TextareaForm
                v-model="description"
                label-value="Description détaillée"
                input-name="description"
                :rows="5"
                placeholder="Décrivez le matériel, ses caractéristiques, son utilisation, etc."
                :error-state="false"
            />

            <div class="form-group">
                <div class="flex justify-center">
                    <input
                        ref="fileInput"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        multiple
                        @change="handleFileUpload"
                    />

                    <button
                        type="button"
                        class="text-secondary hover:bg-secondary hover:text-primary px-6 py-2 border transition-colors flex items-center"
                        @click="$refs.fileInput.click()"
                    >
                        Télécharger des photos
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    v-if="imagePreviewUrls.length > 0"
                    class="mt-4 grid grid-cols-3 gap-3"
                >
                    <div
                        v-for="(url, index) in imagePreviewUrls"
                        :key="index"
                        class="relative"
                    >
                        <img
                            :src="url"
                            class="w-full h-32 object-cover border"
                        />
                        <button
                            class="absolute top-1 right-1 bg-primary text-secondary border border-secondary rounded-full p-0 w-6 h-6 flex items-center justify-center"
                            @click="removeImage(index)"
                        >
                            <span class="text-sm leading-none relative -top-px"
                                >×</span
                            >
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import SelectForm from '../form/SelectForm.vue';
import TextareaForm from '../form/TextareaForm.vue';

const condition = ref('');
const description = ref('');
const imagePreviewUrls = ref<string[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits(['valid-form']);

const checkFormValidity = () => {
    const isValid = condition.value !== '' && description.value.trim() !== '';
    emit('valid-form', isValid);
};

watch([condition, description], () => {
    checkFormValidity();
});

const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);

    files.forEach((file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    imagePreviewUrls.value.push(e.target.result as string);
                    checkFormValidity(); // Vérifier la validité après ajout d'image
                }
            };
            reader.readAsDataURL(file);
        }
    });
};

const removeImage = (index: number) => {
    imagePreviewUrls.value.splice(index, 1);
    checkFormValidity(); // Vérifier la validité après suppression d'image
};

onMounted(() => {
    checkFormValidity();
});
</script>
