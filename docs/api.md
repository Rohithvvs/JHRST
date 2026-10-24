# JHRST Tech Solutions — REST API Documentation

Base URL: `/api/v1`

---

## 1. Public Endpoints

### 1.1 Health & Root
- **`GET /health`**
  - Response: `{"status": "healthy", "service": "jhrst-api"}`
- **`GET /`**
  - Response: `{"company": "JHRST Tech Solutions", "tagline": "BUILD. INNOVATE. GROW.", ...}`

### 1.2 Technology Services
- **`GET /api/v1/services`**
  - Returns array of all published services ordered by priority.
- **`GET /api/v1/services/{slug}`**
  - Returns detailed single service including full description, deliverables, business benefits, and technology stack.

### 1.3 Project Portfolio
- **`GET /api/v1/projects`**
  - Query parameters:
    - `category`: Filter by category (e.g., `AI Applications`, `Automation`, `Web Applications`, `Data and Analytics`).
    - `featured`: Boolean filter (`true` / `false`).
- **`GET /api/v1/projects/{slug}`**
  - Returns single project case study with problem statement, implemented solution, tech stack, and links.

### 1.4 AI Solutions & Products
- **`GET /api/v1/products`**
  - Query parameters: `category`, `status_filter` (`Available`, `Beta`, `In Development`, `Concept`).
- **`GET /api/v1/products/{slug}`**
  - Returns single AI product overview, friction solved, and technical features.

### 1.5 Careers & Job Openings
- **`GET /api/v1/jobs`**
  - Query parameters: `department`, `employment_type`, `location`.
- **`GET /api/v1/jobs/{slug}`**
  - Returns job description, responsibilities, requirements, and qualifications.

### 1.6 Website Settings
- **`GET /api/v1/settings/public`**
  - Returns company contact email, phone, office address, and social URLs.

---

## 2. Inquiries & Form Submissions

### 2.1 General Contact Inquiry
- **`POST /api/v1/contact`**
  - Request body (JSON):
    ```json
    {
      "full_name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+1 555 123 4567",
      "company_name": "Acme Corp",
      "service_required": "Web Development",
      "message": "We would like to request an estimate for an enterprise web application.",
      "consent_given": true
    }
    ```
  - Response: Status `201 Created`

### 2.2 Project Inquiry ("Start a Project")
- **`POST /api/v1/project-inquiries`**
  - Request body (JSON):
    ```json
    {
      "full_name": "Jordan Vance",
      "email": "jordan@startup.io",
      "phone": "+1 555 987 6543",
      "company_name": "Vance AI",
      "industry": "FinTech",
      "service_required": "AI Development",
      "estimated_budget": "$25k - $50k",
      "expected_timeline": "1-3 months",
      "project_description": "We need a RAG-powered vector search assistant for financial documents.",
      "preferred_contact": "Email",
      "consent_given": true
    }
    ```
  - Response: Status `201 Created`

### 2.3 Job Application (Multipart Form Data)
- **`POST /api/v1/job-applications`**
  - Headers: `Content-Type: multipart/form-data`
  - Form fields:
    - `full_name`: String
    - `email`: String (email format)
    - `phone`: String (optional)
    - `job_id`: Integer (optional)
    - `job_title`: String
    - `experience_level`: String
    - `relevant_skills`: String
    - `linkedin_url`: String (optional)
    - `github_url`: String (optional)
    - `message`: String (optional)
    - `consent_given`: Boolean (`true`)
    - `resume`: Binary file (PDF only, max 5MB)
  - Response: Status `201 Created`

---

## 3. Administrative Endpoints (Protected)

Requires header: `Authorization: Bearer <jwt_access_token>`

### 3.1 Authentication
- **`POST /api/v1/admin/auth/login`**
  - Body: `{"email": "admin@jhrst.com", "password": "..."}`
  - Response: `{"access_token": "...", "token_type": "bearer", "user_email": "...", ...}`
- **`GET /api/v1/admin/auth/me`**
  - Returns current admin profile.

### 3.2 Dashboard Statistics
- **`GET /api/v1/admin/dashboard`**
  - Returns real aggregated statistics and recent submissions.

### 3.3 Managing Inquiries
- **`GET /api/v1/admin/contact-inquiries`**
- **`PUT /api/v1/admin/contact-inquiries/{id}/status`**
- **`GET /api/v1/admin/project-inquiries`**
- **`PUT /api/v1/admin/project-inquiries/{id}/status`**

### 3.4 Managing Job Applications
- **`GET /api/v1/job-applications/admin/all`**
- **`GET /api/v1/job-applications/admin/{id}/resume`** (Secure download of candidate PDF resume)
- **`PUT /api/v1/job-applications/admin/{id}/status`** (Update hiring status: `Received`, `Under Review`, `Shortlisted`, `Interview`, `Selected`, `Rejected`)

### 3.5 Content Management (Services, Projects, AI Products, Jobs)
- **`POST /api/v1/services/admin`**
- **`PUT /api/v1/services/admin/{id}`**
- **`DELETE /api/v1/services/admin/{id}`**
- **`POST /api/v1/projects/admin`**
- **`PUT /api/v1/projects/admin/{id}`**
- **`DELETE /api/v1/projects/admin/{id}`**
- **`POST /api/v1/products/admin`**
- **`PUT /api/v1/products/admin/{id}`**
- **`DELETE /api/v1/products/admin/{id}`**
- **`POST /api/v1/jobs/admin`**
- **`PUT /api/v1/jobs/admin/{id}`**
- **`DELETE /api/v1/jobs/admin/{id}`**
- **`PUT /api/v1/settings/admin`**

