from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.admin import AdminUser
from app.models.service import Service
from app.schemas.service import ServiceOut, ServiceCreate, ServiceUpdate

router = APIRouter()

# Public endpoints
@router.get("", response_model=List[ServiceOut])
def list_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.is_published == True).order_by(Service.order.asc(), Service.id.asc()).all()

@router.get("/{slug}", response_model=ServiceOut)
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug, Service.is_published == True).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return service

# Admin endpoints
@router.get("/admin/all", response_model=List[ServiceOut])
def admin_list_services(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(Service).order_by(Service.order.asc(), Service.id.asc()).all()

@router.post("/admin", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
def admin_create_service(payload: ServiceCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    existing = db.query(Service).filter(Service.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A service with this slug already exists")
    service = Service(**payload.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

@router.put("/admin/{id}", response_model=ServiceOut)
def admin_update_service(id: int, payload: ServiceUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    service = db.query(Service).filter(Service.id == id).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(service, key, value)
    
    db.commit()
    db.refresh(service)
    return service

@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_service(id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    service = db.query(Service).filter(Service.id == id).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    db.delete(service)
    db.commit()
    return None

