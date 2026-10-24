# JHRST Tech Solutions — Official Corporate Website

> **BUILD. INNOVATE. GROW.**

A modern, responsive, and production-ready corporate website for **JHRST Tech Solutions**. Engineered with an elegant black-and-gold visual identity, high-performance typography, cinematic node animations, accessible components, and an administrative control panel.

---

## 1. Visual Identity & Design System

- **Primary Background**: `#050505` (Deep Black)
- **Secondary Background**: `#0D0D0D` / `#101010` (Charcoal Surface)
- **Card Background**: `#141414`
- **Primary Metallic Gold**: `#D4AF37`
- **Light Gold Accent**: `#F5D76E`
- **Dark Gold / Border Glow**: `#AA8C2C` / `rgba(212, 175, 55, 0.3)`
- **Typography**: 
  - Headings: `Space Grotesk` (Geometric Sans-Serif)
  - Body: `Inter` (Highly readable Sans-Serif)
- **Aesthetic**: Premium, minimalist, futuristic, technology-focused, with subtle 60fps canvas node particle streams and gold gradient borders.

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom black-and-gold theme
- **Icons**: Lucide React + custom SVG brand icons
- **Routing**: React Router v7 with Scroll-to-Top restoration
- **Forms & Validation**: React Hook Form with Zod schemas
- **HTTP Client**: Axios with JWT Bearer interceptor and automatic offline fallback

### Backend
- **Framework**: Python FastAPI
- **Data Validation**: Pydantic v2 Settings & Schemas
- **ORM & Database**: SQLAlchemy (SQLite out-of-the-box local default, PostgreSQL ready)
- **Authentication**: JWT (JSON Web Tokens) with Passlib / BCrypt hashing
- **File Handling**: Multi-part upload with strict PDF validation, size restriction (max 5MB), and secure server isolation
- **Automated Tests**: Pytest test suite with TestClient

---

## 3. Project Structure

```
jhrst-tech-solutions/
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg          # Stylized gold JHRST monogram
│   │   ├── robots.txt           # Search crawler directives
│   │   ├── sitemap.xml          # XML sitemap
│   │   └── _redirects           # SPA routing for Netlify/Cloudflare
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Button, Badge, Modal, SectionHeading, ScrollToTop
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   └── home/            # Hero, HeroVisual, TrustCapabilities, ServicesPreview,
│   │   │                        # AISolutionsPreview, FeaturedProjects, WhyChooseUs,
│   │   │                        # DevelopmentProcess, FAQ, FinalCTA
│   │   ├── context/             # AuthContext, ToastContext
│   │   ├── lib/                 # api.ts (client & seed fallback data)
│   │   ├── pages/
│   │   │   ├── Home.tsx         # Homepage
│   │   │   ├── About.tsx        # Company overview, mission, values, industries
│   │   │   ├── Services.tsx     # Comprehensive services catalogue
│   │   │   ├── ServiceDetail.tsx# /services/:slug deep-dive
│   │   │   ├── Projects.tsx     # Filterable portfolio & case studies
│   │   │   ├── ProjectDetail.tsx# /projects/:slug case study details
│   │   │   ├── AISolutions.tsx  # Dedicated AI products & architecture simulation
│   │   │   ├── Careers.tsx      # Openings & PDF resume application portal
│   │   │   ├── Contact.tsx      # Project inquiry & contact details
│   │   │   ├── PrivacyPolicy.tsx# Verified privacy policy
│   │   │   ├── Terms.tsx        # Terms and conditions
│   │   │   ├── NotFound.tsx     # Custom 404 page
│   │   │   └── admin/           # AdminLogin, AdminLayout, AdminDashboard,
│   │   │                        # AdminInquiries, AdminApplications, AdminContent
│   │   ├── types/               # TypeScript interfaces
│   │   ├── App.tsx              # Router & layout wiring
│   │   ├── index.css            # Tailwind directives & gold scrollbars
│   │   └── main.tsx             # Application bootstrap
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── vercel.json              # SPA routing for Vercel
│
├── backend/
│   ├── app/
│   │   ├── api/v1/              # Endpoints: auth, services, projects, products,
│   │   │                        # jobs, contact, inquiries, applications, admin, settings
│   │   ├── core/                # config, security (JWT/bcrypt), database, email
│   │   ├── db/                  # seed.py (pre-populates 6 services, 6 projects, 4 jobs, admin)
│   │   ├── models/              # SQLAlchemy models
│   │   ├── schemas/             # Pydantic v2 schemas
│   │   ├── services/            # file_storage.py (PDF validation & storage)
│   │   └── main.py              # FastAPI app & security headers
│   ├── tests/                   # Pytest API integration tests (10 passed)
│   ├── uploads/resumes/         # Secure storage directory for candidate resumes
│   ├── requirements.txt         # Pinned backend dependencies
│   ├── pytest.ini
│   └── .env.example
│
├── docs/
│   ├── setup.md                 # Local installation and dev guide
│   ├── api.md                   # Full REST API documentation
│   └── deployment.md            # Production hosting (Vercel, Render, VPS, PostgreSQL)
│
├── README.md
└── .gitignore
```

