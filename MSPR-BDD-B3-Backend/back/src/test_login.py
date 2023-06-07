import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app, connection

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
