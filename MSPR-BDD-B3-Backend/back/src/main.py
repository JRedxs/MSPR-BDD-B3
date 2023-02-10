from fastapi import FastAPI, HTTPException
from models import Person
from database import *
from fastapi.middleware.cors import CORSMiddleware

# Connexion à la base de données
connection = MSQL_LOCAL

# Initialisez l'application 
app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users")
def get_user(email: str, password: str):
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Person WHERE email=%s and pwd=%s"
            cursor.execute(sql, (email, password))
            result = cursor.fetchall()
            users = []
            for row in result:
                users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})
            if users:
                return {"User": users}
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
    except:
        raise HTTPException(status_code=500, detail="Database connection error")


@app.get("/users/{user_id}")
def get_user_by_id(user_id: int):
    try :
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Person WHERE id_person=%s"
            cursor.execute(sql, (user_id,))
            result = cursor.fetchall()
            users = []
            for row in result:
                users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})
                return {"Person": users}
    except:
            return {"Personne inexistante"}
        


@app.post("/persons")
async def add_user(person: Person):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Person WHERE email=%s", (person.email,))
    if cursor.fetchone() is not None:
        raise HTTPException(status_code=409, detail="Email déjà existants")
    
    insert_query = "INSERT INTO Person (name, firstname, pwd, email, phone,id_role) VALUES (%s, %s, %s, %s,%s,%s)"
    cursor.execute(insert_query, (person.name, person.firstname, person.password, person.email, person.phone,person.id_role))
    connection.commit()


    return {"message": "Ajout avec succès"}

      

#### ROUTE DE DEV ####

# Créez la route pour sélectionner tous les utilisateurs
