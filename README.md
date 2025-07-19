# VibeMate - AI-Powered VC-Startup Matchmaking Platform

🚀 **VibeMate** is an intelligent matchmaking platform that connects venture capitalists with innovative startups using cutting-edge AI technology powered by CloudRift's LLM infrastructure.

## ✨ Features

- 🤖 **AI-Powered Matching** - CloudRift LLM analysis for intelligent startup-VC connections
- 🎯 **Smart Profile Analysis** - Multi-factor scoring based on industry, stage, location, and more
- ⚡ **Real-time Agents** - uAgents framework for instant match notifications
- 🌐 **Modern Web Interface** - Next.js frontend with Tailwind CSS
- 📊 **Analytics Dashboard** - Track matches, activity, and platform statistics
- 🔒 **Secure API** - FastAPI backend with comprehensive validation

## 🏗️ Architecture

```
VibeMate/
├── EventMate/           # Backend (FastAPI + uAgents)
│   ├── agents/          # Matchmaker and user agents
│   ├── shared/          # Data schemas and models
│   ├── utility/         # CloudRift/Groq LLM utils
│   └── server.py        # FastAPI main server
├── EventMate-UI/        # Frontend (Next.js + Tailwind)
│   ├── app/             # Next.js app router
│   ├── components/      # Reusable UI components
│   └── lib/             # Utilities and configs
└── requirements.txt     # Python dependencies
```

## 🚀 Quick Start

### Backend Setup
```bash
cd EventMate
pip install -r requirements.txt

# Set up environment variables
echo "CLOUDRIFT_API_KEY=your_api_key_here" > .env

# Start the FastAPI server
python server.py

# Start the matchmaker agent (new terminal)
python agents/matchmaker.py
```

### Frontend Setup
```bash
cd EventMate-UI
npm install --legacy-peer-deps
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs
- **Agent Inspector**: Via uAgents framework

## 🤖 AI Technology

VibeMate leverages:
- **CloudRift GPU Infrastructure** for high-performance LLM processing
- **DeepSeek V3** and **Llama4 Maverick** models
- **Multi-factor matching algorithm** (Industry, Stage, Location, Tech Stack, Funding)
- **Real-time agent communication** for instant notifications

## 📊 Matching Algorithm

The AI analyzes:
- **Industry Alignment** (30 points) - Startup industry vs VC focus
- **Stage Matching** (25 points) - Investment stage compatibility  
- **Location Proximity** (15 points) - Geographic alignment
- **Tech Stack Relevance** (10 points) - Technology focus areas
- **Funding Alignment** (20 points) - Funding needs vs ticket size

**Minimum Match Threshold**: 50% compatibility score

## 🛠️ Technologies

- **Backend**: FastAPI, uAgents, Pydantic, Python
- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **AI/LLM**: CloudRift, Groq, OpenAI APIs
- **Database**: In-memory (extensible to PostgreSQL/MongoDB)
- **Deployment**: Uvicorn, Gunicorn ready

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@vibemate.ai or open an issue on GitHub.

---

**Built with ❤️ using CloudRift AI Infrastructure**
