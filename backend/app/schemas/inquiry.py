from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime

class ContactInquiryCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    company_name: Optional[str] = None
    service_required: Optional[str] = None
    message: str
    consent_given: bool = True

class ContactInquiryOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str]
    company_name: Optional[str]
    service_required: Optional[str]
    message: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ProjectInquiryCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    company_name: Optional[str] = None
    industry: Optional[str] = None
    service_required: str
    estimated_budget: Optional[str] = None
    expected_timeline: Optional[str] = None
    project_description: str
    preferred_contact: Optional[str] = "Email"
    consent_given: bool = True

class ProjectInquiryOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str]
    company_name: Optional[str]
    industry: Optional[str]
    service_required: str
    estimated_budget: Optional[str]
    expected_timeline: Optional[str]
    project_description: str
    preferred_contact: Optional[str]
    status: str
    admin_notes: Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

