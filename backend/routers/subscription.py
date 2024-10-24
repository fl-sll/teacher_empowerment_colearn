from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Subscription)
def create_subscription(subscription: schemas.SubscriptionCreate, db: Session = Depends(get_db)):
    return crud.create_subscription(db=db, subscription=subscription)

@router.get("/{subscription_id}", response_model=schemas.Subscription)
def read_subscription(subscription_id: int, db: Session = Depends(get_db)):
    db_subscription = crud.get_subscription(db, subscription_id=subscription_id)
    if db_subscription is None:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return db_subscription

@router.put("/{subscription_id}", response_model=schemas.Subscription)
def update_subscription(subscription_id: int, subscription: schemas.SubscriptionUpdate, db: Session = Depends(get_db)):
    return crud.update_subscription(db, subscription_id=subscription_id, subscription=subscription)

@router.delete("/{subscription_id}", response_model=schemas.Subscription)
def delete_subscription(subscription_id: int, db: Session = Depends(get_db)):
    return crud.delete_subscription(db, subscription_id=subscription_id)
