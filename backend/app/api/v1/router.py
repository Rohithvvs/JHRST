from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    services,
    projects,
    products,
    jobs,
    contact,
    inquiries,
    applications,
    admin,
    settings
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/admin/auth", tags=["Admin Auth"])
api_router.include_router(services.router, prefix="/services", tags=["Services"])
api_router.include_router(projects.router, prefix="/projects", tags=["Projects"])
api_router.include_router(products.router, prefix="/products", tags=["AI Products & Solutions"])
api_router.include_router(jobs.router, prefix="/jobs", tags=["Careers & Jobs"])
api_router.include_router(contact.router, prefix="/contact", tags=["Contact Inquiries"])
api_router.include_router(inquiries.router, prefix="/project-inquiries", tags=["Project Inquiries"])
api_router.include_router(applications.router, prefix="/job-applications", tags=["Job Applications"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin Dashboard & Inquiries"])
api_router.include_router(settings.router, prefix="/settings", tags=["Website Settings"])

