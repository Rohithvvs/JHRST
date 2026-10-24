from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.admin import AdminUser
from app.models.product import AIProduct
from app.schemas.product import AIProductOut, AIProductCreate, AIProductUpdate

router = APIRouter()

# Public endpoints
@router.get("", response_model=List[AIProductOut])
def list_products(
    category: Optional[str] = Query(None),
    status_filter: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(AIProduct).filter(AIProduct.is_published == True)
    if category:
        query = query.filter(AIProduct.category.ilike(f"%{category}%"))
    if status_filter:
        query = query.filter(AIProduct.status.ilike(status_filter))
    return query.order_by(AIProduct.order.asc(), AIProduct.id.asc()).all()

@router.get("/{slug}", response_model=AIProductOut)
def get_product_by_slug(slug: str, db: Session = Depends(get_db)):
    product = db.query(AIProduct).filter(AIProduct.slug == slug, AIProduct.is_published == True).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="AI Product not found")
    return product

# Admin endpoints
@router.get("/admin/all", response_model=List[AIProductOut])
def admin_list_products(db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    return db.query(AIProduct).order_by(AIProduct.order.asc(), AIProduct.id.asc()).all()

@router.post("/admin", response_model=AIProductOut, status_code=status.HTTP_201_CREATED)
def admin_create_product(payload: AIProductCreate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    existing = db.query(AIProduct).filter(AIProduct.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A product with this slug already exists")
    product = AIProduct(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.put("/admin/{id}", response_model=AIProductOut)
def admin_update_product(id: int, payload: AIProductUpdate, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    product = db.query(AIProduct).filter(AIProduct.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="AI Product not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/admin/{id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_product(id: int, db: Session = Depends(get_db), current_admin: AdminUser = Depends(get_current_admin)):
    product = db.query(AIProduct).filter(AIProduct.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="AI Product not found")
    db.delete(product)
    db.commit()
    return None

