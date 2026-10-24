import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import Base, engine
from app.db.seed import seed_database

@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    Base.metadata.create_all(bind=engine)
    seed_database()

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "service": "jhrst-api"}

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["company"] == "JHRST Tech Solutions"
    assert data["tagline"] == "BUILD. INNOVATE. GROW."

def test_list_services():
    response = client.get("/api/v1/services")
    assert response.status_code == 200
    services = response.json()
    assert len(services) >= 6
    assert any(s["slug"] == "ai-and-machine-learning" for s in services)

def test_get_service_by_slug():
    response = client.get("/api/v1/services/web-application-development")
    assert response.status_code == 200
    service = response.json()
    assert service["title"] == "Web Application Development"
    assert "offerings" in service

def test_list_projects_and_filter():
    response = client.get("/api/v1/projects")
    assert response.status_code == 200
    projects = response.json()
    assert len(projects) >= 6

    # Test category filter
    filtered = client.get("/api/v1/projects?category=Automation")
    assert filtered.status_code == 200
    filtered_data = filtered.json()
    assert all("Automation" in p["category"] for p in filtered_data)

def test_list_ai_products():
    response = client.get("/api/v1/products")
    assert response.status_code == 200
    products = response.json()
    assert len(products) >= 4

def test_list_jobs():
    response = client.get("/api/v1/jobs")
    assert response.status_code == 200
    jobs = response.json()
    assert len(jobs) >= 4

def test_submit_contact_inquiry():
    payload = {
        "full_name": "Test Client",
        "email": "test@example.com",
        "phone": "+1 234 567 8900",
        "company_name": "Acme Innovations",
        "service_required": "Web Development",
        "message": "We would like to request an estimate for a custom web platform.",
        "consent_given": True
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["full_name"] == "Test Client"
    assert data["id"] is not None

def test_submit_project_inquiry():
    payload = {
        "full_name": "Innovator Alex",
        "email": "alex@startup.io",
        "phone": "+1 555 123 4567",
        "company_name": "Startup Inc",
        "industry": "FinTech",
        "service_required": "AI Development",
        "estimated_budget": "$25k - $50k",
        "expected_timeline": "2-3 months",
        "project_description": "We need an AI assistant for processing enterprise documents.",
        "preferred_contact": "Email",
        "consent_given": True
    }
    response = client.post("/api/v1/project-inquiries", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["service_required"] == "AI Development"
    assert data["id"] is not None

def test_admin_auth_and_protected_dashboard():
    # Attempt login with correct credentials
    login_resp = client.post("/api/v1/admin/auth/login", json={
        "email": "admin@jhrst.com",
        "password": "JhrstAdmin2026#Secure"
    })
    assert login_resp.status_code == 200
    token_data = login_resp.json()
    assert "access_token" in token_data
    token = token_data["access_token"]

    # Access protected dashboard
    dash_resp = client.get(
        "/api/v1/admin/dashboard",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert dash_resp.status_code == 200
    stats = dash_resp.json()
    assert stats["total_services"] >= 6
    assert stats["total_projects"] >= 6
    assert stats["total_contact_inquiries"] >= 1

    # Unauthorized access check
    unauth_resp = client.get("/api/v1/admin/dashboard")
    assert unauth_resp.status_code == 401

