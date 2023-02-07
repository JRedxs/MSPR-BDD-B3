from fastapi import FastAPI
import pymysql

# Connexion à la base de données
connection = pymysql.connect(host='localhost', user='admin', password='admin', db='Arosaje-db', port=3306)

# Initialisez l'application 
app = FastAPI()

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
                users.append({"id_person": row[0], "name": row[1], "firstname": row[2]})
            return {"Person": users}
    except:
        return {"erreur": "aucun user récupéré"}, 500

@app.get("/users/{user_id}")
def get_user_by_id(user_id: int):
    cursor = connection.cursor()

    sql = "SELECT * FROM Person WHERE id_person=%s"

    cursor.execute(sql, (user_id,))
    result = cursor.fetchone()
    return {"Person": result}
