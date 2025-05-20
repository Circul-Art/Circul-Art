<template>
    <section class="py-16">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Découvrez nos catégories de produits à louer
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                Circul'Art vous propose une sélection variée d'équipements
                culturels. Parcourez nos catégories pour trouver ce dont vous
                avez besoin.
            </p>
        </div>

        <div class="flex flex-col lg:flex-row items-center lg:gap-12">
            <!-- Catégories de gauche -->
            <div class="lg:w-1/4 order-1 flex flex-col gap-4 lg:self-center">
                <!-- Cinéma -->
                <div class="p-6 flex flex-col items-center">
                    <div
                        class="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center mb-2 shadow-sm border border-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M7 4v16M17 4v16M3 8h18M3 16h18"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        Cinéma
                    </h3>
                    <p class="text-gray-600 text-center">
                        Louez des équipements de cinéma pour vos projets
                        professionnels et événements.
                    </p>
                </div>

                <!-- Théâtre -->
                <div class="p-6 flex flex-col items-center">
                    <div
                        class="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center mb-2 shadow-sm border border-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        Théâtre
                    </h3>
                    <p class="text-gray-600 text-center">
                        Louez des équipements scéniques pour vos représentations
                        théâtrales.
                    </p>
                </div>
            </div>

            <!-- Image centrale -->
            <div
                class="lg:w-1/2 order-3 lg:order-2 flex items-center justify-center my-8 lg:my-0"
            >
                <div class="w-full max-w-md overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        alt="Équipement culturel"
                        class="w-full h-full object-cover aspect-square"
                    />
                </div>
            </div>

            <!-- Catégories de droite -->
            <div
                class="lg:w-1/4 order-2 lg:order-3 flex flex-col gap-4 lg:self-center"
            >
                <!-- Danse -->
                <div class="p-6 flex flex-col items-center">
                    <div
                        class="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center mb-2 shadow-sm border border-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-700"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="#000000"
                                d="M14 23.5c-1 0-1.75-1.5-1.75-1.5c-.75-1.5-.75-3.5-.75-5v-.5l-5-2.5V6.5h5V14m-3 3.5c-.21 0-.466.133-.737.344C5.958 19.24 5.5 21.718 5.5 24m-5-14l2.328-2.328A4 4 0 0 1 5.657 6.5h7.186a4 4 0 0 0 2.829-1.172L18 3m1.5 14.5a2 2 0 1 0-4 0a2 2 0 0 0 4 0Zm0 0v-8h.75s.75 4 3.75 4m-14.805-9s-1.81-.557-2.135-1.776A1.77 1.77 0 0 1 8.302.561a1.75 1.75 0 0 1 2.146 1.25c.324 1.219-.962 2.61-.962 2.61z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        Danse
                    </h3>
                    <p class="text-gray-600 text-center">
                        Équipez vos spectacles de danse avec notre matériel
                        spécialisé.
                    </p>
                </div>

                <!-- Musique -->
                <div class="p-6 flex flex-col items-center">
                    <div
                        class="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center mb-2 shadow-sm border border-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                            />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        Musique
                    </h3>
                    <p class="text-gray-600 text-center">
                        Louez des instruments et équipements audio pour vos
                        événements musicaux.
                    </p>
                </div>
            </div>
        </div>

        <div class="flex flex-row gap-6 justify-center mt-10">
            <a
                href="#"
                class="px-6 py-2 border border-black text-gray-800 font-medium uppercase tracking-wider transition-all hover:bg-gray-800 hover:text-white"
            >
                Louer
            </a>
            <a
                href="#"
                class="flex items-center gap-2 text-gray-800 font-medium uppercase tracking-wider hover:text-gray-600 transition-all group"
            >
                En savoir plus
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 transform transition-transform group-hover:translate-x-1 mt-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </a>
        </div>
    </section>
</template>
