from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class AIProductBase(BaseModel):
    slug: str
    title: str
    category: str
    description: str
    problem_solved: Optional[str] = None
    features: List[str] = []
    status: str = "In Development" # Available, Beta, In Development, Concept
    demo_url: Optional[str] = None
    docs_url: Optional[str] = None
    is_published: bool = True
    order: int = 0

class AIProductCreate(AIProductBase):
    pass

class AIProductUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    problem_solved: Optional[str] = None
    features: Optional[List[str]] = None
    status: Optional[str] = None
    demo_url: Optional[str] = None
    docs_url: Optional[str] = None
    is_published: Optional[bool] = None
    order: Optional[int] = None

class AIProductOut(AIProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

