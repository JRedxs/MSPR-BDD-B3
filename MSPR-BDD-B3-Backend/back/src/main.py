from fastapi import FastAPI, HTTPException
from models import Person,NewImage,DBImage
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




@app.options("/persons")
async def add_user_options(person: Person):
    return {"Allow": "POST"}


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

      

@app.post("/image")
def register_image(image: NewImage):
    request_select = "select id_plante from Plante where id_plante = %s limit 1;"
    request_insert = "insert into Photo (image_data) values(%s);"

    cursor = connection.cursor()
    cursor.execute(request_select, (image.id_plante))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Photo pour une plante inexistante")
    
    cursor.execute(request_insert, (image.data))
    connection.commit()
    cursor.close()
    return {"message": "Photo enregistrée"}
    
@app.get("/image/{id}", response_model=DBImage)
def send_image(id):
    request_select = "select * from Photo where id_photo = %s limit 1;"
    cursor = connection.cursor()
    cursor.execute(request_select, (id))
    image = cursor.fetchone()
    if image is None:
        raise HTTPException(status_code=404, detail="Photo inexistante")
 
    cursor.close()
    return image