<template>
    <section class="py-16">
        <div class="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <div class="lg:w-1/3 mb-8 lg:mb-0">
                <h2
                    class="text-3xl md:text-4xl font-bold text-gray-800 text-left"
                >
                    Inscrivez-vous à notre newsletter
                </h2>
            </div>

            <div class="lg:w-2/3">
                <p class="text-lg text-gray-600 mb-6">
                    Restez informé des dernières nouveautés et offres
                    exclusives. Rejoignez notre communauté engagée pour une
                    culture durable.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 mb-4 max-w-lg">
                    <input
                        type="email"
                        placeholder="Entrez votre email"
                        class="px-4 py-3 border border-gray-300 w-full sm:max-w-[500px] focus:outline-none focus:border-gray-800 transition-colors"
                        aria-label="Email pour la newsletter"
                    />
                    <button
                        class="px-6 py-3 bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                        S'inscrire
                    </button>
                </div>

                <p class="text-sm text-gray-500">
                    En cliquant sur S'inscrire, vous confirmez que vous acceptez
                    nos
                    <a
                        href="#"
                        class="underline hover:text-gray-800 transition-colors"
                        >Conditions Générales</a
                    >.
                </p>
            </div>
        </div>
    </section>
</template>
