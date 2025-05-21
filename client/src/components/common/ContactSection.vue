<template>
    <section class="py-16">
        <!-- Titre -->
        <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-left">
                Contactez-nous
            </h2>
            <p class="text-lg max-w-3xl text-left">
                Pour toute assistance, n'hésitez pas à nous contacter.
            </p>
        </div>

        <div class="flex flex-col lg:flex-row lg:gap-16">
            <!-- Informations de contact -->
            <div class="lg:w-1/2 mb-8 lg:mb-0">
                <div class="flex flex-col space-y-12">
                    <!-- Email -->
                    <div class="flex flex-col items-start">
                        <div class="mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8"
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
                        <h3 class="text-xl font-semibold mb-2">Email</h3>
                        <p class="mb-2">support@circulart.com</p>
                        <a
                            href="mailto:contact@circul-art.fr"
                            class="hover:underline"
                            >circulart@support.fr</a
                        >
                    </div>

                    <!-- Téléphone -->
                    <div class="flex flex-col items-start">
                        <div class="mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Téléphone</h3>
                        <p class="text-gray-600 mb-2">Appelez-nous au</p>
                        <a href="tel:+33123456789" class="hover:underline"
                            >+33 1 23 45 67 89</a
                        >
                    </div>

                    <!-- Localisation -->
                    <div class="flex flex-col items-start">
                        <div class="mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Bureau</h3>
                        <address class="not-italic">
                            11 rue Abelard, Lille 59000, FR
                        </address>
                    </div>
                </div>
            </div>

            <!-- Carte OpenStreetMap -->
            <div class="lg:w-3/4">
                <div class="w-full h-[400px] lg:h-full overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=3.054452538490296%2C50.62752057512932%2C3.0638771057128907%2C50.63093834570985&amp;layer=hot&amp;marker=50.62922750733361%2C3.0591723322868347"
                        style="filter: contrast(1.05) saturate(1.1)"
                        loading="lazy"
                        title="Localisation de nos bureaux à Lille"
                    >
                    </iframe>
                </div>
            </div>
        </div>
    </section>
</template>
