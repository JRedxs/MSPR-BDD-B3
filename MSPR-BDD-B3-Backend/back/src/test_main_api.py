import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app, connection
from security import create_access_token


@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client


def test_login(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.return_value = None
        mock_fetchone = mock_cursor.return_value.__enter__.return_value.fetchone
        mock_fetchone.return_value = (1, "test", "user", "hashed_password", "test@test.com", "encrypted_phone", 1)

        person = {
            "name": "test",
            "firstname": "user",
            "password": "password",
            "email": "test@test.com",
            "phone": "Azerty123456@",
            "id_role": 1
        }

        response = client.post("/token", json=person)

        assert response.status_code == 200
        assert "access_token" in response.json()


def test_login_token(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.return_value = None
        mock_fetchone = mock_cursor.return_value.__enter__.return_value.fetchone
        mock_fetchone.return_value = (1, "test", "user", "$2b$12$50sHq3o0kXbdI/0s/1lNwOcRyJ0o0IomRXDJNjZ0Pz.fvtPyS4pOu", "test@test.com", "encrypted_phone", 1)

        email = "test@test.com"
        password = "password"

        response = client.post("/token_log", data={"email": email, "password": password})

        assert response.status_code == 422
        assert "detail" in response.json()


# def test_get_user(client):
#     with patch.object(connection, "cursor") as mock_cursor:
#         mock_execute = mock_cursor.return_value.__enter__.return_value.execute
#         mock_execute.return_value = None

#         mock_fetchone = mock_cursor.return_value.__enter__.return_value.fetchone
#         mock_fetchone.return_value = (1, "John", "Doe", "$2b$12$50sHq3o0kXbdI/0s/1lNwOcRyJ0o0IomRXDJNjZ0Pz.fvtPyS4pOu", "john@example.com", None, None, 1)

#         response = client.get("/users?email=john@example.com&password=password123")

#         assert response.status_code == 200

#         assert response.json() == {
#             "User": {
#                 "id_person": 1,
#                 "name": "John",
#                 "firstname": "Doe",
#                 "pwd": "$2b$12$50sHq3o0kXbdI/0s/1lNwOcRyJ0o0IomRXDJNjZ0Pz.fvtPyS4pOu",
#                 "email": "john@example.com",
#                 "phone": None,
#                 "latitude": None,
#                 "longitude": None,
#                 "id_role": 1
#             }
#         }

#         mock_execute.assert_called_once_with("SELECT * FROM Person WHERE email=%s", ("john@example.com",))
#     
#         mock_fetchone.assert_called_once()


def test_register_image(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.return_value = None
        mock_fetchone = mock_cursor.return_value.__enter__.return_value.fetchone
        mock_fetchone.return_value = (1,)

        new_image = {
            "id_plante": 1,
            "data": "image_data"
        }

        response = client.post("/image", json=new_image)

        assert response.status_code == 200
        assert response.json() == {"message": "Photo enregistrée"}


# def test_send_image(client):
#     with patch.object(connection, "cursor") as mock_cursor:
#         mock_execute = mock_cursor.return_value.__enter__.return_value.execute
#         mock_execute.return_value = None
#         mock_fetchone = mock_cursor.return_value.__enter__.return_value.fetchone
#         mock_fetchone.return_value = (1, 1, "image_data", "advice_title", "advice")

#         response = client.get("/image/1")

#         assert response.status_code == 200
#         assert response.json() == {
#             "id_photo": 1,
#             "id_plante": 1,
#             "data": "image_data",
#             "advice_title": "advice_title",
#             "advice": "advice"
#         }


# def test_send_image_not_found(client):
#     with patch.object(connection, "cursor") as mock_cursor:
#         mock_execute = mock_cursor.return_value.__enter__.return_value.execute
#         mock_execute.return_value = None
#         mock_fetchone = mock_cursor.return_value.__enter__.return_value.fetchone
#         mock_fetchone.return_value = None

#         response = client.get("/image/1")

#         assert response.status_code == 404
#         assert response.json() == {"detail": "Photo inexistante"}


def test_create_advice(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.return_value = None

        advice = {
            "id_photo": 1,
            "advice_title": "new_title",
            "advice": "new_advice"
        }

        response = client.put("/advices", json=advice)

        assert response.status_code == 200
        assert response.json() == {"message": "Conseil enregistrée"}


def test_create_advice_db_error(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.side_effect = Exception("Database connection error !")

        advice = {
            "id_photo": 1,
            "advice_title": "new_title",
            "advice": "new_advice"
        }

        response = client.put("/advices", json=advice)

        assert response.status_code == 500
        assert response.json() == {"detail": "Database connection error !"}


def test_create_advice(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.return_value = None
        advice = {"id_photo": 1, "advice_title": "new_title", "advice": "new_advice"}
        response = client.put("/advices", json=advice)
        assert response.status_code == 200
        assert response.json() == {"message": "Conseil enregistrée"}

    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.side_effect = Exception()
        advice = {"id_photo": 1, "advice_title": "new_title", "advice": "new_advice"}
        response = client.put("/advices", json=advice)
        assert response.status_code == 500
        assert response.json() == {"detail": "Database connection error !"}


def test_get_advices(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.return_value = None
        mock_fetchall = mock_cursor.return_value.__enter__.return_value.fetchall
        mock_fetchall.return_value = [("1", "title1", "advice1", "1"), ("2", "title2", "advice2", "2")]
        response = client.get("/advices")
        assert response.status_code == 200
        assert response.json() == {
            "Photo": [
                {"id_photo": "1", "advice_title": "title1", "advice": "advice1", "id_plante": "1"},
                {"id_photo": "2", "advice_title": "title2", "advice": "advice2", "id_plante": "2"}
            ]
        }

    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.side_effect = Exception()
        response = client.get("/advices")
        assert response.status_code == 500
        assert response.json() == {"detail": "Database connection error !"}


def test_get_plants(client):
    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.return_value = None
        mock_fetchall = mock_cursor.return_value.__enter__.return_value.fetchall
        mock_fetchall.return_value = [("1", "plant1", "img1"), ("2", "plant2", "img2")]
        response = client.get("/plant")
        assert response.status_code == 200
        assert response.json() == {
            "Plants": [
                {"id_plante": "1", "name": "plant1", "image_data": "img1"},
                {"id_plante": "2", "name": "plant2", "image_data": "img2"}
            ]
        }

    with patch.object(connection, "cursor") as mock_cursor:
        mock_execute = mock_cursor.return_value.__enter__.return_value.execute
        mock_execute.side_effect = Exception()
        response = client.get("/plant")
        assert response.status_code == 500
        assert response.json() == {"detail": "Database connection error !"}