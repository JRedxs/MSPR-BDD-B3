# -*- coding: utf-8 -*-

import pymysql,os
from dotenv import load_dotenv

load_dotenv()


HOST_LOCAL = os.getenv('HOST_LOCAL')
HOST_CONTAINER = os.getenv('HOST_CONTAINER')
USER_LOCAL = os.getenv('USER_LOCAL')
USER_CONTAINER = os.getenv('USER_CONTAINER')
PASSWORD_LOCAL = os.getenv('PASSWORD_LOCAL')
PASSWORD_CONTAINER = os.getenv('PASSWORD_CONTAINER')
DB_LOCAL = os.getenv('DB_LOCAL')
DB_CONTAINER = os.getenv('DB_CONTAINER')
REACT_APP_API_URL = os.getenv('REACT_APP_API_URL')



def mysql_local():
    return pymysql.connect(host=HOST_LOCAL, user=USER_LOCAL, password=PASSWORD_LOCAL, db=DB_LOCAL, port=3306, charset='utf8')



def mysql_container():
    return pymysql.connect(host=HOST_CONTAINER, user=USER_CONTAINER, password=PASSWORD_CONTAINER, db=DB_CONTAINER, port=3306, charset='utf8')


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