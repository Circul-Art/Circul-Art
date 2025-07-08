<template>
    <section class="md:basis-1/2">
        <hgroup class="mb-6">
            <h1 class="mb-2">{{ product.name }}</h1>
            <p class="font-bold first-letter:uppercase mb-4">
                <strong> {{ product.price }} €/jour </strong>
            </p>
            <p>{{ product.brand }}</p>
        </hgroup>
        <div class="flex gap-1 mb-6 items-center">
            <span><InlineSvg :src="starFilled" /></span>
            <span><InlineSvg :src="starFilled" /></span>
            <span><InlineSvg :src="starFilled" /></span>
            <span><InlineSvg :src="starFilled" /></span>
            <span><InlineSvg :src="starFilledHalf" /></span>
            <p class="text-sm">(4.5) • 10 avis</p>
        </div>
        <p class="mb-6">{{ product.description }}</p>
        <form action="" class="mb-6">
            <div class="flex flex-col">
                <SelectForm
                    v-model="color"
                    label-value="Couleur"
                    input-name="color"
                    :error-state="false"
                >
                    <option value="" disabled>Sélectionnez l'état</option>
                    <option value="comme_neuf">Comme neuf</option>
                    <option value="tres_bon">Très bon état</option>
                    <option value="bon">Bon état</option>
                    <option value="satisfaisant">État satisfaisant</option>
                    <option value="a_reparer">À réparer</option>
                </SelectForm>
            </div>
            <fieldset class="flex flex-col mb-4">
                <legend class="mb-2">État du matériel</legend>
                <div class="flex flex-row gap-3 flex-wrap">
                    <div>
                        <label
                            for="etat-parfait"
                            class="transition-all block border border-on-primary background-primary text-on-primary px-3 py-2 cursor-pointer has-[:checked]:border-secondary has-[:checked]:bg-secondary has-[:checked]:text-on-secondary has-[:disabled]:opacity-50"
                        >
                            <input
                                id="etat-parfait"
                                v-model="condition"
                                type="radio"
                                name="etat"
                                value="etat-parfait"
                                class="hidden"
                                checked
                            />
                            <span>Parfait état</span>
                        </label>
                    </div>
                    <div>
                        <label
                            for="etat-bon"
                            class="transition-all block border border-on-primary background-primary text-on-primary px-3 py-2 cursor-pointer has-[:checked]:border-secondary has-[:checked]:bg-secondary has-[:checked]:text-on-secondary has-[:disabled]:opacity-50"
                        >
                            <input
                                id="etat-bon"
                                v-model="condition"
                                type="radio"
                                class="hidden"
                                name="etat"
                                value="etat-bon"
                            />
                            <span>Bon état</span>
                        </label>
                    </div>
                    <div>
                        <label
                            for="etat-neuf"
                            class="transition-all block border border-on-primary background-primary text-on-primary px-3 py-2 cursor-pointer has-[:checked]:border-secondary has-[:checked]:bg-secondary has-[:checked]:text-on-secondary has-[:disabled]:opacity-50"
                        >
                            <input
                                id="etat-neuf"
                                v-model="condition"
                                type="radio"
                                class="hidden"
                                name="etat"
                                value="etat-neuf"
                                disabled
                            />
                            <span>Neuf</span>
                        </label>
                    </div>
                </div>
            </fieldset>
            <div class="flex flex-col w-20">
                <InputForm
                    v-model="quantity"
                    label-value="Quantité"
                    input-name="quantity"
                    type="number"
                    :min="1"
                />
            </div>
            <div class="flex flex-col">
                <InputForm
                    v-model="beginDate"
                    label-value="Je souhaite louer cet article à partir du..."
                    input-name="begin-date"
                    type="date"
                />
            </div>
            <div class="flex flex-col">
                <InputForm
                    v-model="returnDate"
                    label-value="Je souhaite retourner cet article le..."
                    input-name="return-date"
                    type="date"
                />
            </div>
            <div class="flex flex-col">
                <SelectForm
                    v-model="location"
                    label-value="Choisissez le lieu de collecte"
                    input-name="location"
                    :error-state="false"
                >
                    <option value="" disabled>Sélectionnez un lieu</option>
                    <option value="paris">Paris</option>
                    <option value="lyon">Lyon</option>
                    <option value="marseille">Marseille</option>
                    <option value="bordeaux">Bordeaux</option>
                </SelectForm>
            </div>
            <button
                type="submit"
                class="mb-2 bg-secondary text-center w-full px-3 py-4 text-on-secondary"
            >
                Ajouter au panier
            </button>
            <p class="text-sm text-center">
                Le montant total s'actualise automatiquement lors de votre
                validation de commande, selon vos dates de réservation.
            </p>
        </form>
        <button
            type="button"
            class="bg-primary border border-on-primary text-center w-full px-3 py-4 text-on-primary mb-8"
        >
            Ajouter au favoris
        </button>
        <div>
            <Accordion type="multiple" class="w-full" collapsible>
                <AccordionItem
                    v-for="item in accordionItems"
                    :key="item.value"
                    :value="item.value"
                    :class="'border-b-0 border-t'"
                >
                    <AccordionTrigger>{{ item.title }}</AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            <li
                                v-for="(content, index) in item.content.split(
                                    '\n'
                                )"
                                :key="index"
                            >
                                {{ content.trim() }}
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </section>
</template>

<script setup lang="ts">
import starFilled from '../../assets/star-filled.svg';
import starFilledHalf from '../../assets/star-filled-half.svg';
import SelectForm from '../../components/form/SelectForm.vue';
import { ref } from 'vue';
import InputForm from '../../components/form/InputForm.vue';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '../../components/ui/accordion';
import type { Product } from '../../interfaces/product.interface';

defineProps<{
    product: Product;
}>();

const accordionItems = [
    {
        value: 'item-1',
        title: 'Contenu de la location',
        content: `
            1 guitare électrique Fender Stratocaster
            1 étui rigide Fender
            1 câble jack 3 mètres
            1 sangle de guitare
            1 jeu de cordes de rechange (optionnel, à préciser)
            Notice d’utilisation rapide
        `
    },
    {
        value: 'item-2',
        title: 'Utilisation recommandée',
        content: `
            Concerts live et spectacles
            Répétitions en groupe ou en studio
            Enregistrements professionnels en studio
            Événements culturels ou prestations scéniques
            Pratique avancée pour guitaristes professionnels ou semi-pros
        `
    },
    {
        value: 'item-3',
        title: 'Caractéristiques techniques',
        content: `
            Corps: Aulne léger
            Manche: Érable, profil "Modern C"
            Touche: Palissandre (ou érable selon modèle disponible)
            Frettes: 22 frettes Medium Jumbo
            Micros: 3 micros simple bobinage Fender Standard
            Contrôles: Volume principal + 2 tonalités
            Sélecteur: 5 positions pour combinaisons de micros variées
            Chevalet: Tremolo synchronisé Fender
            Finition: Sunburst ou Arctic White
            Poids: Environ 3,5 kg
            Connectique: Sortie Jack standard 6,35 mm
        `
    }
];
const beginDate = ref('');
const returnDate = ref('');
const color = ref('');
const location = ref('');
const quantity = ref(1);
const condition = ref('');
</script>
