from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class StudentBase(BaseModel):
    id: str
    name: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    class Config:
        orm_mode = True

class StudentUpdate(StudentBase):
    name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    subscription_id: Optional[int] = None 
    stickiness_id: Optional[int] = None

class ParticipationBase(BaseModel):
    student_id: str
    date: date
    video: Optional[int]
    audio: Optional[int]
    chat: Optional[int]
    is_attend: Optional[bool]

class ParticipationCreate(ParticipationBase):
    pass

class ParticipationUpdate(BaseModel):
    video: Optional[int] = None
    audio: Optional[int] = None
    chat: Optional[int] = None
    is_attend: Optional[bool] = None

class Participation(ParticipationBase):
    class Config:
        orm_mode = True

class GradeBase(BaseModel):
    student_id: str
    score: float
    date: date

class GradeUpdate(BaseModel):
    score: Optional[float] = None
    date: Optional[date] = None 

class GradeCreate(GradeBase):
    pass

class Grade(GradeBase):
    class Config:
        orm_mode = True

class SubscriptionBase(BaseModel):
    type: str

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionUpdate(BaseModel):
    type: Optional[str] = None

class Subscription(SubscriptionBase):
    class Config:
        orm_mode = True

class StickinessBase(BaseModel):
    level: str

class StickinessCreate(StickinessBase):
    pass

class StickinessUpdate(BaseModel):
    level: Optional[str] = None

class Stickiness(StickinessBase):
    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    price: float

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None

class Product(ProductBase):
    class Config:
        orm_mode = True

class UnderstandingBase(BaseModel):
    level: str

class UnderstandingCreate(UnderstandingBase):
    pass

class UnderstandingUpdate(BaseModel):
    level: Optional[str] = None

class Understanding(UnderstandingBase):
    class Config:
        orm_mode = True