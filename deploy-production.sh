#!/bin/bash

# Terminer le script si une commande échoue
set -e

# Charger les variables d'environnement depuis .env.production
if [ -f .env.production ]; then
  export $(grep -v '^#' .env.production | xargs)
else
  echo ".env.production est introuvable, vérifie ton fichier!"
  exit 1
fi

# Mettre à jour le dépôt git et nettoyer les fichiers locaux
echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/main && git clean -f -d

# Arrêter et supprimer les conteneurs en cours d'exécution
echo "Arrêt des services Docker en cours..."
docker compose -f docker-compose.production.yml down

# Télécharger les dernières images Docker
echo "Téléchargement des dernières images Docker..."
docker compose -f docker-compose.production.yml pull

# Lancer les services Docker en mode détaché avec les variables d'environnement
echo "Démarrage des services Docker..."
docker compose -f docker-compose.production.yml --env-file .env.production up -d

echo "Déploiement terminé!"
