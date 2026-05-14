#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
cd /root/apps/portfolio-app/staging/

echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d -e .env.staging

# Tuer uniquement les containers APPLICATIFS (pas DB ni Redis → données préservées)
for name in staging-gateway-1 staging-frontend-1 staging-backend-1; do
    pid=$(docker inspect --format '{{.State.Pid}}' $name 2>/dev/null)
    [ -n "$pid" ] && [ "$pid" != "0" ] && kill -9 $pid 2>/dev/null || true
    docker rm -f $name 2>/dev/null || true
done

# Télécharger les nouvelles images
docker compose -f docker-compose.staging.yml --env-file .env.staging pull

# Relancer les services (attend 180s que tout soit healthy)
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d --no-recreate --wait --wait-timeout 180

echo "Déploiement terminé!"