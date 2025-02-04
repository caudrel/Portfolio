#!/bin/bash

# Terminer le script si une commande échoue
set -e

# Charger les variables d'environnement depuis .env.staging
if [ -f .env.staging ]; then
  export $(grep -v '^#' .env.staging | xargs)
else
  echo ".env.staging est introuvable, vérifie ton fichier!"
  exit 1
fi

# Mettre à jour le dépôt git et nettoyer les fichiers locaux
echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d

# Arrêter et supprimer les conteneurs en cours d'exécution
echo "Arrêt des services Docker en cours..."
docker compose -f docker-compose.staging.yml down

# Télécharger les dernières images Docker
echo "Téléchargement des dernières images Docker..."
docker compose -f docker-compose.staging.yml pull

# Lancer les services Docker en mode détaché avec les variables d'environnement
echo "Démarrage des services Docker..."
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d

echo "Déploiement staging terminé!"


