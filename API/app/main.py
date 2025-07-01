from fastapi import FastAPI, HTTPException
from datetime import datetime
from pydantic import BaseModel
from enum import Enum


logs= []

app= FastAPI()

class LogLevel(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    DEBUG = "DEBUG"

class Log(BaseModel):
    id : int = None
    message: str
    timestamp: str = None # = datetime.now().isoformat()
    level: LogLevel
    service: str

@app.get("/")
def root():
    return {"message": f"Bienvenue sur cette API ! Date du jour: {datetime.now().strftime('%Y.%m.%d')}"}

@app.post("/logs")
def create_log(log: Log):
    logs.append(log)
    return logs