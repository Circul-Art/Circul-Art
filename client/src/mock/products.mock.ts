import type { Product } from '../interfaces/product.interface';
import { subSubcategoriesMock } from './subsubcateogires.mock';

export const productsMock: Product[] = [
    {
        id: 1,
        name: 'Guitare électrique Stratocaster',
        brand: 'Fender',
        price: 25,
        description:
            'La Fender Stratocaster est une guitare électrique emblématique, reconnue pour son confort de jeu, sa polyvalence et son son cristallin. Idéale pour les concerts, les répétitions, les enregistrements studio ou les spectacles live. Modèle professionnel, livré avec son étui rigide.',
        subsubcategory: subSubcategoriesMock.find(
            (subsubcategory) => subsubcategory.name === 'guitares'
        )!
    },
    {
        id: 2,
        name: 'Batterie acoustique Stage Custom',
        brand: 'Yamaha',
        description:
            'La batterie acoustique Yamaha Stage Custom est parfaite pour les musiciens professionnels et amateurs. Avec ses fûts en bouleau, elle offre un son riche et chaleureux. Idéale pour les concerts, les répétitions, les enregistrements studio ou les spectacles live.',
        price: 45,
        subsubcategory: subSubcategoriesMock.find(
            (subsubcategory) => subsubcategory.name === 'batterie'
        )!
    }
];
