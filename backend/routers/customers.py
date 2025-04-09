from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import get_db
from models.models import Customer
from schemas.schemas import Customer as CustomerResponse, CustomerCreate
from utils.auth import decode_token
from typing import List

router = APIRouter(prefix="/api/customers", tags=["customers"])

def get_current_admin(authorization: str = Header(...)):
    token = authorization.split(" ")[1] if " " in authorization else authorization
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload["sub"]

@router.get("/", response_model=List[CustomerResponse])
def list_customers(db: Session = Depends(get_db), _: str = Depends(get_current_admin)):
    return db.query(Customer).all()

@router.post("/", response_model=CustomerResponse)
def add_customer(data: CustomerCreate, db: Session = Depends(get_db), _: str = Depends(get_current_admin)):
    cust = Customer(**data.model_dump())
    db.add(cust)
    db.commit()
    db.refresh(cust)
    return cust

@router.put("/{id}", response_model=CustomerResponse)
def edit_customer(id: int, data: CustomerCreate, db: Session = Depends(get_db), _: str = Depends(get_current_admin)):
    cust = db.get(Customer, id)
    if not cust:
        raise HTTPException(status_code=404, detail="Customer not found")
    cust.name = data.name
    cust.email = data.email
    db.commit()
    return cust

@router.delete("/{id}")
def delete_customer(id: int, db: Session = Depends(get_db), _: str = Depends(get_current_admin)):
    cust = db.get(Customer, id)
    if not cust:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(cust)
    db.commit()
    return {"message": "Deleted"}
