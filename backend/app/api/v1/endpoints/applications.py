import os
from typing import List, Optional
from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException, Query, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.admin import AdminUser
from app.models.application import JobApplication
from app.schemas.application import JobApplicationOut, JobApplicationUpdateStatus
from app.services.file_storage import save_resume_file
from app.core.email import send_notification_email

router = APIRouter()

# Public endpoint: Submit application
@router.post("", response_model=JobApplicationOut, status_code=status.HTTP_201_CREATED)
async def submit_job_application(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    job_id: Optional[int] = Form(None),
    job_title: str = Form(...),
    experience_level: str = Form(...),
    relevant_skills: str = Form(...),
    linkedin_url: Optional[str] = Form(None),
    github_url: Optional[str] = Form(None),
    message: Optional[str] = Form(None),
    consent_given: bool = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not consent_given:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You must consent to privacy terms to apply.")
    
    # Securely save resume file
    original_name, stored_path = save_resume_file(resume)

    application = JobApplication(
        job_id=job_id,
        job_title=job_title,
        full_name=full_name,
        email=email,
        phone=phone,
        experience_level=experience_level,
        relevant_skills=relevant_skills,
        resume_filename=original_name,
        resume_path=stored_path,
        linkedin_url=linkedin_url,
        github_url=github_url,
        message=message,
        consent_given=consent_given,
        status="Received"
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    # Dispatch notification email
    email_html = f"""
    <h2>New Job Application Received</h2>
    <p><strong>Candidate:</strong> {application.full_name}</p>
    <p><strong>Position:</strong> {application.job_title}</p>
    <p><strong>Email:</strong> {application.email}</p>
    <p><strong>Phone:</strong> {application.phone or 'N/A'}</p>
    <p><strong>Experience Level:</strong> {application.experience_level}</p>
    <p><strong>Key Skills:</strong> {application.relevant_skills}</p>
    <p><strong>LinkedIn:</strong> {application.linkedin_url or 'N/A'}</p>
    <p><strong>GitHub:</strong> {application.github_url or 'N/A'}</p>
    <p><strong>Resume File:</strong> {application.resume_filename}</p>
    """
    send_notification_email(
        subject=f"[JHRST Careers] Application for {application.job_title} - {application.full_name}",
        html_content=email_html
    )

    return application

# Admin endpoints: list applications, download resume, update status
@router.get("/admin/all", response_model=List[JobApplicationOut])
def admin_list_applications(
    job_id: Optional[int] = Query(None),
    status_filter: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    query = db.query(JobApplication)
    if job_id:
        query = query.filter(JobApplication.job_id == job_id)
    if status_filter:
        query = query.filter(JobApplication.status.ilike(status_filter))
    return query.order_by(JobApplication.id.desc()).all()

@router.get("/admin/{id}/resume")
def admin_download_resume(
    id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    app = db.query(JobApplication).filter(JobApplication.id == id).first()
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    
    file_full_path = os.path.join(settings.UPLOAD_DIR, app.resume_path)
    if not os.path.exists(file_full_path):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume file not found on server")
    
    return FileResponse(
        path=file_full_path,
        media_type="application/pdf",
        filename=app.resume_filename
    )

@router.put("/admin/{id}/status", response_model=JobApplicationOut)
def admin_update_application_status(
    id: int,
    payload: JobApplicationUpdateStatus,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin)
):
    app = db.query(JobApplication).filter(JobApplication.id == id).first()
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    
    app.status = payload.status
    if payload.admin_notes is not None:
        app.admin_notes = payload.admin_notes
    
    db.commit()
    db.refresh(app)
    return app

