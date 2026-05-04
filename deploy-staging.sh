#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
cd /root/apps/portfolio-app/staging/

echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d -e .env.staging

# Tuer et supprimer tous les containers staging (y compris les anciens)
for id in $(docker ps -a -q --filter "name=staging"); do
    kill -9 $(docker inspect --format '{{.State.Pid}}' $id 2>/dev/null) 2>/dev/null || true
done
docker ps -a -q --filter "name=staging" | xargs -r docker rm -f 2>/dev/null || true

# Télécharger les nouvelles images
docker compose -f docker-compose.staging.yml --env-file .env.staging pull

# Relancer tous les services
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d

echo "Déploiement terminé!"