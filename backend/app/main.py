import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.core.database import Base, engine
from app.db.seed import seed_database
from app.api.v1.router import api_router

# Setup logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("jhrst.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database schema exists & seed default data if empty
    logger.info("Initializing database and ensuring tables exist...")
    Base.metadata.create_all(bind=engine)
    logger.info("Checking and seeding default data...")
    seed_database()
    logger.info("JHRST Tech Solutions API is ready.")
    yield
    # Shutdown
    logger.info("Shutting down API server...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Official API for JHRST Tech Solutions — Corporate Website, AI Solutions, Projects, Careers, and Secure Administration.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response

# Include API v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Health"])
def root():
    return {
        "company": "JHRST Tech Solutions",
        "tagline": "BUILD. INNOVATE. GROW.",
        "status": "online",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "jhrst-api"}

