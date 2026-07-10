# Guide GitHub + Expo pour BRAC V1.2

## Pour mettre BRAC sur GitHub

1. Installe Git : https://git-scm.com/download/win
2. Ouvre le dossier `brac-v1-2-app`.
3. Clique dans la barre du chemin, tape `cmd`, puis Entrée.
4. Tape :

```cmd
git init
git add .
git commit -m "BRAC V1.2"
git branch -M main
git remote add origin https://github.com/TON_COMPTE/brac-v1-2.git
git push -u origin main
```

## Pour compiler l'APK avec Expo

```cmd
npm install
eas login
eas init
eas build -p android --profile preview
```

## Pour compiler depuis GitHub Actions

1. Va sur Expo et crée un token d'accès.
2. Va dans GitHub > Settings > Secrets and variables > Actions.
3. Ajoute un secret : `EXPO_TOKEN`.
4. Va dans GitHub > Actions > Build Android APK > Run workflow.
