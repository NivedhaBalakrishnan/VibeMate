"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  User,
  MessageCircle,
  Activity,
  ExternalLink,
  Play,
  Square,
  RefreshCw,
  Zap,
  Users,
  Target,
  Clock,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

const mockMatches = [
  {
    id: 1,
    name: "Liam Patel",
    interests: ["HealthTech", "AI Diagnostics"],
    goals: "Seeking partners to build an AI-powered health monitoring platform",
    matchReason: "Shared interest in AI for healthcare and improving patient outcomes",
    avatar: "LP",
  },
  {
    id: 2,
    name: "Ava Kim",
    interests: ["EdTech", "Mobile Apps"],
    goals: "Developing a gamified learning app for kids",
    matchReason: "Both focused on education innovation through mobile technology",
    avatar: "AK",
  },
  {
    id: 3,
    name: "Noah Johnson",
    interests: ["Clean Energy", "Battery Tech"],
    goals: "Looking to collaborate on scalable battery solutions for clean transport",
    matchReason: "Aligned vision for advancing sustainable energy through tech",
    avatar: "NJ",
  },
]

const mockActivityLog = [
  { time: "2:34 PM", message: "New match found: Sarah Chen", type: "match" },
  { time: "2:31 PM", message: "Agent scanning for compatible profiles...", type: "activity" },
  { time: "2:28 PM", message: "Profile updated successfully", type: "system" },
  { time: "2:25 PM", message: "Agent started and active", type: "system" },
  { time: "2:22 PM", message: "Connected to event network", type: "system" },
]

export default function Dashboard() {
  const [agentStatus, setAgentStatus] = useState<"online" | "offline">("online")
  const [isRestarting, setIsRestarting] = useState(false)

  const handleAgentToggle = async () => {
    if (agentStatus === "online") {
      setAgentStatus("offline")
    } else {
      setIsRestarting(true)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setAgentStatus("online")
      setIsRestarting(false)
    }
  }

  const agentAddress =
    "agent1qw5j8k2m9n7p3r4s6t8v2x4z6b8d0f2h4j6l8n0p2r4t6v8x0z2b4d6f8h0j2l4n6p8r0t2v4x6z8b0d2f4h6j8l0n2p4r6t8v0x2z4b6d8f0h2j4l6n8p0r2t4v6x8z0b2d4f6h8j0l2n4p6r8t0v2x4z6b8d0f2h4j6l8n0p2r4t6v8x0z2b4d6f8h0j2l4n6p8r0t2v4x6z8"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Live Agent Dashboard</h1>
          <p className="text-slate-300">Monitor your AI agent's activity and connections</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarFallback className="bg-blue-600 text-white text-lg">JD</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-white">John Doe</h3>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                      AI & ML
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                      Web3
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                      Fintech
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Goals
                  </h4>
                  <p className="text-sm text-slate-400">Find co-founders for AI-powered fintech startup</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Available
                  </h4>
                  <p className="text-sm text-slate-400">Day 1 & 2 Afternoons</p>
                </div>
              </CardContent>
            </Card>

            {/* Agent Control */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Agent Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Status</span>
                  <Badge
                    variant="secondary"
                    className={
                      agentStatus === "online"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        agentStatus === "online" ? "bg-green-400 animate-pulse" : "bg-red-400"
                      }`}
                    />
                    {agentStatus === "online" ? "Online" : "Offline"}
                  </Badge>
                </div>

                <div>
                  <span className="text-slate-300 text-sm">Agent Address</span>
                  <div className="bg-slate-700 p-2 rounded mt-1 flex items-center justify-between">
                    <code className="text-xs text-slate-400 truncate">{agentAddress.substring(0, 20)}...</code>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleAgentToggle}
                    disabled={isRestarting}
                    className={`flex-1 ${
                      agentStatus === "online" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isRestarting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : agentStatus === "online" ? (
                      <>
                        <Square className="h-4 w-4 mr-1" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Inspector
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Activity and Matches */}
          <div className="lg:col-span-2 space-y-6">
            {/* Matches */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Your Matches ({mockMatches.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMatches.map((match) => (
                    <div key={match.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-purple-600 text-white">{match.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-white">{match.name}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {match.interests.map((interest) => (
                                <Badge
                                  key={interest}
                                  variant="secondary"
                                  className="bg-purple-500/20 text-purple-300 text-xs"
                                >
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Say Hello
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-slate-400">Goals:</span>
                          <p className="text-sm text-slate-300">{match.goals}</p>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400">Why we matched:</span>
                          <p className="text-sm text-slate-300">{match.matchReason}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-400" />
                  Real-time Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {mockActivityLog.map((log, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <span className="text-slate-500 font-mono text-xs mt-0.5 min-w-[60px]">{log.time}</span>
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 ${
                            log.type === "match"
                              ? "bg-purple-400"
                              : log.type === "activity"
                                ? "bg-blue-400"
                                : "bg-green-400"
                          }`}
                        />
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
