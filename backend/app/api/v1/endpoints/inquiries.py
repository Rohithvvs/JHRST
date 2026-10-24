from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.inquiry import ProjectInquiry
from app.schemas.inquiry import ProjectInquiryCreate, ProjectInquiryOut
from app.core.email import send_notification_email

router = APIRouter()

@router.post("", response_model=ProjectInquiryOut, status_code=status.HTTP_201_CREATED)
def submit_project_inquiry(payload: ProjectInquiryCreate, db: Session = Depends(get_db)):
    if not payload.full_name.strip() or not payload.project_description.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Full name and project description are required.")
    
    inquiry = ProjectInquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    # Dispatch notification email
    email_html = f"""
    <h2>New Project Inquiry - JHRST Tech Solutions</h2>
    <p><strong>Client:</strong> {inquiry.full_name}</p>
    <p><strong>Email:</strong> {inquiry.email}</p>
    <p><strong>Phone:</strong> {inquiry.phone or 'Not provided'}</p>
    <p><strong>Company:</strong> {inquiry.company_name or 'Individual / Startup'}</p>
    <p><strong>Industry:</strong> {inquiry.industry or 'N/A'}</p>
    <p><strong>Service:</strong> {inquiry.service_required}</p>
    <p><strong>Budget:</strong> {inquiry.estimated_budget or 'Flexible'}</p>
    <p><strong>Timeline:</strong> {inquiry.expected_timeline or 'Flexible'}</p>
    <p><strong>Preferred Contact:</strong> {inquiry.preferred_contact or 'Email'}</p>
    <p><strong>Project Details:</strong></p>
    <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #D4AF37;">{inquiry.project_description}</blockquote>
    """
    send_notification_email(
        subject=f"[JHRST Project Inquiry] {inquiry.service_required} - {inquiry.full_name}",
        html_content=email_html
    )

    return inquiry

