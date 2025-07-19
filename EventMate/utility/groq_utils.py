from dotenv import load_dotenv

load_dotenv()

import os
import httpx
import asyncio
from openai import OpenAI

# CloudRift LLM endpoint configuration
CLOUDRIFT_API_KEY = os.getenv("CLOUDRIFT_API_KEY")
CLOUDRIFT_BASE_URL = "https://api.cloudrift.ai/v1"  # Replace with actual CloudRift endpoint

# Groq client as fallback (only initialize if API key exists)
client = None
groq_api_key = os.getenv("GROQ_API_KEY")
if groq_api_key:
    client = OpenAI(
        api_key=groq_api_key,
        base_url="https://api.groq.com/openai/v1",
    )


async def generate_match_analysis(prompt: str) -> str:
    """Generate AI-powered match analysis using CloudRift LLMs"""
    try:
        # Try CloudRift LLM first (DeepSeek V3 or Llama4 Maverick)
        if CLOUDRIFT_API_KEY:
            async with httpx.AsyncClient() as client_http:
                response = await client_http.post(
                    f"{CLOUDRIFT_BASE_URL}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {CLOUDRIFT_API_KEY}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "deepseek-v3",  # or "llama4-maverick"
                        "messages": [
                            {
                                "role": "system", 
                                "content": "You are an expert VC-startup matchmaker. Generate compelling, professional match summaries."
                            },
                            {"role": "user", "content": prompt}
                        ],
                        "max_tokens": 200,
                        "temperature": 0.7
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    return result["choices"][0]["message"]["content"].strip()
    
    except Exception as e:
        print(f"CloudRift API error: {e}")
    
    # Fallback to Groq
    try:
        if client:  # Only try Groq if client is initialized
            res = client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {
                        "role": "system", 
                        "content": "You are an expert VC-startup matchmaker. Generate compelling, professional match summaries."
                    },
                    {"role": "user", "content": prompt}
                ],
                max_tokens=200,
                temperature=0.7
            )
            return res.choices[0].message.content.strip()
        else:
            print("No Groq API key available")
    
    except Exception as e:
        print(f"Groq API error: {e}")
    
    # Final fallback - static response
    return "This appears to be a promising match based on shared interests and goals."


async def generate_startup_pitch_analysis(startup_data: dict) -> str:
    """Analyze startup pitch and provide AI-powered insights"""
    prompt = f"""
    Analyze this startup and provide key insights:
    
    Company: {startup_data.get('company_name')}
    Industry: {', '.join(startup_data.get('industry', []))}
    Stage: {startup_data.get('stage')}
    Description: {startup_data.get('description')}
    Tech Stack: {', '.join(startup_data.get('tech_stack', []))}
    Team Size: {startup_data.get('team_size')}
    
    Provide a brief analysis covering:
    1. Market opportunity
    2. Technical feasibility 
    3. Investment attractiveness
    """
    
    return await generate_match_analysis(prompt)


async def generate_vc_investment_thesis(vc_data: dict) -> str:
    """Generate investment thesis summary for VC"""
    prompt = f"""
    Summarize this VC's investment thesis:
    
    Firm: {vc_data.get('firm_name')}
    Focus Areas: {', '.join(vc_data.get('investment_focus', []))}
    Investment Stages: {', '.join(vc_data.get('investment_stage', []))}
    Ticket Size: {vc_data.get('ticket_size')}
    Portfolio: {', '.join(vc_data.get('portfolio_companies', []))}
    
    Generate a concise investment thesis and what types of startups they're looking for.
    """
    
    return await generate_match_analysis(prompt)


def get_match_summary(attendee1, attendee2):
    """Legacy function for backward compatibility"""
    prompt = f"""
Act as a friendly event assistant. Two users submitted the following:

User A: {attendee1.name}, Interests: {attendee1.interests}, Goals: {attendee1.goals}
User B: {attendee2.name}, Interests: {attendee2.interests}, Goals: {attendee2.goals}

Explain why they would be a great match in one short paragraph.
"""
    res = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}]
    )
    return res.choices[0].message.content.strip()
