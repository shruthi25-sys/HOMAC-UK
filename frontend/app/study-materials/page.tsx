"use client"

import { motion } from "framer-motion"
import { Download, FileText, Video, BookOpen } from "lucide-react"
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

export default function StudyMaterials() {
  const materials = [
    {
      category: "Workbooks",
      icon: FileText,
      color: "from-primary to-primary-light",
      items: [
        { title: "Level 1 Workbook", pages: 48, difficulty: "Beginner" },
        { title: "Level 2 Workbook", pages: 64, difficulty: "Intermediate" },
        { title: "Level 3 Workbook", pages: 80, difficulty: "Advanced" },
      ],
    },
    {
      category: "Video Tutorials",
      icon: Video,
      color: "from-accent to-accent-light",
      items: [
        { title: "Abacus Basics", duration: "15 mins", difficulty: "Beginner" },
        { title: "Advanced Techniques", duration: "45 mins", difficulty: "Intermediate" },
        { title: "Speed Building", duration: "60 mins", difficulty: "Advanced" },
      ],
    },
    {
      category: "Practice Sheets",
      icon: BookOpen,
      color: "from-secondary to-primary",
      items: [
        { title: "Daily Practice Set 1", problems: 50, difficulty: "Beginner" },
        { title: "Daily Practice Set 2", problems: 100, difficulty: "Intermediate" },
        { title: "Speed Challenge Set", problems: 200, difficulty: "Advanced" },
      ],
    },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero */}
        <section className="min-h-[60vh] flex items-center relative overflow-hidden py-20 bg-white">
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">
                Study <span className="gradient-secondary text-transparent bg-clip-text">Materials</span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl">
                Comprehensive resources to support your learning journey - from beginner to advanced level.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {materials.map((material, idx) => {
                const Icon = material.icon
                return (
                  <motion.div key={idx} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}>
                    <Card className="p-6 h-full flex flex-col">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${material.color} flex items-center justify-center text-white mb-6`}
                      >
                        <Icon size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-6">{material.category}</h3>

                      <div className="flex-1 space-y-4 mb-6">
                        {material.items.map((item, i) => (
                          <div key={i} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                            <p className="font-semibold text-sm text-foreground">{item.title}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-muted-foreground">
                                {(item as any).pages
                                  ? `${(item as any).pages} pages`
                                  : (item as any).duration
                                    ? `${(item as any).duration}`
                                    : `${(item as any).problems} problems`}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${item.difficulty === "Beginner"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  : item.difficulty === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  }`}
                              >
                                {item.difficulty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary-light text-white">
                        <Download size={20} />
                        Download Materials
                      </Button>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-12">
              Why Our Materials Stand Out
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Structured Learning Path",
                  description: "Progressive difficulty levels designed for optimal learning",
                },
                {
                  title: "Comprehensive Coverage",
                  description: "All topics from basics to advanced techniques covered",
                },
                { title: "Regular Updates", description: "New materials added monthly based on student feedback" },
                { title: "Expert Authored", description: "Created by experienced abacus instructors and educators" },
              ].map((feature, idx) => (
                <motion.div key={idx} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}>
                  <Card className="p-6 card-modern">
                    <h3 className="text-lg font-bold mb-2 text-primary">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
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
