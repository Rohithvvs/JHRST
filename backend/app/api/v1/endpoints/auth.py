from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, create_access_token, get_current_admin
from app.models.admin import AdminUser
from app.schemas.auth import TokenResponse, AdminUserOut, LoginRequest

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(AdminUser.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Account is deactivated")

    access_token = create_access_token(subject=user.email)
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_email=user.email,
        user_name=user.full_name,
        role=user.role
    )

@router.get("/me", response_model=AdminUserOut)
def get_me(current_admin: AdminUser = Depends(get_current_admin)):
    return current_admin

