from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, product=product)

@router.get("/{product_id}", response_model=schemas.Product)
def read_product(product_id: str, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@router.put("/{product_id}", response_model=schemas.Product)
def update_product(product_id: str, product: schemas.ProductUpdate, db: Session = Depends(get_db)):
    return crud.update_product(db, product_id=product_id, product=product)

@router.delete("/{product_id}", response_model=schemas.Product)
def delete_product(product_id: str, db: Session = Depends(get_db)):
    return crud.delete_product(db, product_id=product_id)
