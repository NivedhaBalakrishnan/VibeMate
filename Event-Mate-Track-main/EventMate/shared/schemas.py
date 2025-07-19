from uagents import Model


class AttendeeProfile(Model):
    name: str
    interests: list[str]
    availability: list[str]
    goals: str


class MatchResponse(Model):
    message: str