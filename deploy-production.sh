#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
cd /root/apps/portfolio-app/prod/

echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/main && git clean -f -d -e .env.production

for name in prod-gateway-1 prod-frontend-1 prod-backend-1; do
    pid=$(docker inspect --format '{{.State.Pid}}' $name 2>/dev/null)
    [ -n "$pid" ] && [ "$pid" != "0" ] && kill -9 $pid 2>/dev/null || true
    docker rm -f $name 2>/dev/null || true
done

docker compose -f docker-compose.production.yml --env-file .env.production pull
docker compose -f docker-compose.production.yml --env-file .env.production up -d --wait --wait-timeout 180

echo "Déploiement terminé!"