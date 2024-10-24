from sqlalchemy import Column, String, Float, Boolean, ForeignKey, Date, Integer
from sqlalchemy.orm import relationship
from .database import Base

class Student(Base):
    __tablename__ = 'students'

    id = Column(String(255), primary_key=True)
    name = Column(String(255), nullable=False)
    start_date = Column(Date)
    end_date = Column(Date)
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"))
    stickiness_id = Column(Integer, ForeignKey("stickiness.id"))

    #? Relationships
    participations = relationship("Participation", back_populates="student")
    grades = relationship("Grade", back_populates="student")

class Participation(Base):
    __tablename__ = 'participations'

    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(255), ForeignKey('students.id'))
    date = Column(Date)
    video = Column(Integer)
    audio = Column(Integer)
    chat = Column(Integer)
    understanding_id = Column(Integer, ForeignKey('understanding.id'))
    is_attend = Column(Boolean)

    #? Relationships
    student = relationship("Student", back_populates="participations")
    understanding = relationship("Understanding", back_populates="participation")

class Understanding(Base):
    __tablename__ = 'understanding'

    id = Column(Integer, primary_key=True, autoincrement=True)
    level = Column(String(255))

    #? Relationships
    participation = relationship("Participation", back_populates="understanding")

class Grade(Base):
    __tablename__ = 'grades'

    assignment_id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(String(255), ForeignKey('students.id'))
    score = Column(Float)
    date = Column(Date)

    #? Relationships
    student = relationship("Student", back_populates="grades")

class Stickiness(Base):
    __tablename__ = 'stickiness'

    id = Column(Integer, primary_key=True, autoincrement=True)
    level = Column(String(255))

class Subscription(Base):
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(String(255))

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    price = Column(Float)
