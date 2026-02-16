"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, TrendingUp, Target, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

export default function DailyTest() {
  const testLevels = [
    {
      name: "Level 1",
      duration: "10 minutes",
      questions: 20,
      focus: "Number recognition & basic arithmetic",
      color: "from-primary to-primary-light",
    },
    {
      name: "Level 2",
      duration: "15 minutes",
      questions: 30,
      focus: "Intermediate calculations & speed building",
      color: "from-accent to-accent-light",
      featured: true,
    },
    {
      name: "Level 3",
      duration: "20 minutes",
      questions: 50,
      focus: "Advanced problems & mental math",
      color: "from-secondary to-primary",
    },
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Build Consistency",
      description: "Daily practice strengthens neural pathways for faster mental calculations",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor improvements with detailed performance analytics and reports",
    },
    {
      icon: Target,
      title: "Focused Learning",
      description: "Tests target specific skills at your current level for efficient growth",
    },
    {
      icon: Award,
      title: "Earn Achievements",
      description: "Unlock badges and certificates as you achieve milestones",
    },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero */}
        <section className="min-h-[60vh] flex items-center relative overflow-hidden py-20 bg-white">
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">
                Daily <span className="gradient-primary text-transparent bg-clip-text">Tests</span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl">
                Stay sharp with daily challenges designed to reinforce learning and track your progress.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Test Levels */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-12">
              Choose Your Daily Challenge
            </motion.h2>

            <div className="grid lg:grid-cols-3 gap-8">
              {testLevels.map((level, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}
                  className={level.featured ? "lg:scale-105" : ""}
                >
                  <Card
                    className={`p-8 h-full flex flex-col ${level.featured
                        ? `bg-gradient-to-br ${level.color} text-white`
                        : "bg-card hover:shadow-lg transition-shadow"
                      }`}
                  >
                    <h3 className={`text-2xl font-bold mb-4 ${level.featured ? "text-white" : ""}`}>{level.name}</h3>

                    <div className="flex-1 space-y-4 mb-6">
                      <div>
                        <p className={`text-sm ${level.featured ? "text-white/80" : "text-muted-foreground"}`}>
                          Duration
                        </p>
                        <p className={`text-xl font-semibold ${level.featured ? "text-white" : ""}`}>
                          {level.duration}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${level.featured ? "text-white/80" : "text-muted-foreground"}`}>
                          Questions
                        </p>
                        <p className={`text-xl font-semibold ${level.featured ? "text-white" : ""}`}>
                          {level.questions}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${level.featured ? "text-white/80" : "text-muted-foreground"}`}>Focus</p>
                        <p className={`text-sm mt-1 ${level.featured ? "text-white/90" : "text-muted-foreground"}`}>
                          {level.focus}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className={`w-full ${level.featured
                          ? "bg-white text-primary hover:bg-white/90"
                          : "bg-primary hover:bg-primary-light text-white"
                        }`}
                    >
                      Start Test
                    </Button>

                    {level.featured && (
                      <p className="text-center mt-4 text-sm text-white/80 font-semibold">Recommended</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-12">
              Why Daily Tests Matter
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <motion.div key={idx} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}>
                    <Card className="p-6 h-full">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center text-white mb-4">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="glass rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Challenge Yourself?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your daily test journey today and watch your skills improve day by day.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary-light text-white">
                  Get Started Now
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
