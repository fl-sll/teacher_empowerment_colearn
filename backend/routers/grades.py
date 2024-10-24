from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Grade)
def create_grade(grade: schemas.GradeCreate, db: Session = Depends(get_db)):
    return crud.create_grade(db=db, grade=grade)

@router.get("/{grade_id}", response_model=schemas.Grade)
def read_grade(grade_id: int, db: Session = Depends(get_db)):
    db_grade = crud.get_grade(db, grade_id=grade_id)
    if db_grade is None:
        raise HTTPException(status_code=404, detail="Grade not found")
    return db_grade

@router.put("/{grade_id}", response_model=schemas.Grade)
def update_grade(grade_id: int, grade: schemas.GradeUpdate, db: Session = Depends(get_db)):
    return crud.update_grade(db, grade_id=grade_id, grade=grade)

@router.delete("/{grade_id}", response_model=schemas.Grade)
def delete_grade(grade_id: int, db: Session = Depends(get_db)):
    return crud.delete_grade(db, grade_id=grade_id)
