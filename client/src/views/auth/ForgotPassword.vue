<template>
    <div class="min-h-screen flex items-center justify-center py-6">
        <div class="w-full max-w-2xl">
            <h1 class="text-3xl font-bold mb-6 text-center text-secondary">
                Réinitialiser mon mot de passe
            </h1>

            <transition name="fade" mode="out-in">
                <div v-if="!requestSent" key="form">
                    <form class="space-y-5" @submit.prevent="handleSubmit">
                        <InputForm
                            v-model="form.email.$value"
                            label-value="Email*"
                            input-name="email"
                            type="email"
                            placeholder="votre@email.com"
                            :error-message="
                                showError('email')
                                    ? form.email.$error?.message
                                    : ''
                            "
                            :error-state="showError('email')"
                            @blur="touchedFields.email = true"
                        />

                        <div class="text-sm">
                            <p>
                                Après validation, un e-mail est envoyé avec un
                                lien sécurisé pour créer un nouveau mot de
                                passe.
                            </p>
                        </div>

                        <div class="text-sm text-center w-full mb-10">
                            Revenir à la
                            <router-link
                                to="/login"
                                class="text-secondary underline font-medium"
                            >
                                page de connexion
                            </router-link>
                        </div>

                        <button
                            type="submit"
                            class="bg-secondary text-primary py-3 px-6 font-medium w-full"
                            :disabled="isLoading"
                        >
                            <div class="flex items-center justify-center">
                                <svg
                                    v-if="isLoading"
                                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                {{
                                    isLoading
                                        ? 'Envoi en cours...'
                                        : 'Envoyer un lien de réinitialisation'
                                }}
                            </div>
                        </button>
                    </form>
                </div>

                <div v-else key="success" class="text-center py-6">
                    <div
                        class="mx-auto w-16 h-16 border rounded-full flex items-center justify-center mb-6"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-8 w-8 text-secondary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    <h2 class="text-2xl font-bold text-secondary mb-10">
                        Email envoyé !
                    </h2>
                    <p class="mb-6">
                        Si l'adresse email existe dans notre système, vous
                        recevrez un lien pour réinitialiser votre mot de passe.
                    </p>

                    <div class="text-sm text-center w-full mb-10">
                        Revenir à la
                        <router-link
                            to="/login"
                            class="text-secondary underline font-medium"
                        >
                            page de connexion
                        </router-link>
                    </div>

                    <button
                        class="bg-secondary text-primary py-3 px-6 font-medium w-full"
                        @click="resetForm"
                    >
                        Réessayer
                    </button>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Database from '../../utils/database.utils';
import InputForm from '../../components/form/InputForm.vue';
import { defineForm, field, isValidForm } from 'vue-yup-form';
import * as yup from 'yup';
import { userErrorMessages } from '../../utils/errors/auth/users';

// États
const isLoading = ref(false);
const requestSent = ref(false);
const formSubmitted = ref(false);

const touchedFields = reactive({
    email: false
});

// Validation du formulaire
const form = defineForm({
    email: field(
        '',
        yup
            .string()
            .required(userErrorMessages.required.email)
            .email(userErrorMessages.format.email)
    )
});

type FormFields = 'email';

const showError = (fieldName: FormFields) =>
    (touchedFields[fieldName] || formSubmitted.value) &&
    !!form[fieldName].$error;

async function handleSubmit() {
    formSubmitted.value = true;

    if (!(await isValidForm(form))) return;

    isLoading.value = true;

    try {
        await Database.create('security/action', {
            actionType: 'RESET_PASSWORD',
            email: form.email.$value.trim()
        });

        requestSent.value = true;
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation:', error);
        requestSent.value = true;
    } finally {
        isLoading.value = false;
    }
}

function resetForm() {
    form.email.$value = '';
    formSubmitted.value = false;
    touchedFields.email = false;
    requestSent.value = false;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
