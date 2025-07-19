from dotenv import load_dotenv

load_dotenv()

import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)


def get_match_summary(attendee1, attendee2):
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
