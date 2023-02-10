import pymysql


# Connexion à la base de données
MSQL_LOCAL = pymysql.connect(host='localhost', user='admin', password='admin', db='Arosaje-db', port=3306)