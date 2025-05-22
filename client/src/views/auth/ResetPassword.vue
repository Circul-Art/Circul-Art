<template>
    <div class="min-h-screen flex items-center justify-center py-6">
        <div class="w-full max-w-2xl">
            <h1 class="text-3xl font-bold mb-6 text-center text-secondary">
                Nouveau mot de passe
            </h1>

            <transition name="fade" mode="out-in">
                <div v-if="!resetSuccess && !tokenInvalid" key="form">
                    <form class="space-y-5" @submit.prevent="handleSubmit">
                        <InputForm
                            v-model="form.password.$value"
                            label-value="Nouveau mot de passe"
                            input-name="password"
                            type="password"
                            placeholder="Votre nouveau mot de passe"
                            :error-message="
                                showError('password')
                                    ? form.password.$error?.message
                                    : ''
                            "
                            :error-state="showError('password')"
                            @blur="touchedFields.password = true"
                        >
                            <template #hint>
                                <div class="text-sm">
                                    Le mot de passe doit contenir au moins 10
                                    caractères, une majuscule, une minuscule, un
                                    chiffre et un symbole.
                                </div>
                            </template>
                        </InputForm>

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
                                        ? 'Réinitialisation...'
                                        : 'Mettre à jour mon mot de passe'
                                }}
                            </div>
                        </button>
                    </form>
                </div>

                <div
                    v-else-if="resetSuccess"
                    key="success"
                    class="text-center py-6"
                >
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
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h2 class="text-2xl font-bold text-secondary mb-10">
                        Mot de passe modifié !
                    </h2>
                    <p class="mb-6">
                        Votre mot de passe a été modifié avec succès. Vous
                        pouvez maintenant vous connecter avec votre nouveau mot
                        de passe.
                    </p>

                    <button
                        class="bg-secondary text-primary py-3 px-6 font-medium w-full"
                    >
                        Se connecter
                    </button>
                </div>

                <div v-else key="invalid" class="text-center py-6">
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
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    <h2 class="text-2xl font-bold text-secondary mb-10">
                        Lien invalide
                    </h2>
                    <p class="mb-6">
                        Le lien de réinitialisation est invalide ou a expiré.
                        Veuillez demander un nouveau lien.
                    </p>

                    <div class="text-sm text-center w-full mb-10">
                        Revenir à la
                        <router-link
                            to="/forgot-password"
                            class="text-secondary underline font-medium"
                        >
                            page de demande
                        </router-link>
                    </div>

                    <router-link
                        to="/forgot-password"
                        class="bg-secondary text-primary py-3 px-6 font-medium w-full block text-center"
                    >
                        Demander un nouveau lien
                    </router-link>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import Database from '../../utils/database.utils';
import InputForm from '../../components/form/InputForm.vue';
import { defineForm, field, isValidForm } from 'vue-yup-form';
import * as yup from 'yup';
import { userErrorMessages } from '../../utils/errors/auth/users';

// États
const isLoading = ref(false);
const resetSuccess = ref(false);
const tokenInvalid = ref(false);
const errorMessage = ref('');
const formSubmitted = ref(false);
const token = ref('');

const touchedFields = reactive({
    password: false
});

// Services
const route = useRoute();
const toast = useToast();

const form = defineForm({
    password: field(
        '',
        yup
            .string()
            .required(userErrorMessages.required.password)
            .matches(
                userErrorMessages.patterns.password,
                userErrorMessages.password.invalid
            )
    )
});

type FormFields = 'password';

const showError = (fieldName: FormFields) =>
    (touchedFields[fieldName] || formSubmitted.value) &&
    !!form[fieldName].$error;

// Vérifier le token au chargement
onMounted(() => {
    token.value = route.query.token as string;

    if (!token.value) {
        tokenInvalid.value = true;
        toast.error('Lien de réinitialisation invalide');
    }
});

// Gestion du formulaire
async function handleSubmit() {
    formSubmitted.value = true;
    errorMessage.value = '';

    if (!(await isValidForm(form))) return;

    isLoading.value = true;

    try {
        await Database.create('security/action', {
            actionType: 'RESET_PASSWORD',
            token: token.value,
            newPassword: form.password.$value
        });

        resetSuccess.value = true;
    } catch (error: unknown) {
        const apiError = error as {
            response?: { data?: { message?: string }; status?: number };
        };

        if (
            apiError.response?.status === 400 &&
            apiError.response.data?.message?.includes('expiré')
        ) {
            tokenInvalid.value = true;
            toast.error('Le lien de réinitialisation a expiré');
        } else {
            errorMessage.value =
                apiError.response?.data?.message ||
                'Une erreur est survenue lors de la réinitialisation';
            toast.error(errorMessage.value);
        }
    } finally {
        isLoading.value = false;
    }
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
