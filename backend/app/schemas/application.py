from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime

class JobApplicationCreate(BaseModel):
    job_id: Optional[int] = None
    job_title: str
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    experience_level: str
    relevant_skills: str
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    message: Optional[str] = None
    consent_given: bool

class JobApplicationUpdateStatus(BaseModel):
    status: str
    admin_notes: Optional[str] = None

class JobApplicationOut(BaseModel):
    id: int
    job_id: Optional[int]
    job_title: str
    full_name: str
    email: str
    phone: Optional[str]
    experience_level: str
    relevant_skills: str
    resume_filename: str
    linkedin_url: Optional[str]
    github_url: Optional[str]
    message: Optional[str]
    consent_given: bool
    status: str
    admin_notes: Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

