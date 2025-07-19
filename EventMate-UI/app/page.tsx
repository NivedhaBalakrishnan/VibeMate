"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, DollarSign, Rocket, Building, Users, Globe } from "lucide-react"
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
              Connect VCs with{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Game-Changing
              </span>{" "}
              Startups
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              AI-powered matching platform that connects venture capitalists with innovative startups using CloudRift's cutting-edge LLM technology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile?type=startup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  I'm a Startup
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/profile?type=vc">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full shadow-2xl transition-all duration-300"
                >
                  I'm an Investor
                  <DollarSign className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Platform Stats Widget */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Building className="h-8 w-8 text-blue-400 mr-2" />
                      <span className="text-3xl font-bold text-white">50+</span>
                    </div>
                    <p className="text-slate-300">Active Startups</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-400 mr-2" />
                      <span className="text-3xl font-bold text-white">25+</span>
                    </div>
                    <p className="text-slate-300">VC Partners</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-green-400 mr-2" />
                      <span className="text-3xl font-bold text-white">120+</span>
                    </div>
                    <p className="text-slate-300">Successful Matches</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Leveraging CloudRift's GPU infrastructure and cutting-edge LLMs for intelligent startup-investor matching
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Smart Matching</h3>
                </div>
                <p className="text-slate-300">
                  AI analyzes investment thesis, market fit, and growth potential to find perfect matches
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Building className="h-8 w-8 text-blue-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">CloudRift Powered</h3>
                </div>
                <p className="text-slate-300">
                  Utilizing DeepSeek V3 and Llama4 Maverick models for advanced startup-VC analysis
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-8 w-8 text-green-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Investment Ready</h3>
                </div>
                <p className="text-slate-300">
                  Real-time deal flow and investment opportunity identification for VCs
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* For Startups */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center mb-8">For Startups</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Badge className="bg-blue-600 text-white mr-4 mt-1">1</Badge>
                  <div>
                    <h4 className="text-white font-semibold">Submit Your Pitch</h4>
                    <p className="text-slate-300">Share your company details, tech stack, and funding needs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Badge className="bg-blue-600 text-white mr-4 mt-1">2</Badge>
                  <div>
                    <h4 className="text-white font-semibold">AI Analysis</h4>
                    <p className="text-slate-300">Our AI analyzes your startup against VC investment criteria</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Badge className="bg-blue-600 text-white mr-4 mt-1">3</Badge>
                  <div>
                    <h4 className="text-white font-semibold">Get Matched</h4>
                    <p className="text-slate-300">Receive curated VC matches with detailed explanations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For VCs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center mb-8">For VCs</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Badge className="bg-purple-600 text-white mr-4 mt-1">1</Badge>
                  <div>
                    <h4 className="text-white font-semibold">Define Your Thesis</h4>
                    <p className="text-slate-300">Set your investment focus, stage preferences, and ticket size</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Badge className="bg-purple-600 text-white mr-4 mt-1">2</Badge>
                  <div>
                    <h4 className="text-white font-semibold">Smart Discovery</h4>
                    <p className="text-slate-300">AI identifies startups that match your investment criteria</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Badge className="bg-purple-600 text-white mr-4 mt-1">3</Badge>
                  <div>
                    <h4 className="text-white font-semibold">Quality Deal Flow</h4>
                    <p className="text-slate-300">Access pre-qualified startups with AI-generated insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 pb-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to Find Your Perfect Match?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile?type=startup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full"
                >
                  Register as Startup
                </Button>
              </Link>
              
              <Link href="/profile?type=vc">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
                >
                  Register as VC
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Agent Status Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
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
      </main>
    </div>
  )
}
