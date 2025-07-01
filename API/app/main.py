from fastapi import FastAPI, HTTPException
from datetime import datetime
from pydantic import BaseModel
from enum import Enum
from opensearchpy import OpenSearch
import os

#connexion à OpenSearch
client = OpenSearch(
    hosts=[{'host': os.environ.get('OPENSEARCH_HOST'), 'port': os.environ.get('OPENSEARCH_PORT')}],
)

app= FastAPI()

class LogLevel(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    DEBUG = "DEBUG"

class Log(BaseModel):
    id : str = None
    message: str
    timestamp: str # = datetime.now().isoformat()
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

    log.id = response['_id']
       
    
    return log

# @app.get("logs/search")
# def search_logs(q: str = None, level: LogLevel = None, service: str = None):
#     results = logs
   