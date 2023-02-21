from fastapi import FastAPI, HTTPException
from models import *
from database import *
from fastapi.middleware.cors import CORSMiddleware

# Connexion à la base de données
connection = MSQL

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
        raise HTTPException(status_code=500, detail="Database connection error !")


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

    cursor.close()
    return {"message": "Ajout avec succès"}


@app.post("/image")
async def register_image(image: NewImage):
    request_select = "select id_plante from Plante where id_plante = %s limit 1;"
    request_insert = "insert into Photo (image_data, id_plante) values(%s,%s);"

    cursor = connection.cursor()
    cursor.execute(request_select, (image.id_plante))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Photo pour une plante inexistante")
    
    cursor.execute(request_insert, (image.data,image.id_plante))
    connection.commit()
    cursor.close()
    return {"message": "Photo enregistrée"}
    
@app.get("/image/{id}", response_model=DBImage)
def send_image(id):
    request_select = "select id_photo, id_plante, image_data, advice_title, advice from Photo where id_photo = %s limit 1;"
    cursor = connection.cursor()
    cursor.execute(request_select, (id))
    rowImage = cursor.fetchone()
    if rowImage is None:
        raise HTTPException(status_code=404, detail="Photo inexistante")
    
    image = DBImage(id_photo = rowImage[0], id_plante = rowImage[1], data = rowImage[2],advice="", advice_title="")#, advice_title = rowImage[3], advice = rowImage[4]
    if not rowImage[3] is None and not rowImage[4] is None:
        image.advice = rowImage[3]
        image.advice_title = rowImage[4]

    cursor.close()
    return image

#Add advice
@app.post("/advices")
def create_advice(advice: dict):
    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO Photo (advice_title, advice, id_plante) VALUES (%s, %s, %s)"
            cursor.execute(sql, (advice["advice_title"], advice["advice"], advice["id_plante"]))
            connection.commit()
            new_id = cursor.lastrowid
            return {"id_photo": new_id, **advice}
    except:
        raise HTTPException(status_code=500, detail="Database connection error !")


@app.get("/advices")
def get_advices():
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Photo"
            cursor.execute(sql)
            result = cursor.fetchall()
            photo = []
            for row in result:
                photo.append({"id_photo": row[0], "advice_title": row[1], "advice": row[2], "id_plante": row[3]})
            if photo:
                return {"Photo": photo}
            else:
                raise HTTPException(status_code=400, detail="Erreur : ")
    except:
        raise HTTPException(status_code=500, detail="Database connection error !")
    

@app.get("/plant")
def get_plants():
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Plante"
            cursor.execute(sql)
            result = cursor.fetchall()
            plants = []

            for row in result:
                plants.append({"id_plante": row[0], "name": row[1], "number": row[2], "road_first": row[3], "road_second": row[4], "town": row[5], "postal_code": row[6], "latitude": row[7], "longitude": row[8], "id_person": row[9]})
            if plants:
                return {"Plants": plants}
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
    except:
        raise HTTPException(status_code=500, detail="Database connection error !")


@app.get("/plants")
def get_info_plants():
    try:
        with connection.cursor() as cursor:
            #sql = "SELECT beginning,finish,name,firstname,email,phone from Garde INNER JOIN Person"
            sql = "SELECT * FROM Garde"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result

            # for row in result:
            #     person_info.append({"beginning": row[0],"finish": row[1],"name": row[2],"firstname": row[3],"email": row[4],"phone": row[5]})
            # if person_info:
            #     return {"Person": person_info}
            # else:
            #     raise HTTPException(status_code=400, detail="Incorrect")
    except:
        raise HTTPException(status_code=500, detail="Database connection error !")



@app.post("/plants_garde")
def add_garde(garde: Garde):
    try:
        with connection.cursor() as cursor:
            sql = "INSERT INTO Garde (id_garde,begining,finish,id_plante) VALUES(%s,%s,%s,%s)"
            cursor.execute(sql, (garde.id_garde,garde.begining.strftime("%Y-%m-%d %H:%m:%S"),garde.finish.strftime("%Y-%m-%d %H:%m:%S"),garde.id_plante))
            connection.commit()
            cursor.close()
            return {"ok"}
    except Exception as e :
        print(e)
        raise HTTPException(status_code=500, detail="Error !")


@app.post("/plante")
async def register_plante(plante : PlantToCreate):
    cursor = connection.cursor()
    sql = "Insert into Plante (id_person, name, number, road_first, road_second, town, postal_code, latitude, longitude) values (%s, %s, %s, %s, %s, %s, %s, %s, %s);"
    val = (plante.id_person, plante.name, plante.number, plante.road_first, plante.road_second, plante.town, plante.postal_code, plante.latitude, plante.longitude)
    cursor.execute(sql, val)

    sql = "select id_plante from Plante order by 1 Desc limit 1;"
    cursor.execute(sql)
    result = cursor.fetchone()

    connection.commit()
    cursor.close()
    return {"message": "Plante enregistrée", "id_plante": result[0]}
