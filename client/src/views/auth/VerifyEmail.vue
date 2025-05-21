<template>
    <div class="min-h-screen flex items-center justify-center py-6">
        <div class="w-full max-w-2xl text-center">
            <div class="relative z-10">
                <!-- Icônes d'état avec transition fluide -->
                <div class="relative h-24 mb-8 mt-2">
                    <!-- Spinner pour chargement -->
                    <transition name="fade" mode="out-in">
                        <div
                            v-if="loading"
                            key="loading"
                            class="absolute inset-0 flex items-center justify-center"
                        >
                            <svg
                                class="animate-spin h-16 w-16 text-secondary"
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
                        </div>

                        <!-- Succès -->
                        <div
                            v-else-if="success || alreadyVerified"
                            key="success"
                            class="absolute inset-0 flex items-center justify-center"
                        >
                            <div
                                class="w-16 h-16 border rounded-full flex items-center justify-center"
                            >
                                <svg
                                    class="w-8 h-8 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        <!-- Erreur -->
                        <div
                            v-else
                            key="error"
                            class="absolute inset-0 flex items-center justify-center"
                        >
                            <div
                                class="w-16 h-16 border rounded-full flex items-center justify-center"
                            >
                                <svg
                                    class="w-8 h-8 text-secondary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </transition>
                </div>

                <!-- Contenu textuel avec animation -->
                <div class="space-y-4">
                    <transition name="fade-slide-down" mode="out-in">
                        <h1
                            :key="currentTitle"
                            class="text-3xl font-bold mb-10 text-center text-secondary"
                        >
                            {{ currentTitle }}
                        </h1>
                    </transition>

                    <transition name="fade-slide-up" mode="out-in">
                        <p :key="currentMessage" class="mb-8">
                            {{ currentMessage }}
                        </p>
                    </transition>

                    <!-- Contact support pour liens expirés -->
                    <transition name="fade">
                        <div v-if="isExpired" class="mb-6">
                            <div
                                class="flex items-center p-4 border rounded-md"
                            >
                                <div class="mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-secondary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div class="text-left">
                                    <div class="text-sm font-semibold">
                                        Besoin d'aide?
                                    </div>
                                    <a
                                        href="mailto:contact@circul-art.fr"
                                        class="text-sm text-secondary underline"
                                    >
                                        Contactez notre support
                                    </a>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>

                <!-- Bouton d'action -->
                <button
                    v-if="!loading"
                    class="bg-secondary text-primary py-3 px-6 font-medium w-full"
                    @click="redirectToLogin"
                >
                    {{ buttonText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Database from '../../utils/database.utils';
import { verifyEmailMessages } from '../../utils/errors/auth/verifyEmail';

// États
const loading = ref(true);
const success = ref(false);
const alreadyVerified = ref(false);
const isExpired = ref(false);

// Services
const route = useRoute();
const router = useRouter();
const toast = useToast();

// Valeurs calculées
const currentTitle = computed(() => {
    if (loading.value) return verifyEmailMessages.title.loading;
    if (success.value) return verifyEmailMessages.title.success;
    if (alreadyVerified.value) return verifyEmailMessages.title.alreadyVerified;
    if (isExpired.value) return verifyEmailMessages.title.expired;
    return verifyEmailMessages.title.failure;
});

const currentMessage = computed(() => {
    if (loading.value) return verifyEmailMessages.message.loading;
    if (success.value) return verifyEmailMessages.message.success;
    if (alreadyVerified.value)
        return verifyEmailMessages.message.alreadyVerified;
    if (isExpired.value) return verifyEmailMessages.message.expired;
    return verifyEmailMessages.message.failure;
});

const buttonText = computed(() =>
    success.value || alreadyVerified.value
        ? verifyEmailMessages.button.success
        : verifyEmailMessages.button.failure
);

// Redirection
function redirectToLogin() {
    router.push('/login');
}

// Traitement du token
onMounted(async () => {
    const token = route.query.token as string;

    if (!token) {
        loading.value = false;
        success.value = false;
        return;
    }

    try {
        const response = await Database.create('security/action', {
            actionType: 'VERIFY_EMAIL',
            token: token
        });

        // Succès - compte vérifié ou déjà vérifié
        success.value = true;

        // Vérifie si le compte était déjà vérifié
        if (response?.data?.message?.includes('déjà vérifié')) {
            alreadyVerified.value = true;
            toast.info(verifyEmailMessages.toast.alreadyVerified);
        } else {
            toast.success(verifyEmailMessages.toast.success);
        }
    } catch (error: unknown) {
        // Échec - différentes raisons possibles
        success.value = false;

        // Analyse l'erreur
        const apiError = error as {
            response?: { data?: { message?: string } };
        };
        const errorMessage = apiError.response?.data?.message || '';

        // Détermine le type d'erreur
        if (errorMessage.includes('expiré')) {
            isExpired.value = true;
            toast.error(verifyEmailMessages.toast.expired);
        } else {
            toast.error(errorMessage || verifyEmailMessages.message.failure);
        }
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
/* Animations pour transitions fluides */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-slide-down-enter-active,
.fade-slide-down-leave-active {
    transition:
        opacity 0.3s,
        transform 0.4s;
}

.fade-slide-down-enter-from,
.fade-slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
    transition:
        opacity 0.3s,
        transform 0.4s;
}

.fade-slide-up-enter-from,
.fade-slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
