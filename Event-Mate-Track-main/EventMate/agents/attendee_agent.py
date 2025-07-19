from uagents import Agent, Context, Model
from shared.schemas import AttendeeProfile, MatchResponse  # Add MatchResponse model


# Define a generic message class (optional, for responses)
class Message(Model):
    message: str


# ✅ Replace this with your actual Matchmaker agent address from agentverse
MATCHMAKER_ADDRESS = "agent1qd2cc9fpj9egvjscmdh5fm04u99qxdwxq02jd0tup7mqd8dtar4gcghae6u"  # e.g., "agent1q2k...your_matchmaker_address"

attendee = Agent(
    name="Ved",
    port=8001,
    seed="AttendeeSecretPhrase",
    endpoint=["http://127.0.0.1:8001/submit"],
    mailbox=True,
)

print(f"Your agent's address is: {attendee.address}")

# Prepare profile
profile = AttendeeProfile(
    name="Ved",
    interests=["AI", "Sustainability"],
    availability=["Day 1 PM"],
    goals="Find startup co-founders"
)


# ✅ Send profile when agent starts
@attendee.on_event("startup")
async def startup_send_profile(ctx: Context):
    ctx.logger.info("Sending attendee profile to matchmaker...")
    await ctx.send(MATCHMAKER_ADDRESS, profile)


# ✅ Handle match results (or any generic messages)
@attendee.on_message(model=Message)
async def message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"[{attendee.name}] Received message from {sender}: {msg.message}")


# ✅ Optional: if your matchmaker responds with MatchResponse
@attendee.on_message(model=MatchResponse)
async def match_response_handler(ctx: Context, sender: str, msg: MatchResponse):
    ctx.logger.info(f"[{attendee.name}] Match response: {msg.message}")


if __name__ == "__main__":
    attendee.run()
