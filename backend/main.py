from fastapi import FastAPI
from backend.routers import students, participation, grades, subscription, stickiness, product, understanding
from pydantic import BaseModel
import httpx
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import dotenv_values

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SlackMessage(BaseModel):
    message: str

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

@app.post("/api/send-to-slack")
async def send_to_slack(message: SlackMessage):
    slack_webhook_url = os.getenv("WEBHOOK_LINK")

    if not slack_webhook_url:
        raise HTTPException(status_code=500, detail="Slack webhook URL is not configured")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                slack_webhook_url,
                json=message.dict(),
                headers={"Content-Type": "application/json"},
            )

        if response.status_code == 200:
            return {"message": "Message sent to Slack successfully!"}
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail="Failed to send message to Slack",
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending message to Slack: {str(e)}")