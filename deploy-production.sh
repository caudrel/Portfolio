#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/main && git clean -f -d && \

# Arrêter et supprimer les conteneurs en cours d'exécution
docker compose -f docker-compose.production.yml down && \

# Télécharger les dernières images Docker
docker compose -f docker-compose.production.yml pull && \

# Lancer les services Docker en mode détaché avec les variables d'environnement
docker compose -f docker-compose.production.yml --env-file .env.production up -d;

echo "Déploiement terminé!"