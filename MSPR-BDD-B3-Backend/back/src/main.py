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

# Exécutez l'application FastAPI