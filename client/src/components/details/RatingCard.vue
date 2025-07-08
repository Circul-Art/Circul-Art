<template>
    <li class="md:basis-[calc(50%-2rem)]">
        <div
            class="flex flex-col p-6 border border-on-primary bg-primary text-on-primary w-full"
        >
            <div class="flex gap-1 mb-4 items-center">
                <span class="[&>svg]:w-5 [&>svg]:h-5">
                    <InlineSvg :src="starFilled" />
                </span>
                <span class="[&>svg]:w-5 [&>svg]:h-5"
                    ><InlineSvg :src="starFilled"
                /></span>
                <span class="[&>svg]:w-5 [&>svg]:h-5"
                    ><InlineSvg :src="starFilled"
                /></span>
                <span class="[&>svg]:w-5 [&>svg]:h-5"
                    ><InlineSvg :src="starFilled"
                /></span>
                <span class="[&>svg]:w-5 [&>svg]:h-5"
                    ><InlineSvg :src="starFilled"
                /></span>
            </div>
            <blockquote class="mb-6">
                <p>
                    "La Stratocaster était en parfait état, très agréable à
                    jouer. J'ai pu l'utiliser pour une session d'enregistrement
                    en studio sans aucun souci. Retrait rapide à l'entrepôt, je
                    recommande !"
                </p>
                <cite>— Marc B., Guitariste de studio</cite>
            </blockquote>
            <figure class="profile">
                <img
                    class="w-12 h-12 rounded-full mb-2"
                    :src="placeholderImage"
                    alt="Photo de profil de Marc B."
                />
                <figcaption>
                    <h3 class="font-bold">Marc B.</h3>
                    <p>Guitariste de studio</p>
                </figcaption>
            </figure>
        </div>
    </li>
</template>

<script setup lang="ts">
import placeholderImage from '../../assets/placeholder-img.jpg';
import starFilled from '../../assets/star-filled.svg';
</script>
