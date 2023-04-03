# -*- coding: utf-8 -*-
from fastapi import FastAPI, HTTPException, Response
from models import *
from database import *
from fastapi.middleware.cors import CORSMiddleware
from security import *
from PIL import Image
from exif import Image

# Connexion à la base de données
connection = MSQL

# Initialisez l'application
app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# not ideal
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



def takeLatinTupleGetUtf8List(theTuple):
    newList = []
    for n in range(len(theTuple)):
        if isinstance(theTuple[n], str):
            newList.append(theTuple[n].encode('latin-1').decode('utf-8'))
        else:
            newList.append(theTuple[n])
    return newList


@app.post("/token", summary="Création de personnes et ajout d'un accès token")
def login(person: Person):
    hashed_password = pwd_context.hash(person.password)

    with connection.cursor() as cursor:
        insert_query = "INSERT INTO Person (name, firstname, pwd, email, phone,id_role) VALUES (%s, %s, %s, %s,%s,%s)"
        cursor.execute(insert_query, (person.name, person.firstname, hashed_password, person.email, person.phone,person.id_role))
        connection.commit()

        # Get inserted person's ID
        cursor.execute("SELECT LAST_INSERT_ID()")
        person_id = cursor.fetchone()[0]

    # Generate JWT payload
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user_id=str(person_id), expires_delta=access_token_expires)

    return {"Ajout": "Avec succès", "access_token": access_token, "token_type": "bearer"}


@app.post("/token_log")
def login_token(email: str, password: str):
    with connection.cursor() as cursor:
        query = "SELECT * FROM Person WHERE email=%s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()
        if result:
            user_id = result[0]
            hashed_password = result[3]
            if pwd_context.verify(password.encode("utf-8"), hashed_password):
                access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
                access_token = create_access_token(user_id=user_id, expires_delta=access_token_expires)
                return {"access_token": access_token, "token_type": "bearer"}
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
        else:
            raise HTTPException(status_code=400, detail="Incorrect email or password")



        

@app.get("/users", summary="Récupération des personnes en fonction de leur email & mot de passe")
def get_user(email: str, password: str):
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Person WHERE email=%s"
            cursor.execute(sql, (email,))
            result = cursor.fetchone()
            if result:
                row = takeLatinTupleGetUtf8List(result)
                hashed_password = row[3].encode("utf-8") 
                if pwd_context.verify(password.encode("utf-8"), hashed_password):
                    user = {
                        "id_person": row[0],
                        "name": row[1],
                        "firstname": row[2],
                        "pwd": row[3],
                        "email": row[4],
                        "phone": row[5],
                        "latitude": row[6],
                        "longitude": row[7],
                        "id_role": row[8]
                    }
                    return {"User": user }
                else:
                    raise HTTPException(status_code=400, detail="Incorrect email or password")
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
        except:
            cursor.close()
            raise HTTPException(status_code=500, detail="Database connection error!")


@app.get("/user/me")
async def get_current_user(current_user: str = Depends(BearerAuth())):
    decoded_token = decoded_jwt(current_user)
    user_id = decoded_token.get("user_id")
    with connection.cursor() as cursor:
        query = "SELECT * FROM Person WHERE id_person=%s"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        if result:
            user = {
                "user_id" : result[0],
                "name": result[1],
                "firstname": result[2],
                "email": result[4],
                "phone": result[5],
            }
            return {"user": user}
        else:
            raise HTTPException(status_code=404, detail="User not found")
        
@app.get("/users_all" ,summary="Récupération de toutes les utilisateurs")
def get_user():
    
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Person"
            cursor.execute(sql)
            results = cursor.fetchall()
            users = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})
            if users:
                return {"User": users}
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
        except:
            cursor.close()
            raise HTTPException(status_code=500, detail="Database connection error !")


@app.get("/users/{user_id}", summary="Récupération en fonction de l'id utilisateur" )
def get_user_by_id(user_id: int ):
    
    with connection.cursor() as cursor:
        try :
            sql = "SELECT * FROM Person WHERE id_person=%s"
            cursor.execute(sql, (user_id,))
            result = cursor.fetchall()
            users = []
            row = takeLatinTupleGetUtf8List(result[0])
            
            users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})

            return {"Person": users}
        except:
            cursor.close()
            raise HTTPException(status_code=404, detail="Personne inexistante")


# @app.post("/image" , summary="Insertion d'une image")
# async def register_image(image: NewImage):
#     request_select = "select id_plante from Plante where id_plante = %s limit 1;"
#     request_insert = "insert into Photo (image_data, id_plante) values(%s,%s);"

#     cursor = connection.cursor()
#     cursor.execute(request_select, (image.id_plante))
#     if cursor.fetchone() is None:
#         raise HTTPException(status_code=404, detail="Photo pour une plante inexistante")        
#     cursor.execute(request_insert, (image.data,image.id_plante))
#     connection.commit()
#     cursor.close()
#     return {"message": "Photo enregistrée"}


@app.post("/image", summary="Insertion d'une image")
async def register_image(image: NewImage = Depends(BearerAuth())):
    request_select = "SELECT id_plante FROM Plante WHERE id_plante = %s LIMIT 1;"
    request_insert = "INSERT INTO Photo (image_data, id_plante) VALUES (%s, %s);"

    cursor = connection.cursor()
    cursor.execute(request_select, (image.id_plante,))
    if cursor.fetchone() is None:
       raise HTTPException(status_code=404, detail="Photo pour une plante inexistante")
    encoded_data = image.data.encode()
    my_img = Image(encoded_data)
    try:
        if 'GPSInfo' in my_img:
            del my_img['GPSInfo']
        else: 
            print('pas de métadata')
    except Exception as e:
        print(e)
    cursor.execute(request_insert, (image.data, image.id_plante))
    connection.commit()
    cursor.close()
    return {"message": "Photo enregistrée"}



    
