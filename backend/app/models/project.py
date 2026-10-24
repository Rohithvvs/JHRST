from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False) # AI Applications, Web Applications, Mobile Applications, Automation, Data and Analytics
    short_description = Column(String(500), nullable=False)
    problem_statement = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    key_features = Column(JSON, default=list)
    tech_stack = Column(JSON, default=list)
    image_url = Column(String(500), nullable=True)
    status = Column(String(50), default="In Development") # Available, Beta, In Development, Concept
    demo_url = Column(String(500), nullable=True)
    source_code_url = Column(String(500), nullable=True)
    is_published = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

