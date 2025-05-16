<template>
    <div class="min-h-screen flex items-center justify-center bg-white">
        <div
            class="flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 py-8 gap-8"
        >
            <div class="w-full md:w-1/2 flex flex-col justify-center">
                <div class="flex justify-center md:justify-start mb-6">
                    <img src="" alt="Circul'Art logo" class="h-10" />
                </div>

                <h1 class="text-3xl font-bold mb-4 text-center md:text-center">
                    Créer un compte
                </h1>

                <p class="text-gray-700 mb-8 text-center md:text-center">
                    Rejoignez Circul'Art et donnez vie à vos projets tout en
                    contribuant à une économie circulaire.
                </p>

                <form class="space-y-5" @submit.prevent="onSubmit">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                            <InputForm
                                v-model="form.firstname.$value"
                                label-value="Prénom*"
                                input-name="firstname"
                                type="text"
                                placeholder="Jean"
                                :error-message="
                                    showError('firstname')
                                        ? form.firstname.$error?.message
                                        : ''
                                "
                                :error-state="showError('firstname')"
                                @blur="touchedFields.firstname = true"
                            />
                        </div>

                        <div>
                            <InputForm
                                v-model="form.name.$value"
                                label-value="Nom*"
                                input-name="name"
                                type="text"
                                placeholder="Dupont"
                                :error-message="
                                    showError('name')
                                        ? form.name.$error?.message
                                        : ''
                                "
                                :error-state="showError('name')"
                                @blur="touchedFields.name = true"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                            <InputForm
                                v-model="form.email.$value"
                                label-value="Email*"
                                input-name="email"
                                type="email"
                                placeholder="contact@entreprise.com"
                                :error-message="
                                    showError('email')
                                        ? form.email.$error?.message
                                        : ''
                                "
                                :error-state="showError('email')"
                                @blur="touchedFields.email = true"
                            >
                                <template #hint>
                                    <div class="text-sm text-gray-500">
                                        Utilisez une adresse email
                                        professionnelle
                                    </div>
                                </template>
                            </InputForm>
                        </div>

                        <div>
                            <InputForm
                                v-model="form.phone.$value"
                                label-value="Numéro de téléphone"
                                input-name="phone"
                                type="tel"
                                placeholder="0612345678"
                                :error-message="
                                    showError('phone')
                                        ? form.phone.$error?.message
                                        : ''
                                "
                                :error-state="showError('phone')"
                                @blur="touchedFields.phone = true"
                            />
                        </div>
                    </div>

                    <InputForm
                        v-model="form.siret.$value"
                        label-value="Numéro de SIRET (entreprise)*"
                        input-name="siret"
                        type="text"
                        placeholder="12345678901234"
                        :error-message="
                            showError('siret') ? form.siret.$error?.message : ''
                        "
                        :error-state="showError('siret')"
                        @blur="touchedFields.siret = true"
                    >
                        <template #hint>
                            <div class="text-sm text-gray-500">
                                Le numéro SIRET doit comporter 14 chiffres sans
                                espaces ni tirets.
                            </div>
                        </template>
                    </InputForm>

                    <InputForm
                        v-model="form.password.$value"
                        label-value="Mot de passe*"
                        input-name="password"
                        type="password"
                        placeholder="Votre mot de passe"
                        :error-message="
                            showError('password')
                                ? form.password.$error?.message
                                : ''
                        "
                        :error-state="showError('password')"
                        @blur="touchedFields.password = true"
                    >
                        <template #hint>
                            <div class="text-sm text-gray-500">
                                Le mot de passe doit contenir au moins 10
                                caractères, une majuscule, une minuscule, un
                                chiffre et un symbole.
                            </div>
                        </template>
                    </InputForm>

                    <button
                        type="submit"
                        class="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-semibold mt-6"
                        :disabled="isLoading"
                    >
                        <div class="flex items-center justify-center">
                            <svg
                                v-if="isLoading"
                                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            {{
                                isLoading
                                    ? 'Inscription en cours...'
                                    : 'Créer un compte'
                            }}
                        </div>
                    </button>

                    <div class="text-center text-sm text-gray-700 mt-4">
                        Vous avez déjà un compte ?
                        <router-link
                            to="/login"
                            class="underline font-medium text-black"
                            >Se connecter</router-link
                        >
                    </div>
                </form>
            </div>

            <div class="w-full md:w-1/2 flex items-center justify-center">
                <TestimonialCarousel :autoplay-interval="6000" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Database from '../../utils/database.utils';
