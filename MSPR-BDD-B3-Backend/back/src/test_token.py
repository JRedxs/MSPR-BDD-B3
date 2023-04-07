import pytest
from fastapi import HTTPException
from main_test import decoded_jwt, SECRET_KEY, ALGORITHM,create_access_token
import jwt
from fastapi import HTTPException
import time
from datetime import timedelta

def test_create_access_token():
    # Test with only user_id provided
    token = create_access_token(user_id="1")
    assert isinstance(token, str)

    # Test with data provided
    data = {"name": "John Doe", "id_role": "user"}
    token = create_access_token(user_id="1", data=data)
    assert isinstance(token, str)

    # Test with expires_delta provided
    expires_delta = timedelta(minutes=30)
    token = create_access_token(user_id="1", expires_delta=expires_delta)
    assert isinstance(token, str)

    # Test with all arguments provided
    data = {"name": "John Doe", "id_role": "user"}
    expires_delta = timedelta(minutes=30)
    token = create_access_token(user_id="1", data=data, expires_delta=expires_delta)
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