#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
cd /root/apps/portfolio-app/staging/

echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d -e .env.staging

# Tuer uniquement les containers applicatifs (pas DB ni Redis)
for container in staging-gateway-1 staging-frontend-1 staging-backend-1; do
    kill -9 $(docker inspect --format '{{.State.Pid}}' $container 2>/dev/null) 2>/dev/null || true
done

docker rm -f staging-gateway-1 staging-frontend-1 staging-backend-1 2>/dev/null || true

# Télécharger les nouvelles images
docker compose -f docker-compose.staging.yml --env-file .env.staging pull

# Relancer tous les services (DB et Redis ne seront pas recréés si inchangés)
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d

echo "Déploiement terminé!"