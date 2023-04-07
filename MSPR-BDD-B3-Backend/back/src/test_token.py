import pytest
from fastapi import HTTPException
from main_test import decoded_jwt, SECRET_KEY, ALGORITHM,create_access_token
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



# # Test d'un token valide
# def test_decoded_jwt_valid_token():
#     # Créer un token valide
#     token = jwt.encode({"some": "payload"}, 'd27ae24c5bf19697ef58f72b0b4b2749', algorithm='HS256')
#     decoded_token = decoded_jwt(token)
#     assert decoded_token == {"some": "payload"}

# # Test d'un token expiré
# def test_decoded_jwt_expired_token():
#     # Créer un token expiré
#     token = jwt.encode({"exp": time.time() - 3600}, 'd27ae24c5bf19697ef58f72b0b4b2749', algorithm='HS256')

#     with pytest.raises(HTTPException) as e:
#         decoded_jwt(token)


#     assert e.value.status_code == 403
#     assert e.value.detail == "Token has expired"

# # Test an invalid token
# def test_decoded_jwt_invalid_token():
#     # Create an invalid token
#     token = "invalid.token"

#     # Call decoded_jwt with the invalid token
#     with pytest.raises(HTTPException) as exception:
#         decoded_jwt(token)

#     # Verify that an HTTPException with status_code 403 is raised
#     assert exception.value.status_code == 403
#     assert exception.value.detail == "Invalid token"