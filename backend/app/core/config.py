import os
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "JHRST Tech Solutions API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    @field_validator("DEBUG", mode="before")
    @classmethod
    def parse_debug(cls, v):
        if isinstance(v, str):
            return v.lower() in ("true", "1", "yes", "on", "debug")
        return bool(v)
    
    # Security
    SECRET_KEY: str = "change-me-in-production-super-secret-key-jhrst-tech-2026-gold"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Admin Seed Credentials
    ADMIN_DEFAULT_EMAIL: str = "admin@jhrst.com"
    ADMIN_DEFAULT_PASSWORD: str = "JhrstAdmin2026#Secure"
    
    # Database
    DATABASE_URL: str = "sqlite:///./jhrst.db"
    
    # CORS Origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://jhrst.vercel.app",
        "http://www.jhrsttech.com",
        "https://www.jhrsttech.com",
        "https://jhrst.com",
        "https://www.jhrst.com"
    ]
    
    # Email / SMTP Settings
    SMTP_ENABLED: bool = False
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "notifications@jhrst.com"
    INQUIRY_RECEIVER_EMAIL: str = "jhrst9966@gmail.com"
    
    # Upload Settings
    UPLOAD_DIR: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../uploads"))
    MAX_UPLOAD_SIZE_BYTES: int = 5 * 1024 * 1024  # 5 MB
    ALLOWED_RESUME_TYPES: List[str] = ["application/pdf"]
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()

