from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pymysql

# Connexion à la base de données
connection = pymysql.connect(host='localhost', user='admin', password='admin', db='Arosaje-db', port=3306)

# Initialisez l'application 
app = FastAPI()



class Person(BaseModel):
        name: str
        firstname: str
        password: str
        email: str
        phone: str
        id_role: int


# Créez la route pour sélectionner tous les utilisateurs
@app.get("/users")
def get_users():
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Person"
            cursor.execute(sql)
            result = cursor.fetchall()
            users = []
            for row in result:
                users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})
            return {"Person": users}
    except:
        return {"erreur": "aucun user récupéré"}, 500

@app.get("/users/{user_id}")
def get_user_by_id(user_id: int):
    cursor = connection.cursor()
    sql = "SELECT * FROM Person WHERE id_person=%s"
    cursor.execute(sql, (user_id,))
    result = cursor.fetchall()
    users = []
    for row in result:
        users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})
    return {"Person": users}






@app.post("/persons")
async def add_user(person: Person):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Person WHERE email=%s", (person.email,))
    if cursor.fetchone() is not None:
        raise HTTPException(status_code=409, detail="Email déjà existants")
    
    insert_query = "INSERT INTO Person (name, firstname, pwd, email, phone,id_role) VALUES (%s, %s, %s, %s,%s,%s)"
    cursor.execute(insert_query, (person.name, person.firstname, person.password, person.email, person.phone,person.id_role))
    connection.commit()
    cursor.close()

    return {"message": "Ajout avec succès"}

      