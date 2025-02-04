#!/bin/sh
# Mettre à jour le dépôt git et nettoyer les fichiers locaux
echo "Mise à jour du dépôt Git..."
git fetch origin && git reset --hard origin/dev && git clean -f -d && \

# Arrêter et supprimer les conteneurs en cours d'exécution
docker compose -f docker-compose.staging.yml down && \

# Télécharger les dernières images Docker
docker compose -f docker-compose.staging.yml pull && \

# Lancer les services Docker en mode détaché avec les variables d'environnement
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d;

echo "Déploiement terminé!"