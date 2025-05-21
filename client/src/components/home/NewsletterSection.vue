<template>
    <section class="py-16">
        <div class="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <div class="lg:w-1/3 mb-8 lg:mb-0">
                <h2 class="text-3xl md:text-4xl font-bold text-left">
                    Inscrivez-vous à notre newsletter
                </h2>
            </div>

            <div class="lg:w-2/3">
                <p class="text-lg mb-6">
                    Restez informé des dernières nouveautés et offres
                    exclusives. Rejoignez notre communauté engagée pour une
                    culture durable.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 mb-4 max-w-lg">
                    <input
                        type="email"
                        placeholder="Entrez votre email"
                        class="px-4 py-3 border w-full sm:max-w-[500px]"
                        aria-label="Email pour la newsletter"
                    />
                    <button
                        class="px-6 py-3 bg-secondary text-primary font-medium whitespace-nowrap"
                    >
                        S'inscrire
                    </button>
                </div>

                <p class="text-sm">
                    En cliquant sur S'inscrire, vous confirmez que vous acceptez
                    nos
                    <a href="#" class="underline">Conditions Générales</a>.
                </p>
            </div>
        </div>
    </section>
</template>
