# -*- coding: utf-8 -*-
from fastapi import FastAPI, HTTPException, Response, BackgroundTasks
from models import *
from database import *
from fastapi.middleware.cors import CORSMiddleware
from security import *
from exif import Image
from cryptography.fernet import Fernet
from crypto import *
from datetime import datetime, timedelta
import json

# Connexion à la base de données
connection = MSQL

# Initialisez l'application
app = FastAPI()

manager = ConnectionManager()

encryption = Encryption()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# not ideal
origins = ["*"]

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


def has_not_logged_in_one_year(last_login):
    one_year_ago = datetime.now() - timedelta(days=365)
    return last_login < one_year_ago


def delete_inactive_users_background(background_tasks: BackgroundTasks):
    background_tasks.add_task(delete_inactive_users)


async def delete_inactive_users():
    with connection.cursor() as cursor:
        select_query = "SELECT id_person, last_login FROM Person"
        cursor.execute(select_query)
        results = cursor.fetchall()

        for result in results:
            person_id = result[0]
            last_login = result[1]

            if has_not_logged_in_one_year(last_login):
                delete_query = "DELETE FROM Person WHERE id_person = %s"
                cursor.execute(delete_query, (person_id,))

        connection.commit()



@app.post("/register", summary="Création de personnes et ajout d'un accès token")
def login(person: Person):
    hashed_password = pwd_context.hash(person.password)

    encrypted_phone = encryption.encrypt(person.phone)
    
    current_time = datetime.now()  # Obtenir la date et l'heure actuelles
    
    with connection.cursor() as cursor:
        insert_query = "INSERT INTO Person (name, firstname, pwd, email, phone, last_login, id_role) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (person.name, person.firstname, hashed_password, person.email, person.phone, current_time.strftime("%Y-%m-%dT%H:%M:%S"), person.id_role))
        connection.commit()

        # Get inserted person's ID
        cursor.execute("SELECT LAST_INSERT_ID()")
        person_id = cursor.fetchone()[0]

    return "Ajout avec succès"


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
                access_token = create_access_token(user_id=user_id, data={'id_role':result[8]}, expires_delta=access_token_expires)
                
                # Mettre à jour la date et l'heure de la dernière connexion de l'utilisateur
                current_time = datetime.now()
                update_query = "UPDATE Person SET last_login = %s WHERE id_person = %s"
                cursor.execute(update_query, (current_time.strftime("%Y-%m-%dT%H:%M:%S"), user_id))
                connection.commit()

                return {"access_token": access_token, "token_type": "bearer"}
            else:
                raise HTTPException(status_code=400, detail="Incorrect email or password")
                raise HTTPException(status_code=400, detail="Incorrect email or password")
        else:
            raise HTTPException(status_code=400, detail="Incorrect email or password")
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
                    return {"User": user}
                else:
                    raise HTTPException(
                        status_code=400, detail="Incorrect email or password")
            else:
                raise HTTPException(
                    status_code=400, detail="Incorrect email or password")
        except:
            cursor.close()
            raise HTTPException(
                status_code=500, detail="Database connection error!")


@app.get("/user/me")
async def get_current_user(current_user: Tuple[str, str] = Depends(BearerAuth())):
    with connection.cursor() as cursor:
        query = "SELECT * FROM Person WHERE id_person=%s"
        cursor.execute(query, (current_user[0]))
        result = cursor.fetchone()
        if result:
            user = {
                "user_id": result[0],
                "name": result[1],
                "firstname": result[2],
                "email": result[4],
                "phone": result[5],
            }
            return {"user": user}
        else:
            raise HTTPException(status_code=404, detail="User not found")


@app.get("/users_all", summary="Récupération de toutes les utilisateurs")
def get_user(background_tasks: BackgroundTasks):
    background_tasks.add_task(delete_inactive_users)
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Person"
            cursor.execute(sql)
            results = cursor.fetchall()
            users = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3], "email": row[4],
                             "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8], "last_login": row[9]})
            if users:
                return {"User": users}
            else:
                return {"message": "No users in the database"}
        except:
            cursor.close()
            raise HTTPException(
                status_code=500, detail="Database connection error !")


@app.get("/users/{user_id}", summary="Récupération en fonction de l'id utilisateur")
def get_user_by_id(user_id: int):
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Person WHERE id_person=%s"
            cursor.execute(sql, (user_id,))
            result = cursor.fetchall()
            users = []
            row = takeLatinTupleGetUtf8List(result[0])

            users.append({"id_person": row[0], "name": row[1], "firstname": row[2], "pwd": row[3],
                         "email": row[4], "phone": row[5], "latitude": row[6], "longitude": row[7], "id_role": row[8]})

            return {"Person": users}
        except:
            cursor.close()
            raise HTTPException(status_code=404, detail="Personne inexistante")


