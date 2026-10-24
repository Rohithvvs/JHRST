from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class JobOpeningBase(BaseModel):
    slug: str
    title: str
    department: str
    employment_type: str = "Full-time"
    location: str = "Remote"
    experience_level: str = "Mid-level"
    description: str
    responsibilities: List[str] = []
    requirements: List[str] = []
    nice_to_have: List[str] = []
    deadline: Optional[str] = None
    is_active: bool = True

class JobOpeningCreate(JobOpeningBase):
    pass

class JobOpeningUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    department: Optional[str] = None
    employment_type: Optional[str] = None
    location: Optional[str] = None
    experience_level: Optional[str] = None
    description: Optional[str] = None
    responsibilities: Optional[List[str]] = None
    requirements: Optional[List[str]] = None
    nice_to_have: Optional[List[str]] = None
    deadline: Optional[str] = None
    is_active: Optional[bool] = None

class JobOpeningOut(JobOpeningBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

