from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Student)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db=db, student=student)

@router.get("/{student_id}", response_model=schemas.Student)
def read_student(student_id: str, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return db_student

@router.put("/{student_id}", response_model=schemas.Student)
def update_student(student_id: str, student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    return crud.update_student(db, student_id=student_id, student=student)

@router.delete("/{student_id}", response_model=schemas.Student)
def delete_student(student_id: str, db: Session = Depends(get_db)):
    return crud.delete_student(db, student_id=student_id)
