#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
cd /root/apps/portfolio-app/staging/

echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d -e .env.staging && \

# Forcer l'arrêt des containers
docker compose -f docker-compose.staging.yml --env-file .env.staging kill 2>/dev/null || true && \
docker compose -f docker-compose.staging.yml --env-file .env.staging down --remove-orphans && \

# Télécharger les dernières images
docker compose -f docker-compose.staging.yml --env-file .env.staging pull && \

# Relancer les services
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d

echo "Déploiement terminé!"