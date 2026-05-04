#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
cd /root/apps/portfolio-app/staging/

echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d -e .env.staging

# 1. Tuer les PIDs en premier (contourne le permission denied)
for container in staging-gateway-1 staging-frontend-1 staging-redis-1 staging-backend-1 staging-db-1; do
    kill -9 $(docker inspect --format '{{.State.Pid}}' $container 2>/dev/null) 2>/dev/null || true
done

# 2. Ensuite forcer la suppression
docker rm -f staging-gateway-1 staging-frontend-1 staging-redis-1 staging-backend-1 staging-db-1 2>/dev/null || true

# Télécharger les dernières images
docker compose -f docker-compose.staging.yml --env-file .env.staging pull

# Relancer les services
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d

echo "Déploiement terminé!"