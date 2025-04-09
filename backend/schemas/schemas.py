from pydantic import BaseModel, ConfigDict

class AdminRegister(BaseModel):
    username: str
    password: str

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class CustomerCreate(BaseModel):
    name: str
    email: str

class Customer(CustomerCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
