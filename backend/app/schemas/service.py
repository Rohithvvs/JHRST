from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class ServiceBase(BaseModel):
    slug: str
    title: str
    icon_name: str = "Code"
    short_description: str
    full_description: str
    offerings: List[str] = []
    business_benefits: List[str] = []
    tech_stack: List[str] = []
    cta_label: str = "Learn More"
    order: int = 0
    is_published: bool = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    icon_name: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    offerings: Optional[List[str]] = None
    business_benefits: Optional[List[str]] = None
    tech_stack: Optional[List[str]] = None
    cta_label: Optional[str] = None
    order: Optional[int] = None
    is_published: Optional[bool] = None

class ServiceOut(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

