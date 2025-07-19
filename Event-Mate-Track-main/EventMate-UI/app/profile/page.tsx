"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Rocket, User, Target, Clock, Sparkles } from "lucide-react"
import { Navigation } from "@/components/navigation"

const interests = [
  "AI & Machine Learning",
  "Web3 & Blockchain",
  "Sustainability",
  "Fintech",
  "Healthcare Tech",
  "Developer Tools",
  "Cybersecurity",
  "IoT",
  "AR/VR",
  "Data Science",
]

const availabilityOptions = [
  "Day 1 - Morning (9AM-12PM)",
  "Day 1 - Afternoon (1PM-5PM)",
  "Day 1 - Evening (6PM-9PM)",
  "Day 2 - Morning (9AM-12PM)",
  "Day 2 - Afternoon (1PM-5PM)",
  "Day 2 - Evening (6PM-9PM)",
]

export default function ProfileSetup() {
  const [name, setName] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [goals, setGoals] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleAvailabilityToggle = (slot: string) => {
    setSelectedAvailability((prev) => (prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "🚀 Agent started successfully!",
      description: "Your EventMate agent is now active and looking for matches.",
      duration: 3000,
    })

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Set Up Your Profile</h1>
            <p className="text-slate-300 text-lg">Help your AI agent find the perfect connections for you</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-blue-400" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>

                {/* Interests */}
                <div className="space-y-3">
                  <Label className="text-white flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    Interests
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={selectedInterests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                          className="border-slate-600 data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor={interest} className="text-sm text-slate-300 cursor-pointer">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedInterests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label className="text-white flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-400" />
                    Availability
                  </Label>
                  <div className="space-y-2">
                    {availabilityOptions.map((slot) => (
                      <div key={slot} className="flex items-center space-x-2">
                        <Checkbox
                          id={slot}
                          checked={selectedAvailability.includes(slot)}
                          onCheckedChange={() => handleAvailabilityToggle(slot)}
                          className="border-slate-600 data-[state=checked]:bg-green-600"
                        />
                        <Label htmlFor={slot} className="text-sm text-slate-300 cursor-pointer">
                          {slot}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div className="space-y-2">
                  <Label htmlFor="goals" className="text-white flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-400" />
                    Goals
                  </Label>
                  <Textarea
                    id="goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="What are you hoping to achieve at this event? (e.g., Find co-founders, Learn about AI trends, Network with investors)"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg rounded-lg"
                  disabled={
                    isLoading || !name || selectedInterests.length === 0 || selectedAvailability.length === 0 || !goals
                  }
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Starting Agent...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-5 w-5" />
                      Start EventMate Agent
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
