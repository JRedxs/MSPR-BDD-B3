import pymysql


# Connexion à la base de données


def mysql_local():
    return pymysql.connect(host='localhost', user='admin', password='admin', db='Arosaje_db', port=3306)

def mysql_container():
    return pymysql.connect(host='mysql-db-compose', user='admin', password='admin', db='Arosaje_db', port=3306)

def mysql():
    mysql = ''
    try :
        mysql = mysql_container()
    except :

        try:
            mysql = mysql_local()
        except pymysql.err.OperationalError as exc:
            raise RuntimeError('Failed to open database') from exc
    return mysql

MSQL= mysql()