from uagents import Model
from enum import Enum
from typing import Optional


class UserType(str, Enum):
    STARTUP = "startup"
    VC = "vc"


class StartupProfile(Model):
    name: str
    company_name: str
    industry: list[str]
    stage: str  # "idea", "mvp", "early", "growth"
    funding_needed: str
    description: str
    tech_stack: list[str]
    team_size: int
    location: str
    pitch_deck_url: Optional[str] = None


class VCProfile(Model):
    name: str
    firm_name: str
    investment_focus: list[str]
    investment_stage: list[str]  # "seed", "series_a", "series_b", etc.
    ticket_size: str  # "50k-500k", "500k-5M", etc.
    location: str
    portfolio_companies: list[str]
    bio: str


class UserProfile(Model):
    user_type: UserType
    startup_profile: Optional[StartupProfile] = None
    vc_profile: Optional[VCProfile] = None


class MatchResponse(Model):
    message: str
    match_score: float
    reasons: list[str]