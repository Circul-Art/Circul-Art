import type { Category } from '../interfaces/category.interface';

export const categoriesMock: Category[] = [
    {
        id: 1,
        name: 'cinéma',
        article_def: 'le',
        article_part: 'du',
        uri: 'cinema',
        hero_paragraph:
            "Explorez notre vaste sélection de matériel de tournage et de production cinématographique, disponible à la location ou à la vente. Trouvez l'équipement idéal pour vos projets audiovisuels tout en soutenant une économie durable."
    },
    {
        id: 2,
        name: 'théâtre',
        article_def: 'le',
        article_part: 'du',
        uri: 'theater',
        hero_paragraph:
            "Découvrez notre gamme complète de matériel de scène et d'éclairage, disponible à la location ou à la vente. Trouvez l'équipement parfait pour vos productions théâtrales tout en soutenant une économie durable."
    },
    {
        id: 3,
        name: 'danse',
        article_def: 'la',
        article_part: 'de la',
        uri: 'dance',
        hero_paragraph:
            "Parcourez notre sélection d'équipements de danse et de scène, disponibles à la location ou à la vente. Trouvez l'équipement idéal pour vos performances tout en soutenant une économie durable."
    },
    {
        id: 4,
        name: 'musique',
        article_def: 'la',
        article_part: 'de la',
        uri: 'music',
        hero_paragraph:
            "Explorez notre sélection variée d'instruments et de matériel audio, disponibles à la location ou à la vente. Trouvez l'équipement parfait pour vos projets musicaux tout en soutenant une économie durable."
    }
];
