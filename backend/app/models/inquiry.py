from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from app.core.database import Base

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    company_name = Column(String(255), nullable=True)
    service_required = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)
    consent_given = Column(Boolean, default=True)
    status = Column(String(50), default="New") # New, In Review, Contacted, Closed
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class ProjectInquiry(Base):
    __tablename__ = "project_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    company_name = Column(String(255), nullable=True)
    industry = Column(String(100), nullable=True)
    service_required = Column(String(100), nullable=False) # AI Development, Web Development, Mobile Application, etc.
    estimated_budget = Column(String(100), nullable=True)
    expected_timeline = Column(String(100), nullable=True)
    project_description = Column(Text, nullable=False)
    preferred_contact = Column(String(50), default="Email")
    consent_given = Column(Boolean, default=True, nullable=False)
    status = Column(String(50), default="New") # New, Under Review, Discussion Scheduled, Proposal Sent, Archived
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

