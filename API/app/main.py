from fastapi import FastAPI, HTTPException
from datetime import datetime
from pydantic import BaseModel
from enum import Enum
from opensearchpy import OpenSearch
import os
from fastapi.middleware.cors import CORSMiddleware

#connexion à OpenSearch avec les variables d'environnement
client = OpenSearch(
    hosts=[{'host': os.environ.get('OPENSEARCH_HOST'), 'port': os.environ.get('OPENSEARCH_PORT')}],
)

app = FastAPI()

frontend_address = f"http://{os.environ.get('FRONTEND_HOST')}:{os.environ.get('FRONTEND_PORT')}"


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Enum pour le "level" d'un log
class LogLevel(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    DEBUG = "DEBUG"

# Modèle de données pour un log
class Log(BaseModel):
    id : str = None
    message: str
    timestamp: str
    level: LogLevel
    service: str
    

@app.get("/")
def root():
    return {"message": f"Bienvenue sur cette API ! Date du jour: {datetime.now().strftime('%Y.%m.%d')}"}

#Requête POST pour créer un log
@app.post("/logs")
def create_log(log: Log):
    #vérification du format de la date
    try:
        datetime.fromisoformat(log.timestamp)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid timestamp format. Use ISO 8601 format.")
    #création du nom de l'index basé sur la date du jour
    index_name = f"logs-{datetime.now().strftime('%Y.%m.%d')}"
    # vérification de l'existence de l'index et création si nécessaire
    client.indices.exists(index=index_name) or client.indices.create(index=index_name)
    #indexation du log dans OpenSearch
    response = client.index(
        index=index_name,
        body={
            "message": log.message,
            "timestamp": log.timestamp,
            "level": log.level,
            "service": log.service
        },
        headers={"Content-Type": "application/json"}
    )
    # récupération de l'ID du log indexé
    log.id = response['_id']       
    return log

#Requête GET pour chercher des logs
@app.get("/logs/search")
def search_logs(q: str = None, level: LogLevel = None, service: str = None):

    # Construction de la requête de recherche
    filters = []
    if q :
            filters.append({"match_phrase_prefix": {"message": q}})
    if level :
            filters.append({"term": {"level.keyword": level}})
    if service:
            filters.append({"prefix": {"service": service}})

    query_body = {
            "query": {
                "bool": {
                    "must": filters 
                }
            },
            "sort": [
                {"timestamp": {"order": "desc"}}
            ]
        }

    response = client.search(
            index="logs-*",
            body=query_body
        )

    return response['hits']['hits']

   