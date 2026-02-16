"use client"

import { motion } from "framer-motion"
import { Globe, BookOpen, Heart, Target, Star, Users, Award, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const DoodleStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const DoodleCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every child's learning journey is unique. We tailor our approach to individual needs.",
      color: "bg-rose-500",
    },
    {
      icon: BookOpen,
      title: "Evidence-Based",
      description: "Our methods are backed by research and tested with thousands of students worldwide.",
      color: "bg-teal-500",
    },
    {
      icon: Globe,
      title: "Global Excellence",
      description: "With presence in 20+ countries, we bring world-class education to your doorstep.",
      color: "bg-amber-500",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "92% of our students show measurable improvement in mathematical confidence.",
      color: "bg-sky-500",
    },
  ]

 const milestones = [
  { year: "2004", event: "Started in Sri Lanka", color: "bg-amber-400" },
  { year: "2006", event: "Launched in London", color: "bg-teal-400" },
  { year: "2008", event: "First Abacus competition in London", color: "bg-rose-400" },
  { year: "2010", event: "Abacus competition held in Sri Lanka", color: "bg-sky-400" },
  { year: "2012", event: "Trained government school teachers in Sri Lanka", color: "bg-indigo-400" },
  { year: "2014", event: "Abacus competition at Arsenal Stadium", color: "bg-emerald-400" },
  { year: "2016", event: "Abacus competition at Olympic Park", color: "bg-fuchsia-400" },
  { year: "2018", event: "Introduced 11+ courses", color: "bg-orange-400" },
  { year: "2023", event: "Expanded operations to India", color: "bg-cyan-400" },
  { year: "2026", event: "Abacus competitions planned across Sri Lanka, India, and the UK", color: "bg-lime-400" },
];

  return (
    <>
      <Navbar />

      <div className="pt-20">
        <section className="min-h-[70vh] flex items-center relative overflow-hidden py-20 bg-white">
          {/* Animated decorations */}
          <motion.div
            className="absolute top-32 left-10 text-amber-300"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
          >
            <DoodleStar className="w-12 h-12" />
          </motion.div>
          <motion.div
            className="absolute top-48 right-20 text-teal-300"
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
          >
            <DoodleCircle className="w-16 h-16" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-1/4 text-rose-300"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-brown">
                About{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    Homac UK
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                Since 2006, we've been dedicated to revolutionizing how children learn mathematics through proven abacus
                and mental arithmetic methodologies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision with colorful cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div {...fadeInUp}>
                <Card className="p-8 h-full bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl shadow-lg hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-brown">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To empower every child with exceptional mathematical abilities and unshakeable confidence through
                    innovative abacus and mental arithmetic training. We believe in developing not just computational
                    skills, but also enhancing cognitive abilities, concentration, and self-esteem.
                  </p>
                </Card>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <Card className="p-8 h-full bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-3xl shadow-lg hover:shadow-xl transition-all">
                  <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-brown">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To create a world where mathematical excellence is accessible to every child, regardless of
                    background. We envision Homac UK as the global leader in abacus education, touching millions of
                    lives and transforming educational experiences worldwide.
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline with colorful markers */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-16 text-brown">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">Journey</span>
            </motion.h2>

            <div className="space-y-6">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 items-center"
                >
                  <motion.div
                    className={`flex-shrink-0 w-16 h-16 ${milestone.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {idx + 1}
                  </motion.div>
                  <Card className="flex-1 p-6 rounded-2xl border-2 border-border hover:border-primary/30 transition-all hover:shadow-lg">
                    <p className="text-2xl font-bold text-primary">{milestone.year}</p>
                    <p className="text-lg text-muted-foreground">{milestone.event}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values with colorful icons */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-16 text-brown">
              Our Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Values</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const Icon = value.icon
                return (
                  <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }}>
                    <Card className="p-6 h-full rounded-3xl border-2 hover:shadow-xl transition-all group">
                      <motion.div
                        className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon size={28} />
                      </motion.div>
                      <h3 className="font-bold text-lg mb-2 text-brown">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats with vibrant colors */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Students Trained", icon: Users },
                { number: "20+", label: "Countries Served", icon: Globe },
                { number: "18", label: "Years of Excellence", icon: Award },
                { number: "92%", label: "Success Rate", icon: Target },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center text-white"
                >
                  <motion.div
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: idx * 0.2 }}
                  >
                    <stat.icon size={32} />
                  </motion.div>
                  <motion.p
                    className="text-5xl font-bold mb-2"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-lg text-white/90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
