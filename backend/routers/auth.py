from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.schemas import AdminRegister, AdminLogin, Token
from models.models import Admin
from utils.auth import hash_password, verify_password, create_token
from database import get_db

router = APIRouter(prefix="/api/admin", tags=["auth"])

@router.post("/register")
def register(admin: AdminRegister, db: Session = Depends(get_db)):
    if db.query(Admin).filter(Admin.username == admin.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_pw = hash_password(admin.password)
    new_admin = Admin(username=admin.username, hashed_password=hashed_pw)
    db.add(new_admin)
    db.commit()
    return {"message": "Admin created"}

@router.post("/login", response_model=Token)
def login(auth: AdminLogin, db: Session = Depends(get_db)):
    user = db.query(Admin).filter(Admin.username == auth.username).first()
    if not user or not verify_password(auth.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": user.username})
    return {"access_token": token}
