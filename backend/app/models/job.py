from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from app.core.database import Base

class JobOpening(Base):
    __tablename__ = "job_openings"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    department = Column(String(100), nullable=False) # Engineering, AI & Data, Design, Product, Operations
    employment_type = Column(String(50), default="Full-time") # Full-time, Part-time, Contract, Internship
    location = Column(String(100), default="Remote") # Remote, Hybrid, On-site
    experience_level = Column(String(50), default="Mid-level") # Entry-level, Mid-level, Senior, Internship
    description = Column(Text, nullable=False)
    responsibilities = Column(JSON, default=list)
    requirements = Column(JSON, default=list)
    nice_to_have = Column(JSON, default=list)
    deadline = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

