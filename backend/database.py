from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values
import os

from dotenv import dotenv_values

secrets = dotenv_values(os.path.join(os.path.dirname(__file__), '.env'))

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{secrets['DB_USER']}:{secrets['DB_PASS']}@{secrets['DB_HOST']}/{secrets['DB_NAME']}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()