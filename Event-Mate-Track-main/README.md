# 🧠 EventMate: Your AI-Powered Networking Companion

EventMate is an AI-powered matchmaker for conferences and tech events. Built using agent-based architecture, Groq’s blazing-fast LLMs, and a sleek Next.js dashboard, it intelligently connects attendees based on shared interests, goals, and availability — making human-to-human networking as easy as starting a conversation.

---

## 🚀 Features

- 🤖 **Agentic AI System**: Uses Fetch.ai agents (Attendee & Matchmaker) to autonomously handle matching logic and communication.
- ⚡ **Groq LLM Integration**: Generates match summaries and suggestions in real-time using Groq's ultra-low-latency LLMs.
- 📊 **Interactive Dashboard**: Track matches, agent status, logs, and activity through a beautifully crafted frontend.
- 📩 **Profile Submission**: Users submit interests, availability, and goals which the system uses for matchmaking.
- 🔁 **Live Matching**: Backend continuously listens and reacts to new submissions, instantly finding connections.

---

## 🛠️ Tech Stack

| Layer          | Tools & Frameworks                                          |
|----------------|--------------------------------------------------------------|
| Frontend       | Next.js, Tailwind CSS, shadcn/ui, TypeScript                 |
| Backend Agents | Python, `uAgents` (Fetch.ai framework), asyncio              |
| LLM Backend    | Groq API (`gpt-3.5-turbo` via `openai` SDK)                  |
| API Gateway    | FastAPI                                                      |
| Deployment     | Local + GitHub (submission-ready)                            |

---

## 📁 Project Structure

```bash
EventMate/
├── agents/
│   ├── attendee_agent.py         # Attendee agent logic
│   ├── matchmaker.py             # Matchmaker agent logic
│
├── shared/
│   └── schemas.py                # Shared Pydantic schemas for messaging
│
├── utility/
│   └── groq_utils.py             # Groq API integration for summaries
│
├── server.py                     # FastAPI server for receiving profile data
├── main.py                       # Starts multiple agents using multiprocessing
│
├── frontend/                     # Next.js app (UI)
│   ├── app/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── .env                          # DO NOT COMMIT — contains secrets
├── requirements.txt
├── README.md
└── .gitignore