@app.post("/image", summary="Insertion d'une image")
async def register_image(image: NewImage, token: Tuple[str, str] = Depends(BearerAuth())):
    if token[1] != 2 and token[1] != 3:
        raise HTTPException(status_code=401, detail="User is not a client")
    with connection.cursor() as cursor:
        try:
            request_select = "SELECT id_plante FROM Plante WHERE id_plante = %s LIMIT 1;"
            request_insert = "INSERT INTO Photo (image_data, id_plante) VALUES (%s, %s);"

            cursor.execute(request_select, (image.id_plante))
            if cursor.fetchone() is None:
                raise HTTPException(status_code=404, detail="Photo pour une plante inexistante") 
            cursor.execute(request_insert, (image.data, image.id_plante))
            connection.commit()
            cursor.close()
            return {"message": "Photo enregistrée"}

        except:
            cursor.close()
            raise HTTPException(
                status_code=500, detail="Database connection error !")


@app.get("/image/{id}", response_model=DBImage, summary="Récupération d'une image en fonction de l'id")
def send_image(id=Depends(BearerAuth())):
    request_select = "select id_photo, id_plante, image_data, advice_title, advice from Photo where id_photo = %s limit 1;"
    cursor = connection.cursor()
    cursor.execute(request_select, (id))
    rowImage = cursor.fetchone()
    if rowImage is None:
        raise HTTPException(status_code=404, detail="Photo inexistante")

    rowImage = takeLatinTupleGetUtf8List(rowImage)

    # , advice_title = rowImage[3], advice = rowImage[4]
    image = DBImage(id_photo=rowImage[0], id_plante=rowImage[1],
                    data=rowImage[2], advice="", advice_title="")
    if not rowImage[3] is None and not rowImage[4] is None:
        image.advice = rowImage[3]
        image.advice_title = rowImage[4]

    cursor.close()
    return image


@app.put("/advices" , summary="Modification d'un titre conseil")
def create_advice(advice: dict, token: Tuple[str, str] = Depends(BearerAuth())):
    
    with connection.cursor() as cursor:
        try:
            sql = "Update Photo set advice_title=%s, advice=%s where id_photo=%s"
            cursor.execute(
                sql, (advice["advice_title"], advice["advice"], advice["id_photo"]))
            connection.commit()
            cursor.close()
            return {"message": "Conseil enregistrée"}
        except:
            cursor.close()
            raise HTTPException(
                status_code=500, detail="Database connection error !")


@app.get("/advices", summary="Récupération des photos")
def get_advices():
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Photo"
            cursor.execute(sql)
            results = cursor.fetchall()
            photo = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                photo.append(
                    {"id_photo": row[0], "advice_title": row[1], "advice": row[2], "id_plante": row[3]})
            cursor.close()
            if photo:
                return {"Photo": photo}
            else:
                raise HTTPException(status_code=400, detail="Erreur : ")
        except:
            cursor.close()
            raise HTTPException(
                status_code=500, detail="Database connection error !")


@app.get("/plant", summary="Récupération des plantes")
def get_plants(current_user: Tuple[str, str] = Depends(BearerAuth())):
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
            i=1
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                plants.append({"id_plante": str(row[0]), "name": row[1], "image_data": row[2]})

            cursor.close()
            if plants:
                return {"Plants": plants}
            else:
                raise HTTPException(
                    status_code=400, detail="Incorrect email or password")
        except:
            raise HTTPException(
                status_code=500, detail="Database connection error !")

# maybe broken


@app.get("/plants", summary="Récupération des garde de plantes")
def get_info_plants(token: Tuple[str, str] = Depends(BearerAuth())):
   
    if token[1] != 2 and token[1] != 3:
        raise HTTPException(status_code=401, detail="User is not a client")
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
            raise HTTPException(
                status_code=500, detail="Database connection error !")


@app.post("/plants_garde", summary="Insertion des gardes")
def add_garde(garde: Garde, token: Tuple[str, str] = Depends(BearerAuth())):
    if token[1] != 2 and token[1] != 3:
        raise HTTPException(status_code=401, detail="User is not a client")

    try:
        datetime_begining = datetime.strptime(garde.begining, "%Y-%m-%dT%H:%M:%S.%fZ")
        begining = datetime_begining.strftime("%Y-%m-%d %H:%M:%S")
        
        datetime_finish = datetime.strptime(garde.finish, "%Y-%m-%dT%H:%M:%S.%fZ")
        finish = datetime_finish.strftime("%Y-%m-%d %H:%M:%S")

        with connection.cursor() as cursor:
            sql = "INSERT INTO Garde (begining,finish,id_plante) VALUES(%s,%s,%s)"
            cursor.execute(sql, (begining, finish, garde.id_plante))
            connection.commit()
        return "Garde enregistrée"
    except Exception:
        raise HTTPException(status_code=500, detail="Error !")


