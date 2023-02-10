from pydantic import BaseModel



class Person(BaseModel):
        name: str
        firstname: str
        password: str
        email: str
        phone: str
        id_role: int
