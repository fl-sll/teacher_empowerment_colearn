from sqlalchemy.orm import Session
from . import models, schemas

# Student CRUD operations
def get_student(db: Session, student_id: str):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def get_students(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Student).offset(skip).limit(limit).all()

def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(
        id=student.id, 
        name=student.name, 
        start_date=student.start_date, 
        end_date=student.end_date,
        subscription_id=student.subscription_id,
        stickiness_id=student.stickiness_id
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: str, student_update: schemas.StudentUpdate):
    db_student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if not db_student:
        return None
    for field, value in student_update.dict().items():
        setattr(db_student, field, value)
    db.commit()
    db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: str):
    db_student = db.query(models.Student).filter(models.Student.id == student_id).first()
    if db_student:
        db.delete(db_student)
        db.commit()
    return db_student

# Participation CRUD operations
def get_participation(db: Session, participation_id: int):
    return db.query(models.Participation).filter(models.Participation.id == participation_id).first()

def get_participations(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Participation).offset(skip).limit(limit).all()

def create_participation(db: Session, participation: schemas.ParticipationCreate):
    db_participation = models.Participation(
        student_id=participation.student_id, 
        date=participation.date, 
        video=participation.video, 
        audio=participation.audio, 
        chat=participation.chat, 
        understanding_id=participation.understanding_id, 
        is_attend=participation.is_attend
    )
    db.add(db_participation)
    db.commit()
    db.refresh(db_participation)
    return db_participation

def update_participation(db: Session, participation_id: int, participation_update: schemas.ParticipationUpdate):
    db_participation = db.query(models.Participation).filter(models.Participation.id == participation_id).first()
    if not db_participation:
        return None
    for field, value in participation_update.dict().items():
        setattr(db_participation, field, value)
    db.commit()
    db.refresh(db_participation)
    return db_participation

def delete_participation(db: Session, participation_id: int):
    db_participation = db.query(models.Participation).filter(models.Participation.id == participation_id).first()
    if db_participation:
        db.delete(db_participation)
        db.commit()
    return db_participation

# Grade CRUD Operations
def get_grade(db: Session, assignment_id: int):
    return db.query(models.Grade).filter(models.Grade.assignment_id == assignment_id).first()

def get_grades(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Grade).offset(skip).limit(limit).all()

def create_grade(db: Session, grade: schemas.GradeCreate):
    db_grade = models.Grade(
        student_id=grade.student_id,
        score=grade.score,
        date=grade.date
    )
    db.add(db_grade)
    db.commit()
    db.refresh(db_grade)
    return db_grade

def update_grade(db: Session, assignment_id: int, grade_update: schemas.GradeUpdate):
    db_grade = db.query(models.Grade).filter(models.Grade.assignment_id == assignment_id).first()
    if not db_grade:
        return None
    for field, value in grade_update.dict().items():
        setattr(db_grade, field, value)
    db.commit()
    db.refresh(db_grade)
    return db_grade

def delete_grade(db: Session, assignment_id: int):
    db_grade = db.query(models.Grade).filter(models.Grade.assignment_id == assignment_id).first()
    if db_grade:
        db.delete(db_grade)
        db.commit()
    return db_grade

# Subscription CRUD Operations
def get_subscription(db: Session, subscription_id: int):
    return db.query(models.Subscription).filter(models.Subscription.id == subscription_id).first()

def get_subscriptions(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Subscription).offset(skip).limit(limit).all()

def create_subscription(db: Session, subscription: schemas.SubscriptionCreate):
    db_subscription = models.Subscription(type=subscription.type)
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def update_subscription(db: Session, subscription_id: int, subscription_update: schemas.SubscriptionUpdate):
    db_subscription = db.query(models.Subscription).filter(models.Subscription.id == subscription_id).first()
    if not db_subscription:
        return None
    db_subscription.type = subscription_update.type
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def delete_subscription(db: Session, subscription_id: int):
    db_subscription = db.query(models.Subscription).filter(models.Subscription.id == subscription_id).first()
    if db_subscription:
        db.delete(db_subscription)
        db.commit()
    return db_subscription

# Stickiness CRUD Operations
def get_stickiness(db: Session, stickiness_id: int):
    return db.query(models.Stickiness).filter(models.Stickiness.id == stickiness_id).first()

def get_stickinesses(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Stickiness).offset(skip).limit(limit).all()

def create_stickiness(db: Session, stickiness: schemas.StickinessCreate):
    db_stickiness = models.Stickiness(level=stickiness.level)
    db.add(db_stickiness)
    db.commit()
    db.refresh(db_stickiness)
    return db_stickiness

def update_stickiness(db: Session, stickiness_id: int, stickiness_update: schemas.StickinessUpdate):
    db_stickiness = db.query(models.Stickiness).filter(models.Stickiness.id == stickiness_id).first()
    if not db_stickiness:
        return None
    db_stickiness.level = stickiness_update.level
    db.commit()
    db.refresh(db_stickiness)
    return db_stickiness

def delete_stickiness(db: Session, stickiness_id: int):
    db_stickiness = db.query(models.Stickiness).filter(models.Stickiness.id == stickiness_id).first()
    if db_stickiness:
        db.delete(db_stickiness)
        db.commit()
    return db_stickiness

# Products CRUD Operations
def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Product).offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(name=product.name, price=product.price)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        return None
    db_product.name = product_update.name
    db_product.price = product_update.price
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    return db_product

# Understanding CRUD Operations
def get_understanding(db: Session, understanding_id: int):
    return db.query(models.Understanding).filter(models.Understanding.id == understanding_id).first()

def get_understandings(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Understanding).offset(skip).limit(limit).all()

def create_understanding(db: Session, understanding: schemas.UnderstandingCreate):
    db_understanding = models.Understanding(level=understanding.level)
    db.add(db_understanding)
    db.commit()
    db.refresh(db_understanding)
    return db_understanding

def update_understanding(db: Session, understanding_id: int, understanding_update: schemas.UnderstandingUpdate):
    db_understanding = db.query(models.Understanding).filter(models.Understanding.id == understanding_id).first()
    if not db_understanding:
        return None
    db_understanding.level = understanding_update.level
    db.commit()
    db.refresh(db_understanding)
    return db_understanding

def delete_understanding(db: Session, understanding_id: int):
    db_understanding = db.query(models.Understanding).filter(models.Understanding.id == understanding_id).first()
    if db_understanding:
        db.delete(db_understanding)
        db.commit()
    return db_understanding
