from pydantic import BaseModel
from datetime import datetime

class Person(BaseModel):
        name: str
        firstname: str
        password: str
        email: str
        phone: str
        id_role: int

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
   latitude:int
   longitude:int
   id_person:int
   

class Garde(BaseModel):
   id_garde: int
   beginning: datetime
   finish: datetime