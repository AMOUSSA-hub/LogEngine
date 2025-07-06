from fastapi import FastAPI, HTTPException, WebSocket,WebSocketDisconnect
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
#Gestion des différents sockets connecté à l'API
class ConnectionManager:
    #inti
    def __init__(self):
        self.active_connections:list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass  

manager = ConnectionManager()    

@app.get("/")
def root():
    return {"message": f"Bienvenue sur cette API ! Date du jour: {datetime.now().strftime('%Y.%m.%d')}"}

#Requête POST pour créer un log
@app.post("/logs")
async def create_log(log: Log):
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
            "service": log.service,
            
        },
        headers={"Content-Type": "application/json"},
        refresh = True       
    )
    
    # récupération de l'ID du log indexé
    log.id = response['_id'] 
    #Notifier les clients connectés à l'API
    await manager.broadcast("Nouveau Log Crée !")  

    return log

#Requête GET pour chercher des logs
@app.get("/logs/search")
def  search_logs(q: str = None, level: LogLevel = None, service: str = None,p: int = None):

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
    
    if p is not None:
         query_body["search_after"] = [p]

    response = client.search(
            index="logs-*",
            body=query_body,
            size= 20
        )

    return response['hits']['hits']

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
     await manager.connect(websocket)
     try:
        while True:
            await websocket.receive_text()  # Optionnel, ici on ne traite pas les messages entrants
     except WebSocketDisconnect:
        manager.disconnect(websocket)
        



   