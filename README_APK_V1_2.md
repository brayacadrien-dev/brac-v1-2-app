# BRAC V1.2 - APK Android

## Corrections intégrées
- Icône BRAC haltère violet/bleu sur Android.
- Nom application : BRAC.
- Splash screen animé dans l'application.
- Identité visuelle noir carbone / violet / bleu sur tous les écrans.
- Bibliothèque de plus de 300 exercices.
- Catégories exercices mieux alignées et lisibles.
- Tempo divisé en 4 champs : montée, arrêt haut, descente, arrêt bas.
- Fenêtre échauffement personnalisée BRAC, sans fenêtre Android blanche.
- Création jusqu'à 10 séances, suppression simple, démarrage de séance.
- Chrono repos avec clignotement rouge quand le temps cible est atteint.
- Bilan estimé/réalisé et historique stats calories/tonnage.
- Permissions Android minimales : aucune permission sensible demandée.

## Générer l'APK
Dans ce dossier :

```cmd
npm install
set EAS_NO_VCS=1
eas init
eas build -p android --profile preview
```

À la fin, clique sur le lien `.apk` donné par Expo.
