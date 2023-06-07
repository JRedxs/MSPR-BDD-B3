import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_get_user_valid_credentials(client):
    # Données de test pour récupérer un utilisateur avec des identifiants valides
    email = "john.doe@example.com"
    password = "password123"

    response = client.get(f"/users?email={email}&password={password}")

    # Vérification du code de statut de la réponse
    assert response.status_code == 200

    # Vérification du contenu de la réponse
    data = response.json()
    assert "User" in data
    user = data["User"]
    assert "id_person" in user
    assert "name" in user
    assert "firstname" in user
    assert "pwd" in user
    assert "email" in user
    assert "phone" in user
    assert "latitude" in user
    assert "longitude" in user
    assert "id_role" in user


def test_get_user_invalid_credentials(client):
    # Données de test pour récupérer un utilisateur avec des identifiants invalides
    email = "john.doe@example.com"
    password = "incorrect_password"

    response = client.get(f"/users?email={email}&password={password}")

    # Vérification du code de statut de la réponse
    assert response.status_code == 500  # Email ou mot de passe incorrect


def test_get_user_missing_parameters(client):
    # Données de test pour récupérer un utilisateur avec des paramètres manquants
    response = client.get("/users")

    # Vérification du code de statut de la réponse
    assert response.status_code == 422  # Erreur de validation des données

