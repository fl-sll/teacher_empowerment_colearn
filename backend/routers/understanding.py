from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Understanding)
def create_understanding(understanding: schemas.UnderstandingCreate, db: Session = Depends(get_db)):
    return crud.create_understanding(db=db, understanding=understanding)

@router.get("/{understanding_id}", response_model=schemas.Understanding)
def read_understanding(understanding_id: int, db: Session = Depends(get_db)):
    db_understanding = crud.get_understanding(db, understanding_id=understanding_id)
    if db_understanding is None:
        raise HTTPException(status_code=404, detail="Understanding not found")
    return db_understanding

@router.put("/{understanding_id}", response_model=schemas.Understanding)
def update_understanding(understanding_id: int, understanding: schemas.UnderstandingUpdate, db: Session = Depends(get_db)):
    return crud.update_understanding(db, understanding_id=understanding_id, understanding=understanding)

@router.delete("/{understanding_id}", response_model=schemas.Understanding)
def delete_understanding(understanding_id: int, db: Session = Depends(get_db)):
    return crud.delete_understanding(db, understanding_id=understanding_id)
