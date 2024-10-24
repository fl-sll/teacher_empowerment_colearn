from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Participation)
def create_participation(participation: schemas.ParticipationCreate, db: Session = Depends(get_db)):
    return crud.create_participation(db=db, participation=participation)

@router.get("/{participation_id}", response_model=schemas.Participation)
def read_participation(participation_id: int, db: Session = Depends(get_db)):
    db_participation = crud.get_participation(db, participation_id=participation_id)
    if db_participation is None:
        raise HTTPException(status_code=404, detail="Participation not found")
    return db_participation

@router.put("/{participation_id}", response_model=schemas.Participation)
def update_participation(participation_id: int, participation: schemas.ParticipationUpdate, db: Session = Depends(get_db)):
    return crud.update_participation(db, participation_id=participation_id, participation=participation)

@router.delete("/{participation_id}", response_model=schemas.Participation)
def delete_participation(participation_id: int, db: Session = Depends(get_db)):
    return crud.delete_participation(db, participation_id=participation_id)
