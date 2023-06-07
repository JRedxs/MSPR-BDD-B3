
import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_create_token(client):
    # Données de test pour la création d'une personne
    person_data = {
        "name": "John Doe",
        "firstname": "John",
        "password": "password123",
        "email": "joh.do@example.com",
        "phone": "123456789",
        "id_role": 1
    }

    response = client.post("/token", json=person_data)

    # Vérification du code de statut de la réponse
    assert response.status_code == 200

    # Vérification du contenu de la réponse
    data = response.json()
    assert "Ajout" in data
    assert "access_token" in data
    assert "token_type" in data
    assert data["access_token"] is not None


def test_create_token_missing_field(client):
    # Données de test manquantes pour la création d'une personne
    missing_person_data = {
        "name": "John Doe",
        "password": "password123",
        "email": "john.doe@example.com",
        "phone": "123456789",
        "id_role": 1
    }

    response = client.post("/token", json=missing_person_data)

    # Vérification du code de statut de la réponse
    assert response.status_code == 422  # Erreur de validation des données
