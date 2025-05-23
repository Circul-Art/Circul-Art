<template>
    <div class="warehouse-availability w-full">
        <div class="space-y-4">
            <div class="form-group">
                <label class="block mb-1"
                    >Sélectionnez vos disponibilités</label
                >

                <div class="relative mb-3">
                    <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <Datepicker
                        v-model="selectedDate"
                        :enable-time-picker="false"
                        :format="format"
                        :preview-format="format"
                        :min-date="new Date()"
                        :disabled-week-days="[0]"
                        placeholder="JJ/MM/AAAA"
                        locale="fr"
                        text-input
                        auto-apply
                        class="date-picker-custom"
                    />
                </div>

                <SelectForm
                    v-model="selectedTimeSlot"
                    label-value="Créneau horaire"
                    input-name="time-slot"
                    :error-state="false"
                >
                    <option value="" disabled>Sélectionnez un créneau</option>
                    <option value="morning">Matin (9h-12h)</option>
                    <option value="afternoon">Après-midi (14h-17h)</option>
                </SelectForm>
            </div>

            <div v-if="selectedDate && selectedTimeSlot" class="mt-4">
                <p class="mb-1">
                    <strong>Date sélectionnée:</strong>
                    {{ formatDate(selectedDate) }}
                </p>
                <p>
                    <strong>Créneau:</strong>
                    {{ formatTimeSlot(selectedTimeSlot) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import SelectForm from '../form/SelectForm.vue';

const selectedDate = ref<Date | null>(null);
const selectedTimeSlot = ref('');
const format = 'dd/MM/yyyy';

const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
};

const formatTimeSlot = (timeSlot: string) => {
    if (timeSlot === 'morning') return 'Matin (9h-12h)';
    if (timeSlot === 'afternoon') return 'Après-midi (14h-17h)';
    return '';
};

const emit = defineEmits(['valid-form']);

const checkFormValidity = () => {
    const isValid = !!selectedDate.value && !!selectedTimeSlot.value;
    emit('valid-form', isValid);
};

watch([selectedDate, selectedTimeSlot], () => {
    checkFormValidity();
});

onMounted(() => {
    checkFormValidity();
});
</script>

<style>
.date-picker-custom {
    width: 100%;
}

.date-picker-custom .dp__input {
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    width: 100%;
    border: 1px solid black;
    height: 42px;
    /* Hauteur standard pour correspondre aux autres inputs */
    font-size: 1rem;
    border-radius: 0;
    transition: border-color 0.2s ease;
}

.date-picker-custom .dp__input:focus {
    outline: none;
    border-color: var(--secondary-color);
}

/* Style du calendrier ouvert */
.date-picker-custom .dp__main {
    border: 1px solid #e2e8f0;
    border-radius: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.date-picker-custom .dp__action_buttons {
    display: none;
    /* Masquer les boutons car nous utilisons auto-apply */
}

.date-picker-custom .dp__today {
    border-color: var(--secondary-color);
}

.date-picker-custom .dp__active_date {
    background-color: var(--secondary-color);
    color: var(--primary-color);
}

.date-picker-custom .dp__cell_inner:hover {
    background-color: rgba(var(--secondary-color-rgb, 0, 0, 0), 0.1);
}

/* Personnalisation supplémentaire pour le texte en français */
.date-picker-custom .dp__month_year_select {
    color: var(--secondary-color);
}

.date-picker-custom .dp__month_year_row {
    margin-bottom: 0.5rem;
}

.date-picker-custom .dp__arrow_top {
    display: none;
    /* Supprimer la flèche pointant vers l'input */
}
</style>
