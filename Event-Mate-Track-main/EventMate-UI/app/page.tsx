"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Zap, Globe } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundBlendMode: "overlay",
        }}
      />

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Meet Smarter with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EventMate
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              Your AI-powered event companion for real-time connections at tech conferences
            </p>

            <Link href="/profile">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Get Started
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Agent Stats Widget */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Agent Status</h3>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Online
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">agent1qw5...</div>
                    <div className="text-sm text-slate-400">Agent Address</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">12</div>
                    <div className="text-sm text-slate-400">Active Matches</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">847</div>
                    <div className="text-sm text-slate-400">Attendees Online</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Matching</h3>
                <p className="text-slate-300">AI-powered connections based on interests, goals, and availability</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
                <p className="text-slate-300">Live agent activity and instant match notifications</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Event Integration</h3>
                <p className="text-slate-300">Seamlessly integrated with major tech conferences</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
