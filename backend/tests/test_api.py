import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

@pytest.fixture(scope="session")
def admin_token():
    # Register admin
    response = client.post("/api/admin/register", json={
        "username": "admin1",
        "password": "password123"
    })
    assert response.status_code in [200, 400]
    
    #Login admin
    response = client.post("/api/admin/login", json={
        "username": "admin1",
        "password": "password123"
    })
    assert response.status_code == 200
    token = response.json()["access_token"]
    assert token
    return token

def test_customer_crud(admin_token):
    headers = {"Authorization": f"Bearer {admin_token}"}

    # Tambah customer
    res = client.post("/api/customers/", json={
        "name": "Andi",
        "email": "andi@example.com"
    }, headers=headers)
    assert res.status_code == 200
    customer = res.json()
    cust_id = customer["id"]

    # Get semua customer
    res = client.get("/api/customers/", headers=headers)
    assert res.status_code == 200
    assert isinstance(res.json(), list)

    # Update customer
    res = client.put(f"/api/customers/{cust_id}", json={
        "name": "Andi Updated",
        "email": "andi.updated@example.com"
    }, headers=headers)
    assert res.status_code == 200
    assert res.json()["name"] == "Andi Updated"

    # Hapus customer
    res = client.delete(f"/api/customers/{cust_id}", headers=headers)
    assert res.status_code == 200
