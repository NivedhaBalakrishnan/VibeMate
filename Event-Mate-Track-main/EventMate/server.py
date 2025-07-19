from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from shared.schemas import AttendeeProfile

# Global in-memory store for frontend
matches = []
activity_log = []

# FastAPI setup
app = FastAPI()

# Allow frontend (Next.js) to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input data model from frontend
class UserInput(BaseModel):
    name: str
    interests: list[str]
    availability: list[str]
    goals: str

# Create attendee agent (imported only when needed)
from uagents import Agent

attendee = Agent(
    name="AttendeeServer",
    seed="attendee-server-seed",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"],
    mailbox=True,
)

profile = AttendeeProfile(
    name="",
    interests=[],
    availability=[],
    goals=""
)

@app.get("/")
def root():
    return {"status": "OK - Agent is running"}

@app.post("/submit")
async def submit_profile(data: UserInput):
    # Update attendee profile object
    profile.name = data.name
    profile.interests = data.interests
    profile.availability = data.availability
    profile.goals = data.goals

    # Add log
    activity_log.append({
        "time": "Now",
        "message": f"Received profile from {data.name}",
        "type": "system"
    })

    # Send profile to matchmaker agent (replace with actual address)
    matchmaker_address = "agent1qd2cc9fpj9egvjscmdh5fm04u99qxdwxq02jd0tup7mqd8dtar4gcghae6u"
    await attendee.send(matchmaker_address, profile)

    return {"status": "sent", "agent": attendee.address}


@app.get("/matches")
def get_matches():
    return {"matches": matches}


@app.get("/activity")
def get_activity():
    return {"activity": activity_log}
