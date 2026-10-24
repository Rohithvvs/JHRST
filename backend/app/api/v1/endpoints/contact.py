from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.inquiry import ContactInquiry
from app.schemas.inquiry import ContactInquiryCreate, ContactInquiryOut
from app.core.email import send_notification_email

router = APIRouter()

@router.post("", response_model=ContactInquiryOut, status_code=status.HTTP_201_CREATED)
def submit_contact_inquiry(payload: ContactInquiryCreate, db: Session = Depends(get_db)):
    # 1. Basic validation and sanitization
    if not payload.full_name.strip() or not payload.message.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Name and message are required.")
    
    # 2. Save inquiry to database
    inquiry = ContactInquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    # 3. Trigger email notification
    email_html = f"""
    <h2>New Contact Inquiry - JHRST Tech Solutions</h2>
    <p><strong>Name:</strong> {inquiry.full_name}</p>
    <p><strong>Email:</strong> {inquiry.email}</p>
    <p><strong>Phone:</strong> {inquiry.phone or 'N/A'}</p>
    <p><strong>Company:</strong> {inquiry.company_name or 'N/A'}</p>
    <p><strong>Service Interest:</strong> {inquiry.service_required or 'General'}</p>
    <p><strong>Message:</strong></p>
    <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #D4AF37;">{inquiry.message}</blockquote>
    """
    send_notification_email(
        subject=f"[JHRST Inquiry] From {inquiry.full_name} ({inquiry.service_required or 'General'})",
        html_content=email_html
    )

    return inquiry

