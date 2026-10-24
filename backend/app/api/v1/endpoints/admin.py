from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.admin import AdminUser
from app.models.service import Service
from app.models.project import Project
from app.models.product import AIProduct
from app.models.job import JobOpening
from app.models.inquiry import ContactInquiry, ProjectInquiry
from app.models.application import JobApplication
from app.schemas.inquiry import ContactInquiryOut, ProjectInquiryOut
from pydantic import BaseModel

router = APIRouter()

class DashboardStats(BaseModel):
    total_services: int
    published_services: int
    total_projects: int
    published_projects: int
    total_ai_products: int
    active_jobs: int
    new_contact_inquiries: int
    total_contact_inquiries: int
    new_project_inquiries: int
    total_project_inquiries: int
    total_applications: int
    recent_inquiries: List[ContactInquiryOut]
    recent_project_inquiries: List[ProjectInquiryOut]

class StatusUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = None

@router.get("/dashboard", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    total_services = db.query(Service).count()
    published_services = db.query(Service).filter(Service.is_published == True).count()
    
    total_projects = db.query(Project).count()
    published_projects = db.query(Project).filter(Project.is_published == True).count()
    
    total_ai_products = db.query(AIProduct).count()
    active_jobs = db.query(JobOpening).filter(JobOpening.is_active == True).count()
    
    new_contact_inquiries = db.query(ContactInquiry).filter(ContactInquiry.status == "New").count()
    total_contact_inquiries = db.query(ContactInquiry).count()
    
    new_project_inquiries = db.query(ProjectInquiry).filter(ProjectInquiry.status == "New").count()
    total_project_inquiries = db.query(ProjectInquiry).count()
    
    total_applications = db.query(JobApplication).count()

    recent_inquiries = db.query(ContactInquiry).order_by(ContactInquiry.id.desc()).limit(5).all()
    recent_project_inquiries = db.query(ProjectInquiry).order_by(ProjectInquiry.id.desc()).limit(5).all()

    return DashboardStats(
        total_services=total_services,
        published_services=published_services,
        total_projects=total_projects,
        published_projects=published_projects,
        total_ai_products=total_ai_products,
        active_jobs=active_jobs,
        new_contact_inquiries=new_contact_inquiries,
        total_contact_inquiries=total_contact_inquiries,
        new_project_inquiries=new_project_inquiries,
        total_project_inquiries=total_project_inquiries,
        total_applications=total_applications,
        recent_inquiries=recent_inquiries,
        recent_project_inquiries=recent_project_inquiries
    )

# Contact inquiries review
@router.get("/contact-inquiries", response_model=List[ContactInquiryOut])
def list_contact_inquiries(
    status_filter: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    query = db.query(ContactInquiry)
    if status_filter:
        query = query.filter(ContactInquiry.status.ilike(status_filter))
    return query.order_by(ContactInquiry.id.desc()).all()

@router.put("/contact-inquiries/{id}/status", response_model=ContactInquiryOut)
def update_contact_inquiry_status(
    id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == id).first()
    if not inquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inquiry not found")
    inquiry.status = payload.status
    db.commit()
    db.refresh(inquiry)
    return inquiry

# Project inquiries review
@router.get("/project-inquiries", response_model=List[ProjectInquiryOut])
def list_project_inquiries(
    status_filter: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    query = db.query(ProjectInquiry)
    if status_filter:
        query = query.filter(ProjectInquiry.status.ilike(status_filter))
    return query.order_by(ProjectInquiry.id.desc()).all()

@router.put("/project-inquiries/{id}/status", response_model=ProjectInquiryOut)
def update_project_inquiry_status(
    id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    inquiry = db.query(ProjectInquiry).filter(ProjectInquiry.id == id).first()
    if not inquiry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project inquiry not found")
    inquiry.status = payload.status
    if payload.admin_notes is not None:
        inquiry.admin_notes = payload.admin_notes
    db.commit()
    db.refresh(inquiry)
    return inquiry

