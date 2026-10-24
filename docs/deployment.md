# JHRST Tech Solutions — Production Deployment Guide

This guide covers deployment strategies for hosting the **JHRST Tech Solutions** corporate website, FastAPI backend, and PostgreSQL database.

---

## 1. Architecture Overview

```
[ Browser / Client ]
         │
         ▼
[ Frontend (Vercel / Netlify) ] ── (API calls) ──► [ Backend (Render / Railway / VPS) ]
                                                              │
                                                              ▼
                                                   [ Managed PostgreSQL ]
```

---

## 2. Frontend Deployment (Vercel / Netlify)

### Option A: Vercel
1. Connect your GitHub repository to Vercel.
2. Select the `frontend` folder as the Root Directory.
3. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`
4. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://api.jhrst.com/api/v1` (or your backend URL)
5. Add a Single Page Application redirect rule by creating `frontend/vercel.json`:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
6. Deploy!

### Option B: Netlify
1. Connect repository, set Base directory to `frontend`.
2. Build command: `npm run build`, Publish directory: `frontend/dist`.
3. Add `frontend/public/_redirects`:
   ```text
   /*    /index.html   200
   ```
4. Set `VITE_API_BASE_URL`.

---

## 3. Backend Deployment (Render / Railway / VPS)

### Option A: Render
1. Create a new **Web Service** pointing to the `backend` directory.
2. Runtime: **Python 3**.
3. Build Command: `pip install -r requirements.txt`
4. Start Command:
   ```bash
   python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
5. Environment Variables:
   - `ENVIRONMENT`: `production`
   - `DEBUG`: `False`
   - `SECRET_KEY`: `<generate-a-cryptographically-secure-random-token>`
   - `DATABASE_URL`: `postgresql+psycopg2://user:password@host:port/database`
   - `BACKEND_CORS_ORIGINS`: `["https://jhrst.com","https://www.jhrst.com"]`
   - `ADMIN_DEFAULT_EMAIL`: `admin@jhrst.com`
   - `ADMIN_DEFAULT_PASSWORD`: `<strong-unique-password>`

### Option B: Linux VPS (Ubuntu + Nginx + Gunicorn/Uvicorn)
1. Clone repository to `/var/www/jhrst`.
2. Setup virtual environment:
   ```bash
   cd /var/www/jhrst/backend
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
3. Create systemd service `/etc/systemd/system/jhrst-api.service`:
   ```ini
   [Unit]
   Description=JHRST Tech Solutions FastAPI Backend
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/var/www/jhrst/backend
   Environment="PATH=/var/www/jhrst/backend/.venv/bin"
   ExecStart=/var/www/jhrst/backend/.venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 4

   [Install]
   WantedBy=multi-user.target
   ```
4. Enable and start:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable jhrst-api
   sudo systemctl start jhrst-api
   ```
5. Nginx reverse proxy configuration (`/etc/nginx/sites-available/api.jhrst.com`):
   ```nginx
   server {
       server_name api.jhrst.com;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
6. Secure with Certbot (Let's Encrypt SSL):
   ```bash
   sudo certbot --nginx -d api.jhrst.com
   ```

---

## 4. Managed PostgreSQL Setup

1. Create a PostgreSQL 15 or 16 database on Supabase, AWS RDS, Neon, or Render PostgreSQL.
2. Obtain connection string in standard SQLAlchemy format:
   ```
   postgresql://<user>:<password>@<host>:<port>/<dbname>?sslmode=require
   ```
3. Set in backend `.env` as `DATABASE_URL`.
4. When the API boots up, SQLAlchemy initializes all tables and seeds the admin user automatically.

---

## 5. Security Checklist Before Going Live

- [ ] Change `SECRET_KEY` to a random 64-character hex string.
- [ ] Set `DEBUG=False`.
- [ ] Change `ADMIN_DEFAULT_PASSWORD` to a strong unique password.
- [ ] Restrict `BACKEND_CORS_ORIGINS` strictly to your production domain(s).
- [ ] Ensure HTTPS is enforced on both frontend and backend.
- [ ] Verify that resume uploads are stored in private storage (e.g. AWS S3 or protected persistent disks) not accessible through public static web URLs.

