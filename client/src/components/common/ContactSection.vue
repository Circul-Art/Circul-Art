<template>
    <section class="py-16">
        <!-- Titre -->
        <!-- <div class="mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-left">
                Contactez-nous
            </h2>
            <p class="text-lg max-w-3xl text-left">
                Pour toute assistance, n'hésitez pas à nous contacter.
            </p>
        </div> -->
        <hgroup class="mb-12">
            <slot name="subtitle" />
            <h2 class="mb-4">Contactez-nous</h2>
            <slot name="intro" />
        </hgroup>

        <div class="flex flex-col sm:flex-row sm:gap-16 lg:gap-32 xl:gap-48">
            <div class="sm:w-1/4">
                <div class="mb-8">
                    <div class="w-8 h-8 flex justify-center items-center">
                        <InlineSvg :src="mail" />
                    </div>
                    <h3 class="font-bold text-lg">Email</h3>
                    <p class="mb-2">Nous sommes là pour vous.</p>
                    <a
                        href="mailto:support@circulart.com"
                        class="underline hover:no-underline active:no-underline"
                        >support@circulart.com</a
                    >
                </div>
                <div class="mb-8">
                    <div class="w-8 h-8 flex justify-center items-center">
                        <InlineSvg :src="phone" />
                    </div>
                    <h3 class="font-bold text-lg">Téléhpone</h3>
                    <p class="mb-2">Appelez-nous pour plus d'infos.</p>
                    <a
                        href="tel:+33 1 23 45 67 89"
                        class="underline hover:no-underline active:no-underline"
                        >+33 1 23 45 67 89</a
                    >
                </div>
                <div class="mb-8">
                    <div class="w-8 h-8 flex justify-center items-center">
                        <InlineSvg :src="pin" />
                    </div>
                    <h3 class="font-bold text-lg">Bureau</h3>
                    <address class="mb-2">
                        11 rue Abelard, Lille 59000, FR
                    </address>
                    <a
                        href="https://www.google.com/maps/place/11rueAbelard,Lille59000,FR"
                        target="_blank"
                        class="flex flex-row items-center gap-1 group"
                    >
                        <span>Obtenir l'itinéraire</span>
                        <InlineSvg :src="chevronright" />
                    </a>
                </div>
            </div>
            <div class="sm:w-3/4">
                <div class="w-full h-[400px] sm:h-full overflow-hidden">
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

<script setup lang="ts">
import mail from '../../assets/mail.svg';
import phone from '../../assets/phone.svg';
import pin from '../../assets/pin.svg';
import chevronright from '../../assets/chevron-right.svg';
</script>
