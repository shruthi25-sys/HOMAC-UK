"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Book, Zap, Users, Globe, Undo2, Redo2, Sparkles, Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

function InteractiveAbacus({ rails }: { rails: number }) {
  const [beadPositions, setBeadPositions] = useState<boolean[][]>(
    () =>
      Array(Math.min(rails, 17))
        .fill(null)
        .map(() => [false, false, false, false, false]), // 5 beads per rail (1 top + 4 bottom)
  )

  const toggleBead = (railIndex: number, beadIndex: number) => {
    setBeadPositions((prev) => {
      const newPositions = prev.map((rail) => [...rail])
      newPositions[railIndex][beadIndex] = !newPositions[railIndex][beadIndex]
      return newPositions
    })
  }

  return (
    <div className="bg-amber-900/90 rounded-xl p-4 shadow-xl overflow-x-auto">
      <div className="flex gap-1 min-w-max justify-center">
        {beadPositions.map((rail, railIndex) => (
          <div key={railIndex} className="flex flex-col items-center">
            {/* Top bead (heaven bead) */}
            <div className="h-16 flex flex-col justify-end items-center relative">
              <div className="w-1 h-full bg-amber-700 absolute" />
              <motion.button
                className={`w-8 h-6 rounded-full z-10 shadow-md transition-colors ${rail[0] ? "bg-teal-400 translate-y-2" : "bg-teal-500"
                  }`}
                onClick={() => toggleBead(railIndex, 0)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: rail[0] ? 8 : 0 }}
              />
            </div>

            {/* Divider bar */}
            <div className="w-10 h-2 bg-amber-800 rounded my-1" />

            {/* Bottom beads (earth beads) */}
            <div className="h-24 flex flex-col justify-start items-center gap-1 relative">
              <div className="w-1 h-full bg-amber-700 absolute" />
              {[1, 2, 3, 4].map((beadIndex) => (
                <motion.button
                  key={beadIndex}
                  className={`w-8 h-5 rounded-full z-10 shadow-md transition-colors ${rail[beadIndex] ? "bg-teal-400" : "bg-teal-500"
                    }`}
                  onClick={() => toggleBead(railIndex, beadIndex)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ y: rail[beadIndex] ? -8 : 0 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Abacus() {
  const [railsCount, setRailsCount] = useState(15)
  const [abacusKey, setAbacusKey] = useState(0)
  const [history, setHistory] = useState<number[]>([15])
  const [historyIndex, setHistoryIndex] = useState(0)

  const handleRailsChange = (value: string) => {
    const num = Math.max(1, Math.min(17, Number.parseInt(value) || 1))
    setRailsCount(num)
    const newHistory = [...history.slice(0, historyIndex + 1), num]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleClear = () => {
    setAbacusKey((prev) => prev + 1)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setRailsCount(history[historyIndex - 1])
      setAbacusKey((prev) => prev + 1)
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setRailsCount(history[historyIndex + 1])
      setAbacusKey((prev) => prev + 1)
    }
  }

  const timelineHistory = [
    { period: "Ancient Times", description: "Abacus invented in Mesopotamia and Egypt for counting" },
    { period: "5000 BCE", description: "Used across Middle East and Asia for commerce" },
    { period: "Modern Era", description: "Recognized for cognitive development in educational settings" },
    { period: "Today", description: "Global standard tool for mental arithmetic training" },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen">
        {/* Hero */}
        <section className="min-h-[40vh] flex items-center relative overflow-hidden py-12">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-teal-400 rounded-full opacity-30 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-amber-400 rounded-full opacity-40 animate-bounce" />
          <svg
            className="absolute top-32 right-32 w-12 h-12 text-coral-400 opacity-50 animate-spin-slow"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-[#3D2E2E]">
                The <span className="text-[#F97B5F]">Abacus</span>
              </h1>
              <p className="text-2xl text-[#5C4A4A] max-w-3xl">
                Discover the ancient tool revolutionizing modern education for children worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-4 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h2
                className="text-4xl font-bold text-[#3D2E2E] mb-8 font-serif"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HOMAC ABACUS
              </h2>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Abacus Tool */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Rails Input */}
                  <div className="flex items-center gap-4">
                    <Label htmlFor="rails" className="text-[#3D2E2E] font-medium">
                      Rails:
                    </Label>
                    <Input
                      id="rails"
                      type="number"
                      min={1}
                      max={17}
                      value={railsCount}
                      onChange={(e) => handleRailsChange(e.target.value)}
                      className="w-24 bg-white border-gray-300 text-[#3D2E2E]"
                    />
                  </div>

                  {/* Interactive Abacus */}
                  <InteractiveAbacus key={abacusKey} rails={railsCount} />

                  {/* Control Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => setAbacusKey((prev) => prev + 1)}
                      className="bg-[#4EBABA] hover:bg-[#3DA8A8] text-white font-medium px-6"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Teach
                    </Button>
                    <Button
                      onClick={handleClear}
                      className="bg-[#4EBABA] hover:bg-[#3DA8A8] text-white font-medium px-6"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                    <Button
                      onClick={() => setAbacusKey((prev) => prev + 1)}
                      className="bg-[#4EBABA] hover:bg-[#3DA8A8] text-white font-medium px-6"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Complement
                    </Button>
                    <Button
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                      className="bg-[#4EBABA] hover:bg-[#3DA8A8] text-white font-medium px-6 disabled:opacity-50"
                    >
                      <Undo2 className="w-4 h-4 mr-2" />
                      Undo
                    </Button>
                    <Button
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      className="bg-[#4EBABA] hover:bg-[#3DA8A8] text-white font-medium px-6 disabled:opacity-50"
                    >
                      <Redo2 className="w-4 h-4 mr-2" />
                      Redo
                    </Button>
                  </div>
                </div>

                {/* Quiz Login Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="p-6 bg-white border-l-4 border-l-[#4EBABA] shadow-lg">
                    <p className="text-[#3D2E2E] font-medium mb-6 text-center">You need to log in to pass this quiz.</p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="username" className="text-[#5C4A4A] text-sm">
                          Username or Email Address
                        </Label>
                        <Input id="username" type="text" className="mt-1 bg-white border-gray-300" />
                      </div>

                      <div>
                        <Label htmlFor="password" className="text-[#5C4A4A] text-sm">
                          Password
                        </Label>
                        <Input id="password" type="password" className="mt-1 bg-white border-gray-300" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-[#5C4A4A] text-sm cursor-pointer">
                          Remember Me
                        </Label>
                      </div>

                      <Button className="w-full bg-[#4EBABA] hover:bg-[#3DA8A8] text-white font-medium">Log In</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is Abacus */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <Card className="p-8 bg-white shadow-lg border-0">
                  <h2 className="text-3xl font-bold mb-4 text-[#3D2E2E]">What is an Abacus?</h2>
                  <p className="text-lg text-[#5C4A4A] leading-relaxed mb-4">
                    The abacus is an ancient calculating device consisting of beads sliding on rods within a frame.
                    Despite its simplicity, it remains one of the most powerful tools for developing mental arithmetic
                    and cognitive abilities in children.
                  </p>
                  <p className="text-lg text-[#5C4A4A] leading-relaxed">
                    Used for thousands of years across different cultures, the abacus helps children visualize
                    mathematical concepts and perform calculations with remarkable speed and accuracy.
                  </p>
                </Card>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}>
                <div className="text-[180px] text-center opacity-80">🧮</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-16 text-[#3D2E2E]">
              A Brief History
            </motion.h2>

            <div className="space-y-8">
              {timelineHistory.map((item, idx) => (
                <motion.div key={idx} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}>
                  <Card className="p-6 bg-white shadow-md border-0 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#F97B5F] to-[#FF9A85] flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#F97B5F] mb-2">{item.period}</h3>
                        <p className="text-lg text-[#5C4A4A]">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-12 text-[#3D2E2E]">
              Why Learn with Abacus?
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Speed Boost",
                  description: "Perform calculations faster than traditional methods",
                  color: "from-amber-400 to-amber-500",
                },
                {
                  icon: Book,
                  title: "Brain Power",
                  description: "Enhance cognitive and mental abilities",
                  color: "from-teal-400 to-teal-500",
                },
                {
                  icon: Users,
                  title: "Confidence",
                  description: "Build self-esteem through skill mastery",
                  color: "from-[#F97B5F] to-[#FF9A85]",
                },
                {
                  icon: Globe,
                  title: "Global Standard",
                  description: "Recognized worldwide for educational value",
                  color: "from-sky-400 to-sky-500",
                },
              ].map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <motion.div key={idx} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}>
                    <Card className="p-6 h-full bg-white shadow-md border-0 hover:shadow-xl transition-all hover:-translate-y-2">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                      >
                        <Icon size={28} />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-[#3D2E2E]">{benefit.title}</h3>
                      <p className="text-[#5C4A4A] text-sm">{benefit.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="bg-gradient-to-br from-[#F97B5F] to-[#FF9A85] rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
            >
              {/* Decorative circles */}
              <div className="absolute top-4 left-4 w-12 h-12 border-4 border-white/30 rounded-full" />
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full" />

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Master the Abacus?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their mathematical abilities.
              </p>
              <Link href="/courses">
                <Button size="lg" className="bg-white text-[#F97B5F] hover:bg-white/90 font-semibold shadow-lg">
                  Start Learning Today
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
