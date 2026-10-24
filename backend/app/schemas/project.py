from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    slug: str
    title: str
    category: str
    short_description: str
    problem_statement: Optional[str] = None
    solution: Optional[str] = None
    key_features: List[str] = []
    tech_stack: List[str] = []
    image_url: Optional[str] = None
    status: str = "In Development"
    demo_url: Optional[str] = None
    source_code_url: Optional[str] = None
    is_published: bool = True
    is_featured: bool = False
    order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    short_description: Optional[str] = None
    problem_statement: Optional[str] = None
    solution: Optional[str] = None
    key_features: Optional[List[str]] = None
    tech_stack: Optional[List[str]] = None
    image_url: Optional[str] = None
    status: Optional[str] = None
    demo_url: Optional[str] = None
    source_code_url: Optional[str] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None
    order: Optional[int] = None

class ProjectOut(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

