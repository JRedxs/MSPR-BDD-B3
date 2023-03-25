import pytest
from fastapi import HTTPException, Request
from security import decoded_jwt, SECRET_KEY, ALGORITHM,create_access_token
import jwt
from fastapi import HTTPException
import time
from datetime import timedelta

def test_create_access_token():

    token = create_access_token()
    assert isinstance(token, str)


    user_id = "123"
    token = create_access_token(user_id=user_id)
    assert isinstance(token, str)

    data = {"name": "John Doe"}
    token = create_access_token(data=data)
    assert isinstance(token, str)

    expires_delta = timedelta(minutes=30)
    token = create_access_token(user_id=user_id, expires_delta=expires_delta)
    assert isinstance(token, str)

# Test d'un token valide
def test_decoded_jwt_valid_token():
    # Créer un token valide
    token = jwt.encode({"some": "payload"}, SECRET_KEY, algorithm=ALGORITHM)
    decoded_token = decoded_jwt(token)
    assert decoded_token == {"some": "payload"}

# Test d'un token expiré
def test_decoded_jwt_expired_token():
    # Créer un token expiré
    token = jwt.encode({"exp": time.time() - 3600}, SECRET_KEY, algorithm=ALGORITHM)

    with pytest.raises(HTTPException) as e:
        decoded_jwt(token)


    assert e.value.status_code == 403
    assert e.value.detail == "Token has expired"

# Test an invalid token
def test_decoded_jwt_invalid_token():
    # Create an invalid token
    token = "invalid.token"

    # Call decoded_jwt with the invalid token
    with pytest.raises(HTTPException) as exception:
        decoded_jwt(token)

    # Verify that an HTTPException with status_code 403 is raised
    assert exception.value.status_code == 403
    assert exception.value.detail == "Invalid token"