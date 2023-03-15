# from fastapi import Depends, HTTPException, status
# from security import verify_token
# from fastapi.security import OAuth2PasswordBearer
# from database import *
# from passlib.context import CryptContext
# from pymysql.cursors import DictCursor

# connection = MSQL

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     return verify_token(token, credentials_exception)


# def authenticate_user(username: str, password: str):
#     with connection.cursor(cursor=DictCursor) as cursor:
#         cursor.execute("SELECT * FROM Person WHERE name=%s", (username,))
#         user = cursor.fetchone()
#         if not user:
#             return False
#         if not pwd_context.verify(password, user['password']):
#             return False
#         return user


