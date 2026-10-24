# JHRST Tech Solutions — Local Setup & Development Guide

This guide describes how to run and verify both the frontend and backend of **JHRST Tech Solutions** locally.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher (v22.x recommended)
- **npm**: v9.0.0 or higher
- **Python**: v3.10 or v3.11 (v3.11 recommended)
- **uv** (recommended for ultra-fast Python package installs) or standard `pip`

---

## 2. Backend Setup (FastAPI + SQLAlchemy)

### Step 1: Navigate to backend directory
```bash
cd backend
```

### Step 2: Create and activate a virtual environment
```powershell
# Using uv (fastest)
uv venv .venv
.\.venv\Scripts\activate

# Or using standard python venv
python -m venv .venv
.\.venv\Scripts\activate
```

### Step 3: Install dependencies
```powershell
# Using uv
uv pip install -r requirements.txt

# Or using pip
pip install -r requirements.txt
```

### Step 4: Environment Configuration
Copy the example environment file:
```powershell
cp .env.example .env
```
Default settings are pre-configured to use local SQLite (`sqlite:///./jhrst.db`) so the application starts immediately without installing external database software. To connect to PostgreSQL, set:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/jhrst_db
```

### Step 5: Initialize & Seed Database
The application automatically creates tables and seeds verified default data on boot. You can also run the seed manually:
```powershell
python -m app.db.seed
```

Default administrator credentials:
- **Email**: `admin@jhrst.com`
- **Password**: `JhrstAdmin2026#Secure`

### Step 6: Start FastAPI Server
```powershell
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger API documentation will be available at:
`http://localhost:8000/docs`

---

## 3. Frontend Setup (React + Vite + TypeScript + Tailwind CSS)

### Step 1: Navigate to frontend directory
```bash
cd frontend
```

### Step 2: Install dependencies
```powershell
npm install --legacy-peer-deps
```

### Step 3: Environment Configuration
```powershell
cp .env.example .env
```
Ensure `VITE_API_BASE_URL` points to `http://localhost:8000/api/v1`.

### Step 4: Run Development Server
```powershell
npm run dev
```
The website will be live at:
`http://localhost:5173`

### Step 5: Test Production Build
```powershell
npm run build
npm run preview
```

---

## 4. Running Automated Tests

### Backend Unit & Integration Tests:
```powershell
cd backend
.\.venv\Scripts\pytest.exe -v
```
All 10 tests should pass, verifying health checks, service listings, project category filtering, AI product querying, contact submissions, project inquiry submissions, and secure admin authentication.

### Frontend TypeScript & Build Verification:
```powershell
cd frontend
npm run build
```
Verify exit code 0 and successful chunk generation in `dist/`.

