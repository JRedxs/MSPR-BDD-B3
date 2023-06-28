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
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, websocket: WebSocket, user_id: int):
        del self.active_connections[user_id]

    async def send_personal_message(self, message: str, receiver_id: int):
        receiver_socket = self.active_connections.get(receiver_id)
        if receiver_socket:
            await receiver_socket.send_text(message)

    async def broadcast(self, data: str):
        for connection, user_id in self.active_connections.items():
            await connection.send_text(data)