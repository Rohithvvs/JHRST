from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.admin import AdminUser
from app.models.project import Project
from app.schemas.project import ProjectOut, ProjectCreate, ProjectUpdate

router = APIRouter()

# Public endpoints
@router.get("", response_model=List[ProjectOut])
def list_projects(
    category: Optional[str] = Query(None, description="Filter by category"),
    featured: Optional[bool] = Query(None, description="Filter by featured status"),
    db: Session = Depends(get_db)
):
    query = db.query(Project).filter(Project.is_published == True)
    if category and category.lower() != "all":
        query = query.filter(Project.category.ilike(f"%{category}%"))
    if featured is not None:
        query = query.filter(Project.is_featured == featured)
    return query.order_by(Project.order.asc(), Project.id.desc()).all()

@router.get("/{slug}", response_model=ProjectOut)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug, Project.is_published == True).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project

# Admin endpoints
@router.get("/admin/all", response_model=List[ProjectOut])
def admin_list_projects(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(Project).order_by(Project.order.asc(), Project.id.desc()).all()

@router.post("/admin", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def admin_create_project(payload: ProjectCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    existing = db.query(Project).filter(Project.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A project with this slug already exists")
    project = Project(**payload.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.put("/admin/{id}", response_model=ProjectOut)
def admin_update_project(id: int, payload: ProjectUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)
    
    db.commit()
    db.refresh(project)
    return project

@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_project(id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    db.delete(project)
    db.commit()
    return None

