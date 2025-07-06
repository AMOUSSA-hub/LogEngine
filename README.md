# 🛠️ Lancer l'application avec Docker

## 🚀 Get Started

Cette application utilise Docker pour orchestrer plusieurs services : une API, une interface frontend, et un moteur de recherche OpenSearch. Suivez les étapes ci-dessous pour démarrer correctement l'application en local.

---

### 1. 📄 Configuration des fichiers `.env`

Avant de lancer l'application, vous devez **créer les fichiers `.env` nécessaires** à partir des modèles `.env.example` fournis.



> **📝 Note importante :**  
> Pour assurer la communication entre les services dans Docker, **les noms d'hôtes utilisés dans les variables d’environnement doivent correspondre exactement aux noms des services définis dans le `docker-compose.yml`**, à savoir :
> - `api`
> - `frontend`
> - `opensearch-node`

---

### 2. 📁 Se placer à la racine du projet

Assurez-vous d’être dans le dossier contenant le fichier `docker-compose.yml` :

```bash
cd ./LogEngine
```
3. 🧱 Lancer les services Docker

Utilisez la commande suivante pour construire et démarrer tous les services :

sudo docker compose up --build

Docker va :

    Construire les images nécessaires

    Démarrer les conteneurs de l'API, du frontend, et d'OpenSearch
    

4. 🌐 Accéder à l'application

Une fois les services démarrés, ouvrez votre navigateur à l’adresse suivante :

http://localhost:${FRONTEND_PORT}

    Remplacez ${FRONTEND_PORT} par la valeur que vous avez définie dans le fichier .env à la racine.

5. 🛑 Arrêter l'application

Quand vous avez terminé, n’oubliez pas d’arrêter et nettoyer les conteneurs Docker avec :

sudo docker compose down

Cela éteint proprement tous les services.
📌 Remarque finale

Si vous rencontrez des erreurs de connexion entre les services, vérifiez :

    Que tous les fichiers .env sont correctement remplis

    Que les noms des hôtes dans vos variables pointent bien vers api, frontend, ou opensearch-node