@app.post("/plante", summary="Insertion des plantes")
async def register_plante(plante: PlantToCreate, token: Tuple[str, str] = Depends(BearerAuth())):
    if token[1] != 2 and token[1] != 3:
        raise HTTPException(status_code=401, detail="User is not a client")
    with connection.cursor() as cursor:
        try:
            sql = "Insert into Plante (id_person, name, number, road_first, road_second, town, postal_code, latitude, longitude) values (%s, %s, %s, %s, %s, %s, %s, %s, %s);"
            val = (plante.id_person, plante.name, plante.number, plante.road_first, 
                    plante.road_second, plante.town, plante.postal_code,
                    plante.latitude, plante.longitude)
            cursor.execute(sql, val)
            sql = "select id_plante from Plante order by 1 Desc limit 1;"
            cursor.execute(sql)
            result = cursor.fetchone()

            connection.commit()
            cursor.close()
            return {"message": "Plante enregistrée", "id_plante": result[0]}
        except:
            cursor.close()
            raise HTTPException(
                status_code=500, detail="Durant l'enregistrement de la plante !")


@app.get("/plant/{id_plante}", summary="Récupération des plantes en fonction de son id")
def get_plant_by_id(id_plante: int, token: Tuple[str, str] = Depends(BearerAuth())):
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Plante INNER JOIN Photo ON Plante.id_plante = Photo.id_plante WHERE Plante.id_plante=%s"
            cursor.execute(sql, (id_plante,))
            results = cursor.fetchall()
            plants = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                plants.append({"id_plante": row[0], "name": row[1], "number": row[2], "road_first": row[3], "road_second": row[4], "town": row[5],
                              "postal_code": row[6], "latitude": row[7], "longitude": row[8], "id_person": row[9], "advice_title": row[11], "advice": row[12]})
            cursor.close()
            return {"Plante": plants}
        except:
            cursor.close()
            return {"Plante inexistante"}


@app.get("/garde/{id_garde}", summary="Récupération des gardes en fonction de son id")
def put_garde_by_id(id_garde: int, token: Tuple[str, str] = Depends(BearerAuth())):
    if token[2] != 2 and token[1] != 3:
        raise HTTPException(status_code=401, detail="User is not a client")
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
        cursor.execute(sql_update, (token[0], id_garde))
        connection.commit()
        cursor.close()

        return "Garde mis à jour", 200


@app.get("/all_gardes", summary="Récupération des gardes")
def get_all_gardes(token: Tuple[str, str] = Depends(BearerAuth())):
    if token[1] != 2 and token[1] != 3:
        raise HTTPException(status_code=401, detail="User is not a client")
    with connection.cursor() as cursor:
        try:
            sql = "SELECT * FROM Garde"
            cursor.execute(sql)
            results = cursor.fetchall()
            garde = []
            for result in results:
                row = takeLatinTupleGetUtf8List(result)
                garde.append({"id_garde": row[0], "begining": row[1],
                             "finish": row[2], "id_person": row[3], "id_plante": row[4]})
            return {"Garde": garde}
        except mysql.connector.Error as error:
            cursor.close()
            return {"Error message": str(error)}


def get_plant_photos_by_id(id_plante: int, token: Tuple[str,str] = Depends(BearerAuth())):
    if token[1] != 2 and token[1] != 3 and token[1] != 1:
        raise HTTPException(status_code=401, detail="User is not a client")
    with connection.cursor() as cursor:
        try:
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
                plants.append(
                    {"id_photo": row[5], "image_data": row[2], "advice_title": row[3], "advice": row[4]})
            cursor.close()
            return {"Plante": plants}, 200
        except:
            cursor.close()
            raise HTTPException(status_code=404, detail="Plante inexistante")
        

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
<<<<<<< HEAD
        message = {
            "username": "Unknown",
            "text": data
        }
        messages.append(message)
        await websocket.send_text(data)

@app.get("/")
async def get():
    return {"message": "WebSocket endpoint is ready"}

@app.post("/send-private-message")
async def send_private_message(payload: dict):
    message = payload.get('message')
    sender_id = payload.get('senderId')
    receiver_id = payload.get('receiverId')

    # Vérifier que le sender_id et le receiver_id sont valides

    now = datetime.now()
    currency_time = now.strftime("%H:%M")
    message_payload = {"time": currency_time,
                       "client_id": sender_id, "message": message}
    await manager.send_personal_message(json.dumps(message_payload), receiver_id)

    # Stocker le message en base de données

    return {"time": currency_time, "message": message}


@app.get("/connected-users")
async def get_connected_users():
    connected_users = manager.connected_users  # Access the connected_users property
    return {"connected_users": connected_users}
=======
        await websocket.send_text(f"{data}")
>>>>>>> 5decf7a (fix: chat commun entre les users)
