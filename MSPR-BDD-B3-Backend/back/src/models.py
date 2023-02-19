from pydantic import BaseModel

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