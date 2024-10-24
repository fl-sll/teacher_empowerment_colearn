from fastapi import FastAPI
from backend.routers import students, participation, grades, subscription, stickiness, product, understanding

app = FastAPI()

app.include_router(students.router, prefix="/students", tags=["students"])
app.include_router(participation.router, prefix="/participations", tags=["participations"])
app.include_router(grades.router, prefix="/grades", tags=["grades"])
app.include_router(subscription.router, prefix="/subscriptions", tags=["subscriptions"])
app.include_router(stickiness.router, prefix="/stickiness", tags=["stickiness"])
app.include_router(product.router, prefix="/products", tags=["products"])
app.include_router(understanding.router, prefix="/understanding", tags=["understanding"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Student Performance API"}