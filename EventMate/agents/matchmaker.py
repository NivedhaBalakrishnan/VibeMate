import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from uagents import Agent, Context
from shared.schemas import UserProfile, StartupProfile, VCProfile, UserType
from utility.groq_utils import generate_match_analysis
import json

# Import match store from FastAPI server (make sure server.py runs before this)
try:
    from server import matches, activity_log
except ImportError:
    # Fallback if running standalone (remove if you always run with FastAPI)
    matches = []
    activity_log = []

# Create Matchmaker Agent
matchmaker = Agent(
    name="VCStartupMatchmaker",
    seed="matchmaker-secret-seed",
    mailbox=True
)

# In-memory profile stores
startup_profiles = {}
vc_profiles = {}


def calculate_match_score(startup: StartupProfile, vc: VCProfile) -> tuple[float, list[str]]:
    """Calculate match score between startup and VC using AI analysis"""
    score = 0.0
    reasons = []
    
    # Industry alignment
    industry_match = set(startup.industry) & set(vc.investment_focus)
    if industry_match:
        score += 30
        reasons.append(f"Industry alignment: {', '.join(industry_match)}")
    
    # Stage matching
    if startup.stage in vc.investment_stage:
        score += 25
        reasons.append(f"Investment stage match: {startup.stage}")
    
    # Location proximity (simplified)
    if startup.location.lower() == vc.location.lower():
        score += 15
        reasons.append("Same location")
    
    # Tech stack relevance (can be enhanced with AI)
    if startup.tech_stack:
        score += 10
        reasons.append(f"Tech focus: {', '.join(startup.tech_stack)}")
    
    # Funding alignment (basic logic)
    if startup.funding_needed and vc.ticket_size:
        score += 20
        reasons.append("Funding size alignment")
    
    return min(score, 100.0), reasons


async def create_ai_match_summary(startup: StartupProfile, vc: VCProfile, score: float, reasons: list[str]) -> str:
    """Generate AI-powered match summary using CloudRift LLM"""
    prompt = f"""
    Startup: {startup.company_name}
    Industry: {', '.join(startup.industry)}
    Stage: {startup.stage}
    Description: {startup.description}
    
    VC: {vc.firm_name}
    Investment Focus: {', '.join(vc.investment_focus)}
    Investment Stages: {', '.join(vc.investment_stage)}
    
    Match Score: {score}%
    Reasons: {', '.join(reasons)}
    
    Generate a compelling 2-3 sentence summary of why this is a great match.
    """
    
    try:
        summary = await generate_match_analysis(prompt)
        return summary
    except Exception as e:
        return f"Strong match based on {', '.join(reasons[:2])}"


@matchmaker.on_message(model=UserProfile)
async def process_profile(ctx: Context, sender: str, profile: UserProfile):
    """Process incoming user profiles and find matches"""
    
    if profile.user_type == UserType.STARTUP and profile.startup_profile:
        startup = profile.startup_profile
        startup_profiles[sender] = startup
        
        ctx.logger.info(f"Received startup profile: {startup.company_name}")
        activity_log.append({
            "time": "Now",
            "message": f"Startup {startup.company_name} joined the platform",
            "type": "system"
        })
        
        # Find matching VCs
        for vc_id, vc in vc_profiles.items():
            score, reasons = calculate_match_score(startup, vc)
            
            if score >= 50:  # Minimum match threshold
                ctx.logger.info(f"Matched {startup.company_name} with {vc.firm_name} (Score: {score})")
                
                # Generate AI summary
                summary = await create_ai_match_summary(startup, vc, score, reasons)
                
                activity_log.append({
                    "time": "Now",
                    "message": f"Matched {startup.company_name} with {vc.firm_name}",
                    "type": "match"
                })
                
                # Add matches to display
                matches.append({
                    "id": len(matches) + 1,
                    "startup_name": startup.company_name,
                    "vc_name": vc.firm_name,
                    "match_score": score,
                    "summary": summary,
                    "startup_industry": startup.industry,
                    "vc_focus": vc.investment_focus,
                    "type": "vc_startup_match"
                })
                
                # Notify both parties
                await ctx.send(sender, f"🎯 Match found! {vc.firm_name} - {summary}")
                await ctx.send(vc_id, f"🚀 New startup match! {startup.company_name} - {summary}")
    
    elif profile.user_type == UserType.VC and profile.vc_profile:
        vc = profile.vc_profile
        vc_profiles[sender] = vc
        
        ctx.logger.info(f"Received VC profile: {vc.firm_name}")
        activity_log.append({
            "time": "Now",
            "message": f"VC {vc.firm_name} joined the platform",
            "type": "system"
        })
        
        # Find matching startups
        for startup_id, startup in startup_profiles.items():
            score, reasons = calculate_match_score(startup, vc)
            
            if score >= 50:  # Minimum match threshold
                ctx.logger.info(f"Matched {vc.firm_name} with {startup.company_name} (Score: {score})")
                
                # Generate AI summary
                summary = await create_ai_match_summary(startup, vc, score, reasons)
                
                activity_log.append({
                    "time": "Now",
                    "message": f"Matched {vc.firm_name} with {startup.company_name}",
                    "type": "match"
                })
                
                # Add matches to display
                matches.append({
                    "id": len(matches) + 1,
                    "startup_name": startup.company_name,
                    "vc_name": vc.firm_name,
                    "match_score": score,
                    "summary": summary,
                    "startup_industry": startup.industry,
                    "vc_focus": vc.investment_focus,
                    "type": "vc_startup_match"
                })
                
                # Notify both parties
                await ctx.send(sender, f"🚀 New startup match! {startup.company_name} - {summary}")
                await ctx.send(startup_id, f"🎯 Match found! {vc.firm_name} - {summary}")


if __name__ == "__main__":
    matchmaker.run()
