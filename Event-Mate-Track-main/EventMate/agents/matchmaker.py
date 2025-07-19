from uagents import Agent, Context
from shared.schemas import AttendeeProfile

# Import match store from FastAPI server (make sure server.py runs before this)
try:
    from server import matches, activity_log
except ImportError:
    # Fallback if running standalone (remove if you always run with FastAPI)
    matches = []
    activity_log = []

# Create Matchmaker Agent
matchmaker = Agent(
    name="Matchmaker",
    seed="matchmaker-secret-seed",  # Can use os.getenv() too
    mailbox=True
)

# In-memory profile store
profiles = {}


@matchmaker.on_message(model=AttendeeProfile)
async def match(ctx: Context, sender: str, profile: AttendeeProfile):
    ctx.logger.info(f"Received profile from {sender}: {profile.name}")
    profiles[sender] = profile

    # Add to activity log
    activity_log.append({
        "time": "Now",
        "message": f"Received profile from {profile.name}",
        "type": "system"
    })

    # Try to find a match
    for peer, peer_profile in profiles.items():
        if peer != sender:
            shared = set(profile.interests) & set(peer_profile.interests)
            if shared:
                # Log match
                ctx.logger.info(f"Matched {profile.name} with {peer_profile.name}")

                reason = f"Matched on interests: {', '.join(shared)}"
                activity_log.append({
                    "time": "Now",
                    "message": f"Matched {profile.name} with {peer_profile.name}",
                    "type": "match"
                })

                # Save matches for frontend display
                matches.append({
                    "id": len(matches) + 1,
                    "name": peer_profile.name,
                    "interests": peer_profile.interests,
                    "goals": peer_profile.goals,
                    "matchReason": reason,
                    "avatar": peer_profile.name[:2].upper()
                })
                matches.append({
                    "id": len(matches) + 1,
                    "name": profile.name,
                    "interests": profile.interests,
                    "goals": profile.goals,
                    "matchReason": reason,
                    "avatar": profile.name[:2].upper()
                })

                # Notify both attendees
                await ctx.send(sender, f"🎯 Matched with {peer_profile.name}! {reason}")
                await ctx.send(peer, f"🎯 Matched with {profile.name}! {reason}")
                break  # Stop after first match


if __name__ == "__main__":
    matchmaker.run()
