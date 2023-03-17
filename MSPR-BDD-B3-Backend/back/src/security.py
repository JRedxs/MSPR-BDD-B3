# -*- coding: utf-8 -*-

from passlib.context import CryptContext
import os
from datetime import datetime, timedelta
from typing import Union, Any,Optional
from jose import jwt
from database import *
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from dotenv import load_dotenv
import bcrypt

load_dotenv()

connection = MSQL

SECRET_KEY = os.getenv('SECRET')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

class BearerAuth(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(BearerAuth, self).__init__(auto_error=auto_error)

    def __call__(self, request: Request) -> Optional[str]:
        credentials: HTTPAuthorizationCredentials = super(BearerAuth, self).__call__(request)
        if credentials:
            if not credentials.scheme == "bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization credentials")

    def verify_jwt(self, jwt_token: str) -> bool:
        try:
            payload = jwt.decode(jwt_token, SECRET_KEY, algorithms=ALGORITHM)
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=403, detail="Token has expired")
        except jwt.InvalidTokenError:
            return False
