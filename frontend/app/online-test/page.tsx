"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Globe, Users, BarChart3, Shield } from "lucide-react"
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

export default function OnlineTest() {
  const features = [
    {
      icon: Globe,
      title: "Learn Anywhere",
      description: "Access tests from any device, anytime, anywhere with internet connectivity",
    },
    {
      icon: Users,
      title: "Compete Globally",
      description: "Compare your performance with students worldwide on global leaderboards",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Get instant feedback and detailed performance reports after each test",
    },
    {
      icon: Shield,
      title: "Secure & Fair",
      description: "Advanced proctoring ensures fair testing and maintains result integrity",
    },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero */}
        <section className="min-h-[60vh] flex items-center relative overflow-hidden py-20 bg-white">
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute -bottom-10 right-5 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">
                Online <span className="gradient-secondary text-transparent bg-clip-text">Tests</span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl">
                Advanced online testing platform with real-time proctoring and global competition.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-12">
              Platform Features
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div key={idx} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}>
                    <Card className="p-6 h-full card-modern">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center text-white mb-4">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Test Categories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-12">
              Available Test Types
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Speed Test",
                  description: "Race against the clock in timed challenges",
                  color: "from-primary to-primary-light",
                },
                {
                  name: "Accuracy Test",
                  description: "Focus on precision over speed",
                  color: "from-accent to-accent-light",
                },
                {
                  name: "Certification Exam",
                  description: "Official exams with verified results",
                  color: "from-secondary to-primary",
                },
              ].map((test, idx) => (
                <motion.div key={idx} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}>
                  <Card
                    className={`p-8 h-full bg-gradient-to-br ${test.color} text-white cursor-pointer hover:shadow-xl transition-all`}
                  >
                    <h3 className="text-2xl font-bold mb-4">{test.name}</h3>
                    <p className="text-white/90 mb-6">{test.description}</p>
                    <Button className="bg-white text-primary hover:bg-white/90">Take Test</Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white border-y border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="glass rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Global Community</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect with thousands of students and prove your skills on our online platform.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary-light text-white">
                  Register Now
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