@app.get("/image/{id}", response_model=DBImage, summary="Récupération d'une image en fonction de l'id" )
def send_image(id = Depends(BearerAuth())):
    request_select = "select id_photo, id_plante, image_data, advice_title, advice from Photo where id_photo = %s limit 1;"
    cursor = connection.cursor()
    cursor.execute(request_select, (id))
    rowImage = cursor.fetchone()
    if rowImage is None:
        raise HTTPException(status_code=404, detail="Photo inexistante")
    
    rowImage = takeLatinTupleGetUtf8List(rowImage)
    
    image = DBImage(id_photo = rowImage[0], id_plante = rowImage[1], data = rowImage[2],advice="", advice_title="")#, advice_title = rowImage[3], advice = rowImage[4]
    if not rowImage[3] is None and not rowImage[4] is None:
        image.advice = rowImage[3]
        image.advice_title = rowImage[4]

    cursor.close()
    return image


@app.put("/advices" , summary="Modification d'un titre conseil")
def create_advice(advice: dict = Depends(BearerAuth())):
    
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
        


@app.get("/advices" , summary="Récupération des photos")
def get_advices():
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Photo"
            cursor.execute(sql)
            results = cursor.fetchall()
            photo = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                photo.append({"id_photo": row[0], "advice_title": row[1], "advice": row[2], "id_plante": row[3]})
            cursor.close()
            if photo:
                return {"Photo": photo}
            else:
                raise HTTPException(status_code=400, detail="Erreur : ")
        except:
            cursor.close()
            raise HTTPException(status_code=500, detail="Database connection error !")
    

@app.get("/plant" , summary="Récupération des plantes")
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
            results = cursor.fetchall()

            plants = []

            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                plants.append({"id_plante": row[0], "name": row[1], "image_data": row[2]})
            
            cursor.close()
            if plants:
                return {"Plants": plants}
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
        except:
            raise HTTPException(status_code=500, detail="Database connection error !")

#maybe broken
@app.get("/plants" , summary="Récupération des garde de plantes")
def get_info_plants(token: str = Depends(BearerAuth())):
    
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
            results = cursor.fetchall()
            person_info = []
            for row in results:
                # row = takeLatinTupleGetUtf8List(result) a corriger
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



@app.post("/plants_garde" , summary="Insertion des gardes")
def add_garde(garde: Garde = Depends(BearerAuth())):
    
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
        


@app.post("/plante" , summary="Insertion des plantes")
async def register_plante(plante : PlantToCreate = Depends(BearerAuth())):
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

@app.get("/plant/{id_plante}" , summary="Récupération des plantes en fonction de son id")
def get_plant_by_id(id_plante: int = Depends(BearerAuth())):
    
    with connection.cursor() as cursor:
        try :
            sql = "SELECT * FROM Plante INNER JOIN Photo ON Plante.id_plante = Photo.id_plante WHERE Plante.id_plante=%s"
            cursor.execute(sql, (id_plante,))
            results = cursor.fetchall()
            plants = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                plants.append({"id_plante": row[0], "name": row[1], "number": row[2], "road_first": row[3], "road_second": row[4], "town": row[5], "postal_code": row[6], "latitude": row[7], "longitude": row[8], "id_person": row[9], "advice_title":row[11], "advice":row[12]})
            cursor.close()
            return {"Plante": plants}
        except:
            cursor.close()
            return {"Plante inexistante"}
    
@app.put("/garde/{id_garde}" , summary="Récupération des gardes en fonction de son id")
def put_garde_by_id(id_garde: int, id_person: int = Depends(BearerAuth())):
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


@app.get("/all_gardes" , summary="Récupération des gardes")
def get_all_gardes(token : str = Depends(BearerAuth())):
    
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Garde"
            cursor.execute(sql)
            results = cursor.fetchall()
            garde = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                garde.append({"id_garde": row[0],"begining": row[1],"finish": row[2],"id_person": row[3],"id_plante": row[4]})
            return {"Garde": garde}
        except mysql.connector.Error as error:
            cursor.close()
            return {"Error message": str(error)}
    

@app.get("/plantandgallery/{id_plante}" , summary="Récupération des photos de plantes en fonction de leur id")
def get_plant_photos_by_id(id_plante: int = Depends(BearerAuth())):
    
    with connection.cursor() as cursor:
        try :
            sql = "SELECT name, id_person, image_data, advice_title, advice, id_photo FROM Plante INNER JOIN Photo ON Plante.id_plante = Photo.id_plante WHERE Plante.id_plante=%s"
            cursor.execute(sql, (id_plante,))
            results = cursor.fetchall()
            plants = []
            firstLoop = True
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                if firstLoop:
                    plants.append({"name": row[0], "id_person": row[1]})
                    firstLoop = False
                plants.append({"id_photo":row[5],"image_data": row[2], "advice_title": row[3], "advice": row[4]})
            cursor.close()
            return {"Plante": plants}
        except:
            cursor.close()
            return {"Plante inexistante"}
