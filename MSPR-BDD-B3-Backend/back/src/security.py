# -*- coding: utf-8 -*-

from passlib.context import CryptContext
import os
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt

# connection = MSQL

# SECRET_KEY = os.getenv('SECRET')
# ALGORITHM = os.getenv('ALGORITHM')
# ACCES_TOKEN_EXPIRE_MINUTES = 30

# def create_access_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=ACCES_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"expiration_date": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY,algorithm=ALGORITHM)
#     return encoded_jwt

# # def verify_token(token: str, credentials_exception):
# #     try:
# #         payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
# #         username: str = payload.get("sub")
# #         if username is None:
# #             raise credentials_exception
# #         token_data = TokenData(username=username)
# #     except JWTError:
# #         raise credentials_exception


# def verify_token(token: str, credentials_exception):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception

#     cursor = connection.cursor(dictionary=True)
#     cursor.execute("SELECT * FROM users WHERE username=%s", (token_data.username,))
#     user = cursor.fetchone()
#     if not user:
#         raise credentials_exception
#     return user