---

## 4. Quick Start (Running Locally)

### 4.1 Start the FastAPI Backend
```powershell
cd backend

# Setup virtual environment
uv venv .venv
.\.venv\Scripts\activate

# Install requirements
uv pip install -r requirements.txt

# Seed database and start API
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API docs: `http://localhost:8000/docs`

Default Admin Credentials:
- **Email**: `admin@jhrst.com`
- **Password**: `JhrstAdmin2026#Secure`

### 4.2 Start the React Frontend
In a second terminal:
```powershell
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Website URL: `http://localhost:5173`

---

## 5. Verification & Testing

### Backend Test Suite
```powershell
cd backend
.\.venv\Scripts\pytest.exe -v
```
**Results**:
- `test_health_check` &bull; **PASSED**
- `test_root_endpoint` &bull; **PASSED**
- `test_list_services` &bull; **PASSED**
- `test_get_service_by_slug` &bull; **PASSED**
- `test_list_projects_and_filter` &bull; **PASSED**
- `test_list_ai_products` &bull; **PASSED**
- `test_list_jobs` &bull; **PASSED**
- `test_submit_contact_inquiry` &bull; **PASSED**
- `test_submit_project_inquiry` &bull; **PASSED**
- `test_admin_auth_and_protected_dashboard` &bull; **PASSED**

### Frontend Production Build
```powershell
cd frontend
npm run build
```
Builds cleanly with exit code 0 and code-split production bundles.

---

## 6. Implemented Pages & Features

| Route | Page | Key Features |
|---|---|---|
| `/` | **Homepage** | Hero with 60fps canvas node particle visual, Capabilities strip, About preview, Services cards, AI Solutions preview, Filterable portfolio, 7-step development timeline, 8 accessible FAQ accordions, Final CTA. |
| `/about` | **About Us** | Mission, Vision, Approach, 6 Core Values, Target Industry verticals, Embedded methodology. |
| `/services` | **Services Catalogue** | 6 complete services with deliverables, advantages, tech stacks, and inquiry CTAs. |
| `/services/:slug` | **Service Deep Dive** | Dynamic single service view with architecture breakdown, deliverables, and custom inquiry button. |
| `/projects` | **Project Portfolio** | Category filter tabs, instant search bar, tech tags, quick look modal, status badges. |
| `/projects/:slug` | **Case Study** | Problem statement, solution, key features, architecture badges, and inquiry triggers. |
| `/ai-solutions` | **AI Solutions** | Product categories with status (Available, Beta, In Development), live reasoning pipeline terminal simulation. |
| `/careers` | **Careers Portal** | Open vacancies, PDF resume uploader (validated MIME type & size), candidate form, talent community. |
| `/contact` | **Contact & Inquiries** | Verified company details, Start a Project form with service dropdown, budget, timeline, and privacy consent. |
| `/privacy-policy` | **Privacy Policy** | Comprehensive, realistic, and editable data retention & applicant document policy. |
| `/terms` | **Terms & Conditions** | Professional intellectual property, website usage, and disclaimer terms. |
| `/404` | **Custom Not Found** | Futuristic 404 page with navigation shortcuts. |
| `/admin/login` | **Admin Authentication** | Secure login page with JWT token generation. |
| `/admin` | **Admin Dashboard** | Real aggregated counts, KPI metrics, recent inquiry tables, hiring progress. |
| `/admin/inquiries` | **Inquiries Review** | Filter and update status for Project Inquiries and General Contact requests. |
| `/admin/applications`| **Candidate Review** | Review applicant details, download verified PDF resumes, and update hiring stages. |
| `/admin/content` | **Content Manager** | Review and manage services, projects, AI products, and job listings. |

---

## 7. Security & Compliance

- **Authentication**: JWT tokens stored with configurable expiration; password hashing via BCrypt.
- **Form Validation**: Strict client-side validation with Zod and server-side typed validation with Pydantic v2.
- **File Upload Protection**: Only `.pdf` files with valid `%PDF` headers are accepted; strict 5MB size limit; stored with cryptographically unique UUIDs outside public static web roots.
- **HTTP Headers**: Security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`) applied on all responses.
- **CORS**: Domain allowlisting configured via environment settings.
- **Verified Company Details**:
  - **Phone**: `+91 8886315136`
  - **Email**: `jhrst9966@gmail.com`
  - **Website**: `https://jhrst.vercel.app/` / `www.jhrsttech.com`
  - **Address**: `Bengaluru, Karnataka, India – 560068`
  - **Hours**: `Monday - Saturday: 9:00 AM - 6:00 PM IST`

---

## 8. License

&copy; 2026 JHRST Tech Solutions. All rights reserved.

