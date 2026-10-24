from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job_openings.id", ondelete="SET NULL"), nullable=True)
    job_title = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    experience_level = Column(String(50), nullable=False)
    relevant_skills = Column(String(500), nullable=False)
    resume_filename = Column(String(255), nullable=False)
    resume_path = Column(String(500), nullable=False)
    linkedin_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    message = Column(Text, nullable=True)
    consent_given = Column(Boolean, default=True, nullable=False)
    status = Column(String(50), default="Received") # Received, Under Review, Shortlisted, Interview, Selected, Rejected
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    job = relationship("JobOpening")

