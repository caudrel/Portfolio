#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
cd /root/apps/portfolio-app/staging/

echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d -e .env.staging

# Forcer la suppression des containers
docker rm -f staging-gateway-1 staging-frontend-1 staging-redis-1 staging-backend-1 staging-db-1 2>/dev/null || true

# Télécharger les dernières images
docker compose -f docker-compose.staging.yml --env-file .env.staging pull

# Relancer les services
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d

echo "Déploiement terminé!"