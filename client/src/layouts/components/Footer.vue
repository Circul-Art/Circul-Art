<template>
    <footer class="bg-primary py-8">
        <div class="w-full p-4">
            <div class="flex flex-col lg:flex-row">
                <!-- Brand Column -->
                <div class="mb-8">
                    <router-link to="/" class="flex items-center mb-4">
                        <div
                            class="lg:mr-8 h-full flex items-center justify-center w-auto"
                        >
                            <img :src="logo" alt="Logo" />
                        </div>
                    </router-link>
                </div>
                <!-- Links Columns -->
                <div
                    class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 lg:flex-1"
                >
                    <div class="col-span-1">
                        <h3 class="font-medium text-on-primary mb-4">
                            L'entreprise
                        </h3>
                        <ul class="space-y-4">
                            <li>
                                <router-link
                                    to="/suivi-de-commande"
                                    class="text-sm text-on-primary"
                                >
                                    Suivi de Commande
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/a-propos"
                                    class="text-sm text-on-primary"
                                >
                                    À propos
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/carrieres"
                                    class="text-sm text-on-primary"
                                >
                                    Carrières
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/mentions-legales"
                                    class="text-sm text-on-primary"
                                >
                                    Mentions Légales
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/politique-de-confidentialite"
                                    class="text-sm text-on-primary"
                                >
                                    Politique de Confidentialité
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="col-span-1">
                        <h3 class="font-medium text-on-primary mb-4">
                            Service client
                        </h3>
                        <ul class="space-y-4">
                            <li>
                                <router-link
                                    to="/trouver-un-entrepot"
                                    class="text-sm text-on-primary"
                                >
                                    Trouver un Entrepôt
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/contact"
                                    class="text-sm text-on-primary"
                                >
                                    Contactez-Nous
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/chat-support"
                                    class="text-sm text-on-primary"
                                >
                                    Chat en Direct
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/whatsapp"
                                    class="text-sm text-on-primary"
                                >
                                    WhatsApp
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/telephone"
                                    class="text-sm text-on-primary"
                                >
                                    Téléphone
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="col-span-1">
                        <h3 class="font-medium text-on-primary mb-4">
                            Nous suivre
                        </h3>
                        <ul class="space-y-4">
                            <li>
                                <router-link
                                    to="/suivez-nous"
                                    class="text-sm text-on-primary"
                                >
                                    Suivez-nous
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/instagram"
                                    class="text-sm text-on-primary"
                                >
                                    Instagram
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/facebook"
                                    class="text-sm text-on-primary"
                                >
                                    Facebook
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/tiktok"
                                    class="text-sm text-on-primary"
                                >
                                    Tiktok
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    to="/linkedin"
                                    class="text-sm text-on-primary"
                                >
                                    LinkedIn
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Newsletter Column -->
                <div class="mb-8">
                    <h3 class="font-medium text-on-primary mb-2">
                        Abonnez-vous
                    </h3>
                    <p class="text-on-primary mb-4">
                        Inscrivez-vous à notre newsletter pour rester informé.
                    </p>
                    <form action="#" class="mb-4">
                        <div class="flex flex-col md:flex-row gap-4 mb-2">
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Entrez votre email"
                                class="p-3 border border-on-primary w-full md:basis-3/4"
                            />
                            <button
                                type="submit"
                                class="text-on-primary border border-on-primary p-3 flex items-center justify-center w-full md:basis-1/4 md:px-6"
                            >
                                S'abonner
                            </button>
                        </div>
                        <p class="text-on-primary text-sm">
                            En vous abonnant, vous acceptez notre
                            <router-link
                                to="/politique-de-confidentialite"
                                class="transition duration-300 hover:underline"
                                >Politique de Confidentialité</router-link
                            >.
                        </p>
                    </form>
                </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-on-primary pt-6">
                <div
                    class="flex flex-col md:flex-row-reverse md:justify-between md:items-center"
                >
                    <div class="flex flex-row gap-4 items-center mb-8 md:mb-0">
                        <div class="w-6 h-auto">
                            <img :src="facebook" class="w-full h-full" alt="" />
                        </div>
                        <div class="w-6 h-auto">
                            <img
                                :src="instagram"
                                class="w-full h-full"
                                alt=""
                            />
                        </div>
                        <div class="w-6 h-auto">
                            <img :src="linkedin" class="w-full h-full" alt="" />
                        </div>
                        <div class="w-6 h-auto">
                            <img :src="tiktok" class="w-full h-full" alt="" />
                        </div>
                    </div>
                    <div
                        class="flex flex-col gap-6 md:flex-row md:flex-1 mb-10 md:mb-0 md:ml-12"
                    >
                        <p class="underline text-on-primary text-sm">
                            Politique de Confidentialité
                        </p>
                        <p class="underline text-on-primary text-sm">
                            Conditions d’utilisation
                        </p>
                        <p class="underline text-on-primary text-sm">
                            Paramètre des Cookies
                        </p>
                    </div>
                    <p class="text-on-primary text-sm">
                        © {{ currentYear }} Circul’Art. Tous droits réservés.
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import logo from '../../assets/logo.svg';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import tiktok from '../../assets/tiktok.svg';
import linkedin from '../../assets/linkedin.svg';
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>
