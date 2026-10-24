from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.admin import AdminUser
from app.models.job import JobOpening
from app.schemas.job import JobOpeningOut, JobOpeningCreate, JobOpeningUpdate

router = APIRouter()

# Public endpoints
@router.get("", response_model=List[JobOpeningOut])
def list_jobs(
    department: Optional[str] = Query(None),
    employment_type: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(JobOpening).filter(JobOpening.is_active == True)
    if department and department.lower() != "all":
        query = query.filter(JobOpening.department.ilike(f"%{department}%"))
    if employment_type and employment_type.lower() != "all":
        query = query.filter(JobOpening.employment_type.ilike(f"%{employment_type}%"))
    if location and location.lower() != "all":
        query = query.filter(JobOpening.location.ilike(f"%{location}%"))
    return query.order_by(JobOpening.id.desc()).all()

@router.get("/{slug}", response_model=JobOpeningOut)
def get_job_by_slug(slug: str, db: Session = Depends(get_db)):
    job = db.query(JobOpening).filter(JobOpening.slug == slug, JobOpening.is_active == True).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job opening not found")
    return job

# Admin endpoints
@router.get("/admin/all", response_model=List[JobOpeningOut])
def admin_list_jobs(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(JobOpening).order_by(JobOpening.id.desc()).all()

@router.post("/admin", response_model=JobOpeningOut, status_code=status.HTTP_201_CREATED)
def admin_create_job(payload: JobOpeningCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    existing = db.query(JobOpening).filter(JobOpening.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A job opening with this slug already exists")
    job = JobOpening(**payload.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

@router.put("/admin/{id}", response_model=JobOpeningOut)
def admin_update_job(id: int, payload: JobOpeningUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    job = db.query(JobOpening).filter(JobOpening.id == id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job opening not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(job, key, value)
    
    db.commit()
    db.refresh(job)
    return job

@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_job(id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    job = db.query(JobOpening).filter(JobOpening.id == id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job opening not found")
    db.delete(job)
    db.commit()
    return None

