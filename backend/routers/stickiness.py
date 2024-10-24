from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Stickiness)
def create_stickiness(stickiness: schemas.StickinessCreate, db: Session = Depends(get_db)):
    return crud.create_stickiness(db=db, stickiness=stickiness)

@router.get("/{stickiness_id}", response_model=schemas.Stickiness)
def read_stickiness(stickiness_id: int, db: Session = Depends(get_db)):
    db_stickiness = crud.get_stickiness(db, stickiness_id=stickiness_id)
    if db_stickiness is None:
        raise HTTPException(status_code=404, detail="Stickiness not found")
    return db_stickiness

@router.put("/{stickiness_id}", response_model=schemas.Stickiness)
def update_stickiness(stickiness_id: int, stickiness: schemas.StickinessUpdate, db: Session = Depends(get_db)):
    return crud.update_stickiness(db, stickiness_id=stickiness_id, stickiness=stickiness)

@router.delete("/{stickiness_id}", response_model=schemas.Stickiness)
def delete_stickiness(stickiness_id: int, db: Session = Depends(get_db)):
    return crud.delete_stickiness(db, stickiness_id=stickiness_id)
