# Hooks Git avec Husky

Le projet utilise [Husky](https://typicode.github.io/husky/) pour gérer les hooks Git, ce qui permet d'automatiser les vérifications de qualité du code avant chaque commit. Cette automatisation garantit que seul du code respectant les standards du projet soit committé.

## Configuration actuelle

Les hooks Git sont configurés dans le dossier `.husky` à la racine du projet. Actuellement, nous avons trois hooks : `pre-commit` qui exécute plusieurs vérifications avant de valider un commit, `commit-msg` qui vérifie le format des messages de commit, et `pre-push` qui vérifie que le code est compilable avant de pousser les modifications.

### Hook pre-commit

Le hook `pre-commit` effectue les opérations suivantes :

1. **Vérification des conteneurs Docker** :

   - S'assure que les conteneurs frontend et backend sont en cours d'exécution
   - Empêche le commit si les conteneurs ne sont pas démarrés

2. **Linting du backend** :

   - Exécute `npm run lint:backend`
   - Bloque le commit si des erreurs de linting sont détectées

3. **Linting du frontend** :

   - Exécute `npm run lint:frontend`
   - Bloque le commit si des erreurs de linting sont détectées

4. **Formatage automatique du code** :
   - Exécute `npm run format` pour formater le code selon les règles définies
   - Si le formatage réussit, les fichiers modifiés sont automatiquement ajoutés au commit
   - Si le formatage échoue, le commit est bloqué

### Hook commit-msg

Le hook `commit-msg` vérifie que les messages de commit respectent les conventions définies :

1. **Validation du format du message** :
   - Exécute `npx --no -- commitlint --edit $1`
   - Vérifie que le message de commit suit les conventions définies dans `commitlint.config.cjs`
   - Bloque le commit si le message ne respecte pas les règles (type de commit, longueur, format, etc.)

Cette validation assure que tous les messages de commit suivent la convention Conventional Commits, facilitant la génération automatique de changelogs et la compréhension de l'historique du projet.

### Hook pre-push

Le hook `pre-push` vérifie que le code est compilable avant de pousser les modifications :

1. **Vérification du build frontend** :

   - Exécute `npm run build:check:frontend`
   - Vérifie que le code TypeScript du frontend peut être compilé sans erreur
   - Bloque le push si des erreurs de compilation sont détectées

2. **Vérification du build backend** :
   - Exécute `npm run build:check:backend`
   - Vérifie que le code TypeScript du backend peut être compilé sans erreur
   - Bloque le push si des erreurs de compilation sont détectées

Cette vérification garantit que seul du code compilable est poussé vers le dépôt distant, évitant ainsi d'introduire des erreurs de compilation pour les autres membres de l'équipe.

## Comment ça fonctionne

1. Lorsque vous exécutez `git commit`, le hook `pre-commit` s'active automatiquement
2. Toutes les vérifications configurées sont exécutées séquentiellement
3. Si une vérification échoue, le commit est interrompu avec un message explicatif
4. Si toutes les vérifications réussissent, le hook `commit-msg` vérifie le format du message
5. Si le message de commit est valide, le commit se poursuit normalement
6. Lorsque vous exécutez `git push`, le hook `pre-push` vérifie que le code est compilable
7. Si le code ne peut pas être compilé, le push est bloqué avec un message explicatif

## Scripts associés

Les scripts appelés par le hook sont définis dans le `package.json` à la racine du projet :

- `lint:backend` : exécute ESLint sur les fichiers du backend
- `lint:frontend` : exécute ESLint sur les fichiers du frontend
- `format` : utilise Prettier pour formater automatiquement le code
- `build:check:frontend` : vérifie que le code frontend peut être compilé sans erreur
- `build:check:backend` : vérifie que le code backend peut être compilé sans erreur

## Modifier ou ajouter des hooks

Pour modifier un hook existant ou en ajouter de nouveaux :

1. Modifiez directement les fichiers dans le dossier `.husky`
2. Pour ajouter un nouveau hook, utilisez la commande:

   ```bash
   npx husky add .husky/[nom-du-hook] "commande-à-exécuter"
   ```

3. Assurez-vous que les nouveaux fichiers de hook soient exécutables (généralement géré automatiquement par Husky)

## Contourner temporairement les hooks

Dans des cas exceptionnels, vous pouvez contourner les hooks avec l'option `--no-verify` :

```bash
git commit --no-verify -m "Message de commit"
git push --no-verify
```

**Attention** : Cette pratique est déconseillée car elle contourne les contrôles de qualité.

## Avantages de cette approche

- Standardisation automatique du code
- Détection précoce des problèmes
- Réduction des erreurs dans les pull requests
- Cohérence du code à travers l'équipe
- Messages de commit uniformes et informatifs
- Garantie que seul du code compilable est poussé vers le dépôt distant
