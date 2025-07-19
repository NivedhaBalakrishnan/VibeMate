import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

from shared.schemas import UserProfile, StartupProfile, VCProfile, UserType

# Global in-memory store for frontend
matches = []
activity_log = []
startups = []
vcs = []

# FastAPI setup
app = FastAPI(title="VC-Startup Matchmaker API")

# Allow frontend (Next.js) to call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input data models from frontend
class StartupInput(BaseModel):
    name: str
    company_name: str
    industry: List[str]
    stage: str
    funding_needed: str
    description: str
    tech_stack: List[str]
    team_size: int
    location: str
    pitch_deck_url: Optional[str] = None

class VCInput(BaseModel):
    name: str
    firm_name: str
    investment_focus: List[str]
    investment_stage: List[str]
    ticket_size: str
    location: str
    portfolio_companies: List[str]
    bio: str

# Create agent (imported only when needed)
from uagents import Agent

agent = Agent(
    name="PlatformServer",
    seed="platform-server-seed",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"],
    mailbox=True,
)

@app.get("/")
def root():
    return {
        "status": "VC-Startup Matchmaker API", 
        "version": "2.0",
        "cloudrift_enabled": True
    }

@app.post("/submit/startup")
async def submit_startup_profile(data: StartupInput):
    """Submit startup profile for matching"""
    startup_profile = StartupProfile(
        name=data.name,
        company_name=data.company_name,
        industry=data.industry,
        stage=data.stage,
        funding_needed=data.funding_needed,
        description=data.description,
        tech_stack=data.tech_stack,
        team_size=data.team_size,
        location=data.location,
        pitch_deck_url=data.pitch_deck_url
    )
    
    user_profile = UserProfile(
        user_type=UserType.STARTUP,
        startup_profile=startup_profile
    )
    
    # Add to local storage
    startups.append({
        "id": len(startups) + 1,
        "company_name": data.company_name,
        "industry": data.industry,
        "stage": data.stage,
        "location": data.location,
        "description": data.description
    })

    # Add log
    activity_log.append({
        "time": "Now",
        "message": f"Startup {data.company_name} registered",
        "type": "system"
    })

    # Send profile to matchmaker agent
    matchmaker_address = "agent1qd2cc9fpj9egvjscmdh5fm04u99qxdwxq02jd0tup7mqd8dtar4gcghae6u"
    await agent.send(matchmaker_address, user_profile)

    return {
        "status": "success", 
        "message": f"Startup {data.company_name} registered successfully",
        "agent": agent.address
    }

@app.post("/submit/vc")
async def submit_vc_profile(data: VCInput):
    """Submit VC profile for matching"""
    vc_profile = VCProfile(
        name=data.name,
        firm_name=data.firm_name,
        investment_focus=data.investment_focus,
        investment_stage=data.investment_stage,
        ticket_size=data.ticket_size,
        location=data.location,
        portfolio_companies=data.portfolio_companies,
        bio=data.bio
    )
    
    user_profile = UserProfile(
        user_type=UserType.VC,
        vc_profile=vc_profile
    )
    
    # Add to local storage
    vcs.append({
        "id": len(vcs) + 1,
        "firm_name": data.firm_name,
        "investment_focus": data.investment_focus,
        "investment_stage": data.investment_stage,
        "location": data.location,
        "ticket_size": data.ticket_size
    })

    # Add log
    activity_log.append({
        "time": "Now",
        "message": f"VC {data.firm_name} registered",
        "type": "system"
    })

    # Send profile to matchmaker agent
    matchmaker_address = "agent1qd2cc9fpj9egvjscmdh5fm04u99qxdwxq02jd0tup7mqd8dtar4gcghae6u"
    await agent.send(matchmaker_address, user_profile)

    return {
        "status": "success", 
        "message": f"VC {data.firm_name} registered successfully",
        "agent": agent.address
    }

@app.get("/matches")
def get_matches():
    """Get all matches"""
    return {"matches": matches}

@app.get("/activity")
def get_activity():
    """Get activity log"""
    return {"activity": activity_log}

@app.get("/startups")
def get_startups():
    """Get all registered startups"""
    return {"startups": startups}

@app.get("/vcs")
def get_vcs():
    """Get all registered VCs"""
    return {"vcs": vcs}

@app.get("/stats")
def get_platform_stats():
    """Get platform statistics"""
    return {
        "total_startups": len(startups),
        "total_vcs": len(vcs),
        "total_matches": len(matches),
        "activity_count": len(activity_log)
    }
