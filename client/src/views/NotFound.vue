<template>
    <div class="min-h-screen flex flex-col items-center justify-center py-16">
        <div class="text-center max-w-2xl mx-auto">
            <h1 class="text-3xl md:text-4xl font-bold mb-26">
                Oups... Cette page n'existe pas
            </h1>

            <h2 class="text-2xl md:text-2xl font-bold mb-6">
                Il semble que vous vous soyez perdu(e) en chemin.
            </h2>

            <p class="text-sm mb-12">
                La page que vous recherchez est introuvable ou n'existe plus.
            </p>

            <!-- Liens de navigation -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <!-- Lien Accueil -->
                <router-link to="/" class="flex flex-col items-center">
                    <div
                        class="w-12 h-12 rounded-full border flex items-center justify-center mb-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                    </div>
                    <span class="font-medium"
                        >Retourner à la page d'accueil</span
                    >
                </router-link>

                <!-- Lien catégories -->
                <router-link
                    to="/categories"
                    class="flex flex-col items-center"
                >
                    <div
                        class="w-12 h-12 rounded-full border flex items-center justify-center mb-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                        </svg>
                    </div>
                    <span class="font-medium"
                        >Explorer nos catégories de matériel</span
                    >
                </router-link>

                <!-- Lien contact -->
                <router-link to="/contact" class="flex flex-col items-center">
                    <div
                        class="w-12 h-12 rounded-full border flex items-center justify-center mb-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <span class="font-medium"
                        >Contacter notre équipe support</span
                    >
                </router-link>
            </div>

            <p class="text-sm">
                Même les meilleurs artistes improvisent parfois !
            </p>
        </div>
    </div>
</template>
