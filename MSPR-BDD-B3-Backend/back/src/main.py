from fastapi import FastAPI, HTTPException
from models import *
from database import *
from fastapi.middleware.cors import CORSMiddleware

# Connexion à la base de données
connection = MSQL

# Initialisez l'application 
app = FastAPI()

#not ideal
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:8000",
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
    
    with connection.cursor() as cursor:
        try:
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
            cursor.close()
            raise HTTPException(status_code=500, detail="Database connection error !")


@app.get("/users/{user_id}")
def get_user_by_id(user_id: int):
    
    with connection.cursor() as cursor:
        try :
            sql = "SELECT * FROM Person WHERE id_person=%s"
            cursor.execute(sql, (user_id,))
            result = cursor.fetchall()
            users = []
            for row in result:
                users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})
                return {"Person": users}
        except:
            cursor.close()
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


@app.put("/advices")
def create_advice(advice: dict):
    
    with connection.cursor() as cursor:
        try:
            sql = "Update Photo set advice_title=%s, advice=%s where id_photo=%s"
            cursor.execute(sql, (advice["advice_title"], advice["advice"], advice["id_photo"]))
            connection.commit()
            cursor.close()
            return {"message": "Conseil enregistrée"}
        except:
            cursor.close()
            raise HTTPException(status_code=500, detail="Database connection error !")


@app.get("/advices")
def get_advices():
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Photo"
            cursor.execute(sql)
            result = cursor.fetchall()
            photo = []
            for row in result:
                photo.append({"id_photo": row[0], "advice_title": row[1], "advice": row[2], "id_plante": row[3]})
            cursor.close()
            if photo:
                return {"Photo": photo}
            else:
                raise HTTPException(status_code=400, detail="Erreur : ")
        except:
            cursor.close()
            raise HTTPException(status_code=500, detail="Database connection error !")
    

@app.get("/plant")
def get_plants():
    with connection.cursor() as cursor:
        try:
            sql = """
                SELECT Plante.id_plante, name, Photo.image_data
                FROM Plante
                LEFT JOIN (
                SELECT id_plante, MIN(id_photo) AS min_photo_id
                FROM Photo
                GROUP BY id_plante
                ) AS first_photo ON Plante.id_plante = first_photo.id_plante
                LEFT JOIN Photo ON first_photo.min_photo_id = Photo.id_photo;
                """
            cursor.execute(sql)
            result = cursor.fetchall()

            plants = []

            for row in result:
                plants.append({"id_plante": row[0], "name": row[1], "image_data": row[2]})
            
            cursor.close()
            if plants:
                return {"Plants": plants}
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
        except:
            raise HTTPException(status_code=500, detail="Database connection error !")

#maybe broken
@app.get("/plants")
def get_info_plants():
    
    with connection.cursor() as cursor:
        try:
            sql = """
            SELECT Garde.begining, Garde.finish,Person.name,Person.firstname, Person.email, 
            Person.phone, Person.id_person, Photo.image_data, Garde.id_plante, Garde.id_garde,Plante.latitude,Plante.longitude,
            Plante.town,Plante.name
            FROM Garde
            INNER JOIN Plante ON Garde.id_plante = Plante.id_plante
            INNER JOIN Person ON Plante.id_person = Person.id_person
            LEFT JOIN Photo ON Plante.id_plante = Photo.id_plante
            WHERE Garde.id_person is NULL;
            """
            cursor.execute(sql)
            result = cursor.fetchall()
            person_info = []
            for row in result:
                person_info.append({
                    "begining": row[0],
                    "finish": row[1],
                    "name": row[2],
                    "firstname": row[3],
                    "email": row[4],
                    "phone": row[5],
                    "id_person": row[6],
                    "image_data": row[7],
                    "id_plante": row[8],
                    "id_garde": row[9],
                    "latitude": row[10],
                    "longitude": row[11],
                    "town": row[12],
                    "name_plante": row[13]
                })
            cursor.close()
            if person_info:
                return {"Person": person_info}
            else:
                raise HTTPException(status_code=400, detail="Incorrect")
        except Exception as e:
            print(e)
            cursor.close()
            raise HTTPException(status_code=500, detail="Database connection error !")



@app.post("/plants_garde")
def add_garde(garde: Garde):
    
    with connection.cursor() as cursor:
        try:
            print(garde)
            sql = "INSERT INTO Garde (begining,finish,id_plante) VALUES(%s,%s,%s)"
            cursor.execute(sql, (garde.begining.strftime("%Y-%m-%d %H:%m:%S"),garde.finish.strftime("%Y-%m-%d %H:%m:%S"),garde.id_plante))
            print(garde)
            connection.commit()
            print(garde)
            cursor.close()
            return "Garde enregistrée"
        except Exception :
            cursor.close()
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

@app.get("/plant/{id_plante}")
def get_plant_by_id(id_plante: int):
    
    with connection.cursor() as cursor:
        try :
            sql = "SELECT * FROM Plante INNER JOIN Photo ON Plante.id_plante = Photo.id_plante WHERE Plante.id_plante=%s"
            cursor.execute(sql, (id_plante,))
            result = cursor.fetchall()
            plants = []
            for row in result:
                plants.append({"id_plante": row[0], "name": row[1], "number": row[2], "road_first": row[3], "road_second": row[4], "town": row[5], "postal_code": row[6], "latitude": row[7], "longitude": row[8], "id_person": row[9], "advice_title":row[11], "advice":row[12]})
            cursor.close()
            return {"Plante": plants}
        except:
            cursor.close()
            return {"Plante inexistante"}
    
@app.put("/garde/{id_garde}")
def put_garde_by_id(id_garde: int, id_person: int):
    with connection.cursor() as cursor:
        # Recherche du garde existant dans la base de données
        sql_select = "SELECT * FROM Garde WHERE id_garde = %s"
        cursor.execute(sql_select, (id_garde,))
        garde = cursor.fetchone()

        # Vérification que le garde existe dans la base de données
        if garde is None:
            return "Garde non trouvé", 404

        # Mise à jour du garde avec le nouvel ID de personne
        sql_update = "UPDATE Garde SET id_person = %s WHERE id_garde = %s"
        cursor.execute(sql_update, (id_person, id_garde))
        connection.commit()
        cursor.close()

        return "Garde mis à jour", 200


@app.get("/all_gardes")
def get_all_gardes():
    
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Garde"
            cursor.execute(sql)
            result = cursor.fetchall()
            garde = []
            for row in result:
                garde.append({"id_garde": row[0],"begining": row[1],"finish": row[2],"id_person": row[3],"id_plante": row[4]})
            return {"Garde": garde}
        except mysql.connector.Error as error:
            cursor.close()
            return {"Error message": str(error)}
    

@app.get("/plantandgallery/{id_plante}")
def get_plant_photos_by_id(id_plante: int):
    
    with connection.cursor() as cursor:
        try :
            sql = "SELECT name, id_person, image_data, advice_title, advice, id_photo FROM Plante INNER JOIN Photo ON Plante.id_plante = Photo.id_plante WHERE Plante.id_plante=%s"
            cursor.execute(sql, (id_plante,))
            result = cursor.fetchall()
            plants = []
            firstLoop = True
            for row in result:
                if firstLoop:
                    plants.append({"name": row[0], "id_person": row[1]})
                    firstLoop = False
                plants.append({"id_photo":row[5],"image_data": row[2], "advice_title": row[3], "advice": row[4]})
            cursor.close()
            return {"Plante": plants}
        except:
            cursor.close()
            return {"Plante inexistante"}
