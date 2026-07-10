# BRAC V1.2

Application mobile sportive **BRAC** développée avec **Expo / React Native**.

## Fonctions principales

- Icône Android BRAC haltère violet/bleu.
- Splash screen animé.
- Accueil avec **Créer**, **Démarrer**, **Stats**.
- Création de séances personnalisées.
- Bibliothèque de plus de 300 exercices.
- Tempo divisé en 4 champs : montée, pause haute, descente, pause basse.
- Chrono repos avec alerte visuelle rouge.
- Bilan estimé / réalisé.
- Stats calories et tonnage.
- Aucune permission Android sensible.

## Installation locale

```cmd
npm install
npm start
```

Puis scanner le QR code avec Expo Go.

## Générer un APK Android avec Expo EAS

```cmd
npm install -g eas-cli
eas login
set EAS_NO_VCS=1
eas init
eas build -p android --profile preview
```

À la fin, Expo donne un lien `.apk` téléchargeable.

## Utilisation avec GitHub

### 1. Créer un dépôt GitHub

Sur GitHub, créer un nouveau dépôt vide, par exemple :

```txt
brac-v1-2
```

### 2. Envoyer le projet sur GitHub

Dans le dossier du projet :

```cmd
git init
git add .
git commit -m "BRAC V1.2"
git branch -M main
git remote add origin https://github.com/TON_COMPTE/brac-v1-2.git
git push -u origin main
```

### 3. Build APK automatique avec GitHub Actions

Ce projet contient un workflow :

```txt
.github/workflows/eas-build.yml
```

Pour l'utiliser :

1. Créer un token Expo depuis ton compte Expo.
2. Dans GitHub : **Settings > Secrets and variables > Actions**.
3. Ajouter un secret nommé :

```txt
EXPO_TOKEN
```

4. Aller dans **Actions > Build Android APK > Run workflow**.

Le build sera lancé automatiquement sur Expo EAS.

## Configuration Android

Le projet utilise :

```json
"permissions": []
```

Il ne demande donc aucune permission sensible. Android peut quand même afficher un avertissement lors d'une installation manuelle hors Play Store : c'est normal pour tout APK installé en dehors du Play Store.
