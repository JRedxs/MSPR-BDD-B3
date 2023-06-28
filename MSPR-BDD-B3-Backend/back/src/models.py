# -*- coding: utf-8 -*-

from pydantic import BaseModel
from datetime import datetime
from typing import Optional,List,Dict
from websocket import WebSocket
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

class Person(BaseModel):
        name: str
        firstname: str
        password: str
        email: str
        phone: str
        last_login: Optional[datetime] = None
        id_role: int = 2

class Image(BaseModel):
        data: str

class NewImage(Image):
        id_plante: int

class DBImage(NewImage):
        id_photo: int
        advice_title: str
        advice: str
        
class Advice(BaseModel):
    id_photo:int
    advice_title: str
    advice: str
    id_plante: int

class Plant(BaseModel):
   id_plante:int
   name:str
   number:int
   road_first:str
   road_second:str
   town:str
   postal_code:int
   latitude:float
   longitude:float
   id_person:int
   
   

class Garde(BaseModel):
   id_plante: int
   begining: str
   finish: str

class PlantToCreate(BaseModel):
        id_person : int
        name : str
        number: int
        road_first : str
        road_second : str
        town : str
        postal_code : int
        latitude : float
        longitude : float 

class Message(BaseModel):
    id: int
    text: str
    
class ConnectionManager:
    
    def __init__(self) -> None:
        self.active_connections: List[WebSocket] = []

    async def connect(self,websocket:WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
    
    def disconnect(self,websocket:WebSocket):
        self.active_connections.remove(websocket)
    
    async def send_personal_message(self, message: str,websocket:WebSocket):
         await websocket.send_text(message)
        
    async def broadcast(self,message:str):
        for connection in self.active_connections:
            await connection.send_text(message)

class Message(BaseModel):
    id_emetteur: int
    id_receveur: int
    message: str