from passlib.context import CryptContext
import os
from datetime import datetime, timedelta
from typing import Optional,Tuple
from jose import jwt, exceptions as jwt_exceptions
from jose import jwt, JWTError, ExpiredSignatureError
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('SECRET')
ALGORITHM = os.getenv('ALGORITHM')



def takeLatinTupleGetUtf8List(theTuple):
    newList = []
    for n in range(len(theTuple)) :
        if isinstance(theTuple[n], str):
            newList.append(theTuple[n].encode('latin-1').decode('utf-8'))
        else:
            newList.append(theTuple[n])
    return newList



def create_access_token(user_id: str = None, data: dict = None, expires_delta: timedelta = None) -> str:
    to_encode = {"user_id": user_id} if user_id else {}
    if data:
        to_encode.update(data)
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, 'test_key', algorithm='HS256')
    return encoded_jwt

def decoded_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, 'test_key', algorithms='HS256')
        return decoded_token
    except ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="Token has expired")
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")
class BearerAuth(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme")
            is_valid_token = self.verify_jwt(credentials.credentials)
            if not is_valid_token:
                raise HTTPException(status_code=403, detail="Invalid token")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization credentials")

    def verify_jwt(self, jwt_token: str) -> Tuple[bool, Optional[str]]:
        try:
            payload = jwt.decode(jwt_token, 'test_key', algorithms='HS256')
            user_id = payload.get("user_id, nom, prenom, phone")
            if user_id is None:
                return False, None  # User ID non trouvé dans le payload
            return True, user_id
        except jwt_exceptions.ExpiredSignatureError:
            raise HTTPException(status_code=403, detail="Token has expired")
        except jwt_exceptions.JWTError:
            return False, None  # Invalid token
