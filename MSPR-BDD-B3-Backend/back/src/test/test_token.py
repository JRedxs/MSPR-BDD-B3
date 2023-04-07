import pytest
from fastapi import HTTPException
from main_test import decoded_jwt,create_access_token
import jwt
from fastapi import HTTPException
import time
from datetime import timedelta



def test_create_access_token():
    token = create_access_token("1",{"name" :"John", "firstname" :"Doe"})
    assert isinstance(token, str)


# Test a valid token
def test_decode_jwt():
    token = jwt.encode({'user': 'John'}, 'test_key', 'HS256')
    decoded_token = decoded_jwt(token)
    assert decoded_token == {'user': 'John'}


def test_decode_jwt_expired():
    token = jwt.encode({'exp': time.time() - 3600 }, 'test_key', 'HS256')
    with pytest.raises(HTTPException) as error:
        decoded_jwt(token)
    
    assert error.value.status_code == 403
    assert error.value.detail == "Token has expired"
        
def test_decode_wrong_jwt():

    token = "invalid.token"
    with pytest.raises(HTTPException) as exception:
        decoded_jwt(token)

    assert exception.value.status_code == 403
    assert exception.value.detail == "Invalid token"

