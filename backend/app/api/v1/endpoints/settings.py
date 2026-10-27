from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.admin import AdminUser
from app.models.setting import WebsiteSetting
from pydantic import BaseModel

router = APIRouter()

class SettingItem(BaseModel):
    key: str
    value: str
    category: str = "general"

@router.get("/public")
def get_public_settings(db: Session = Depends(get_db)):
    """
    Returns public company information such as email, phone, address, and social links.
    """
    settings_records = db.query(WebsiteSetting).all()
    # Default fallbacks representing real placeholders as required by user prompt
    data = {
        "company_name": "JHRST Tech Solutions",
        "tagline": "BUILD. INNOVATE. GROW.",
        "email": "jhrst9966@gmail.com",
        "phone": "+91 99662 84338",
        "address": "Bengaluru, Karnataka, India – 560068",
        "business_hours": "Monday - Saturday: 9:00 AM - 6:00 PM IST",
        "linkedin_url": "https://linkedin.com/company/jhrst-tech-solutions",
        "instagram_url": "https://instagram.com/jhrsttech",
        "github_url": "https://github.com/jhrst-tech"
    }
    for item in settings_records:
        data[item.key] = item.value
    return data

@router.get("/admin/all")
def get_all_settings(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(WebsiteSetting).all()

@router.put("/admin")
def update_setting(item: SettingItem, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    setting = db.query(WebsiteSetting).filter(WebsiteSetting.key == item.key).first()
    if setting:
        setting.value = item.value
        setting.category = item.category
    else:
        setting = WebsiteSetting(key=item.key, value=item.value, category=item.category)
        db.add(setting)
    db.commit()
    return {"status": "success", "key": item.key, "value": item.value}

