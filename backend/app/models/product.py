from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from app.core.database import Base

class AIProduct(Base):
    __tablename__ = "ai_products"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False) # AI Assistants, AI Recruitment, Computer Vision, Document Intelligence, Business Automation
    description = Column(Text, nullable=False)
    problem_solved = Column(Text, nullable=True)
    features = Column(JSON, default=list)
    status = Column(String(50), default="In Development") # Available, Beta, In Development, Concept
    demo_url = Column(String(500), nullable=True)
    docs_url = Column(String(500), nullable=True)
    is_published = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