import InputForm from '../../components/form/InputForm.vue';
import { useToast } from 'vue-toastification';
import TestimonialCarousel from '../../components/auth/TestimonialCarousel.vue';
import { defineForm, field, isValidForm } from 'vue-yup-form';
import * as yup from 'yup';
import { userErrorMessages } from '../../utils/errors/auth/users';

const toast = useToast();
const router = useRouter();
const isLoading = ref(false);
const formError = ref('');
const formSubmitted = ref(false);

const touchedFields = reactive({
    name: false,
    firstname: false,
    email: false,
    password: false,
    phone: false,
    siret: false
});

// Type des champs
type FormFields =
    | 'name'
    | 'firstname'
    | 'email'
    | 'password'
    | 'phone'
    | 'siret';

// Affichage conditionnel des erreurs
const showError = (fieldName: FormFields) =>
    (touchedFields[fieldName] || formSubmitted.value) &&
    !!form[fieldName].$error;

// Schéma de validation avec les messages centralisés
const form = defineForm({
    name: field(
        '',
        yup
            .string()
            .required(userErrorMessages.required.name)
            .max(50, userErrorMessages.length.name)
    ),

    firstname: field(
        '',
        yup
            .string()
            .required(userErrorMessages.required.firstname)
            .max(50, userErrorMessages.length.firstname)
    ),

    email: field(
        '',
        yup
            .string()
            .required(userErrorMessages.required.email)
            .email(userErrorMessages.format.email)
            .test(
                'is-professional',
                userErrorMessages.format.businessEmail,
                (value) => {
                    if (!value || !value.includes('@')) return true;
                    const domain = value.split('@')[1].toLowerCase();
                    return !userErrorMessages.personalEmailDomains.includes(
                        domain
                    );
                }
            )
    ),

    password: field(
        '',
        yup
            .string()
            .required(userErrorMessages.required.password)
            .matches(
                userErrorMessages.patterns.password,
                userErrorMessages.password.invalid
            )
    ),

    phone: field(
        '',
        yup
            .string()
            .optional()
            .test('phone-format', userErrorMessages.format.phone, (value) => {
                if (!value) return true;
                return userErrorMessages.patterns.phone.test(value);
            })
    ),

    siret: field(
        '',
        yup
            .string()
            .required(userErrorMessages.required.siret)
            .matches(
                userErrorMessages.patterns.siret,
                userErrorMessages.format.siret
            )
    )
});

/**
 * Récupère le message d'erreur basé sur le statut HTTP
 */
function getErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'response' in error) {
        const response = (
            error as {
                response: { status: number; data?: { message?: string } };
            }
        ).response;
        const status = response.status;
        const message = response.data?.message;

        return status in userErrorMessages.apiErrors
            ? message ||
                  userErrorMessages.apiErrors[
                      status as keyof typeof userErrorMessages.apiErrors
                  ]
            : userErrorMessages.apiErrors.unknown;
    }

    return userErrorMessages.apiErrors.unknown;
}

async function onSubmit() {
    formSubmitted.value = true;
    if (!(await isValidForm(form))) return;

    isLoading.value = true;
    formError.value = '';

    try {
        const userData = {
            name: form.name.$value.trim(),
            firstname: form.firstname.$value.trim(),
            email: form.email.$value.trim(),
            password: form.password.$value,
            phone: form.phone.$value?.trim() || undefined,
            siret: form.siret.$value.trim()
        };

        await Database.create('users/register', userData);

        toast.success('Inscription réussie ! Vérifiez votre boîte mail.');
        router.push('/login');
    } catch (error) {
        formError.value = getErrorMessage(error);
        toast.error(formError.value);
    } finally {
        isLoading.value = false;
    }
}
</script>
