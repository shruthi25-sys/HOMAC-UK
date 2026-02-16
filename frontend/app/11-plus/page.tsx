"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  BookOpen,
  Brain,
  Calculator,
  Clock,
  CheckCircle,
  Calendar,
  School,
  FileText,
  ArrowRight,
  Target,
  Users,
  Award,
  Star,
  ChevronDown,
  ChevronUp,
  Play,
  Zap,
  TrendingUp,
} from "lucide-react"
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

export default function ElevenPlusPage() {
  const [expandedModule, setExpandedModule] = useState<number | null>(0)

  const courseModules = [
    {
      chapter: "Module 1",
      title: "Mathematics Mastery",
      topics: [
        "Number operations and problem-solving",
        "Fractions, decimals, and percentages",
        "Algebra and equations",
        "Geometry and measurement",
        "Data handling and statistics",
        "Time-based calculation strategies",
      ],
    },
    {
      chapter: "Module 2",
      title: "English Excellence",
      topics: [
        "Reading comprehension techniques",
        "Grammar and punctuation mastery",
        "Vocabulary building and synonyms",
        "Creative and persuasive writing",
        "Spelling patterns and rules",
        "Critical analysis skills",
      ],
    },
    {
      chapter: "Module 3",
      title: "Verbal Reasoning",
      topics: [
        "Word relationships and analogies",
        "Code breaking and letter sequences",
        "Logic problems and deduction",
        "Vocabulary in context",
        "Hidden words and word formation",
        "Speed techniques for VR",
      ],
    },
    {
      chapter: "Module 4",
      title: "Non-Verbal Reasoning",
      topics: [
        "Pattern recognition and sequences",
        "Spatial awareness and rotation",
        "Shape analogies and matrices",
        "Reflection and symmetry",
        "3D visualization",
        "Cube nets and folding",
      ],
    },
    {
      chapter: "Module 5",
      title: "Exam Techniques & Mock Tests",
      topics: [
        "Time management strategies",
        "Question prioritization",
        "Elimination techniques",
        "Stress management and focus",
        "Weekly timed practice papers",
        "Full mock examinations",
      ],
    },
  ]

  const targetSchools = [
    { name: "Latymer School", region: "North London" },
    { name: "Woodford County High School", region: "Redbridge" },
    { name: "Ilford County High School", region: "Redbridge" },
    { name: "Henrietta Barnett School", region: "Barnet" },
    { name: "Queen Elizabeth's Boys", region: "Barnet" },
    { name: "CSSE Schools", region: "Essex" },
    { name: "South West Herts Consortium", region: "Hertfordshire" },
    { name: "Kent Grammar Schools", region: "Kent" },
    { name: "St Michael's Catholic Grammar", region: "North London" },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero Section - Dark Navy with Split Layout */}
        <section className="bg-[#0f172a] py-16 md:py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 text-sm font-semibold">Live Classes</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  11+ Preparation Programme
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Comprehensive preparation designed for Year 4 and Year 5 students. Build strong foundations in
                  Mathematics, English, Verbal and Non-Verbal Reasoning for top grammar school entry.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <Link href="/contact">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl px-8 py-6 text-lg font-bold shadow-lg shadow-cyan-500/25"
                      >
                        Enquire Now
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </motion.div>
                  </Link>

                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm">(4.9)</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Course Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                  <Image
                    src="/children-learning-math-with-abacus.jpg"
                    alt="11+ Preparation Programme"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                      Grammar School Prep
                    </span>
                    <span className="bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                      Year 4 & 5
                    </span>
                    <span className="bg-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                      All Subjects
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Student Showcase Section */}
        <section className="py-10 md:py-14 bg-white relative overflow-hidden">
          {/* Subtle background gradient orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Unlock Your Child's Full Potential with Expert 11+ Preparation — Your Success is Just a Step Away! Let us
                help you achieve your academic goals.
              </p>
            </motion.div>

            {/* Avatar Grid - Compact Layout */}
            <div className="relative h-[320px] md:h-[360px] max-w-4xl mx-auto">
              {/* Row 1 - Top avatars (3 rectangle cards) */}

              {/* Avatar 1 - Left rectangle */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="absolute left-[2%] md:left-[5%] top-0 w-24 md:w-32 h-32 md:h-44 rounded-2xl overflow-hidden shadow-xl border-3 border-white z-[5]"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
                }}
              >
                <Image src="/kid-avatar-5.jpg" alt="Student" fill className="object-cover object-top" />
              </motion.div>

              {/* Avatar 2 - Center-left rectangle */}
              <motion.div
                initial={{ opacity: 0, y: -20, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
                className="absolute left-[22%] md:left-[25%] top-4 w-22 md:w-28 h-28 md:h-40 rounded-2xl overflow-hidden shadow-xl border-3 border-white z-[6]"
                style={{
                  background: "linear-gradient(180deg, #a855f7 0%, #ec4899 100%)",
                }}
              >
                <Image src="/kid-avatar-7.jpg" alt="Student" fill className="object-cover object-top" />
              </motion.div>

              {/* Avatar 3 - Center main (largest) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute left-1/2 -translate-x-1/2 top-0 w-28 md:w-36 h-36 md:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
                style={{
                  background: "linear-gradient(180deg, #7c3aed 0%, #8b5cf6 100%)",
                }}
              >
                <Image src="/kid-avatar-3.jpg" alt="Student" fill className="object-cover object-top" />
              </motion.div>

              {/* Avatar 4 - Center-right rectangle */}
              <motion.div
                initial={{ opacity: 0, y: -20, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -4 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true }}
                className="absolute right-[22%] md:right-[25%] top-4 w-22 md:w-28 h-28 md:h-40 rounded-2xl overflow-hidden shadow-xl border-3 border-white z-[6]"
                style={{
                  background: "linear-gradient(180deg, #ec4899 0%, #f97316 100%)",
                }}
              >
                <Image src="/kid-avatar-8.jpg" alt="Student" fill className="object-cover object-top" />
              </motion.div>

              {/* Avatar 5 - Right rectangle */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute right-[2%] md:right-[5%] top-0 w-24 md:w-32 h-32 md:h-44 rounded-2xl overflow-hidden shadow-xl border-3 border-white z-[5]"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                }}
              >
                <Image src="/kid-avatar-6.jpg" alt="Student" fill className="object-cover object-top" />
              </motion.div>

              {/* Row 2 - Bottom avatars (5 oval/pill shapes) */}

              {/* Avatar 6 - Far left oval */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                viewport={{ once: true }}
                className="absolute left-[5%] md:left-[8%] bottom-4 md:bottom-8 w-18 md:w-24 h-24 md:h-32 rounded-full overflow-hidden shadow-xl border-3 border-pink-400"
              >
                <Image src="/kid-avatar-2.jpg" alt="Student" fill className="object-cover" />
              </motion.div>

              {/* Avatar 7 - Left-center oval */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute left-[22%] md:left-[24%] bottom-0 md:bottom-2 w-16 md:w-22 h-22 md:h-30 rounded-full overflow-hidden shadow-xl border-3 border-purple-400"
              >
                <Image src="/kid-avatar-9.jpg" alt="Student" fill className="object-cover" />
              </motion.div>

              {/* Avatar 8 - Center oval */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                viewport={{ once: true }}
                className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-4 w-18 md:w-24 h-24 md:h-32 rounded-full overflow-hidden shadow-xl border-3 border-pink-400 z-[8]"
              >
                <Image src="/kid-avatar-4.jpg" alt="Student" fill className="object-cover" />
              </motion.div>

              {/* Avatar 9 - Right-center oval */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute right-[22%] md:right-[24%] bottom-0 md:bottom-2 w-16 md:w-22 h-22 md:h-30 rounded-full overflow-hidden shadow-xl border-3 border-purple-400"
              >
                <Image src="/kid-avatar-10.jpg" alt="Student" fill className="object-cover" />
              </motion.div>

              {/* Avatar 10 - Far right oval */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                viewport={{ once: true }}
                className="absolute right-[5%] md:right-[8%] bottom-4 md:bottom-8 w-18 md:w-24 h-24 md:h-32 rounded-full overflow-hidden shadow-xl border-3 border-pink-400"
              >
                <Image src="/kid-avatar-1.jpg" alt="Student" fill className="object-cover" />
              </motion.div>

              {/* Decorative blur elements */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-16 rounded-xl bg-gradient-to-br from-purple-400/60 to-pink-400/60 blur-md"
                style={{ transform: "rotate(-12deg)" }}
              />
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-16 rounded-xl bg-gradient-to-br from-pink-400/60 to-purple-400/60 blur-md"
                style={{ transform: "rotate(12deg)" }}
              />
              <div className="absolute left-[15%] bottom-16 w-8 h-10 rounded-lg bg-gradient-to-br from-cyan-400/50 to-purple-400/50 blur-md" />
              <div className="absolute right-[15%] bottom-16 w-8 h-10 rounded-lg bg-gradient-to-br from-orange-400/50 to-pink-400/50 blur-md" />
            </div>
          </div>
        </section>

        {/* Course Overview & Sidebar Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-2 space-y-12">
                {/* Course Overview */}
                <motion.div {...fadeInUp}>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Course Overview</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                    <p>
                      The 11+ examination is a selective entrance test used by grammar schools across the UK to identify
                      academically able students. This competitive exam assesses children in key areas including
                      Mathematics, English, Verbal Reasoning, and Non-Verbal Reasoning.
                    </p>
                    <p>
                      Our comprehensive 11+ Preparation Programme is specifically designed to help students excel in all
                      examination areas. Through interactive lessons, real-life examples, and practice activities,
                      students will gain confidence in reasoning, speed under pressure, and accuracy in problem-solving.
                    </p>
                    <p>
                      Whether your child is in Year 4 building foundations or Year 5 doing intensive preparation, this
                      course gives them the strong foundation they need to succeed.
                    </p>
                  </div>
                </motion.div>

                {/* Course Modules */}
                <motion.div {...fadeInUp}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Course Modules</h2>
                    <Link
                      href="/contact"
                      className="text-cyan-600 hover:text-cyan-700 font-semibold text-sm hidden sm:block"
                    >
                      Explore all Class
                    </Link>
                  </div>

                  {/* Module Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Academic Year
                    </span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>5 Modules</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>Live Classes</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>Weekly Sessions</span>
                  </div>

                  {/* Accordion Modules */}
                  <div className="space-y-3">
                    {courseModules.map((module, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card
                          className={`rounded-2xl border-2 overflow-hidden transition-all ${expandedModule === idx ? "border-cyan-200 shadow-lg" : "border-border hover:border-gray-300"
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left"
                          >
                            <div>
                              <span className="text-xs font-semibold text-cyan-600 block mb-1">{module.chapter}</span>
                              <span className="text-lg font-bold text-foreground">{module.title}</span>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                              {expandedModule === idx ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedModule === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-5 border-t border-border pt-4">
                                  <ul className="space-y-2">
                                    {module.topics.map((topic, topicIdx) => (
                                      <li key={topicIdx} className="flex items-start gap-3 text-muted-foreground">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Target Schools */}
                <motion.div {...fadeInUp}>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Target Grammar Schools</h2>
                  <p className="text-muted-foreground mb-6">
                    Our programme prepares students for these prestigious institutions:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {targetSchools.map((school, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-cyan-200 hover:bg-cyan-50/50 transition-all"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <School className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{school.name}</p>
                          <p className="text-xs text-muted-foreground">{school.region}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="sticky top-28"
                >
                  <Card className="rounded-3xl border-2 overflow-hidden shadow-xl">
                    {/* Sidebar Image */}
                    <div className="relative h-48">
                      <Image
                        src="/happy-confident-children.jpg"
                        alt="Students learning"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white text-2xl font-bold">Premium Course</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Course Info */}
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-4">Course Info</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">Rating</span>
                            <div className="flex items-center gap-1">
                              <div className="flex -space-x-0.5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground ml-1">5.0</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-cyan-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground text-sm">Start Date</p>
                              <p className="text-muted-foreground text-xs">September 2025</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Users className="w-5 h-5 text-cyan-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground text-sm">Years</p>
                              <p className="text-muted-foreground text-xs">Year 4 & Year 5</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-cyan-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground text-sm">Class Structure</p>
                              <p className="text-muted-foreground text-xs">Year 4: 1 class/week</p>
                              <p className="text-muted-foreground text-xs">Year 5: 2 classes/week</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-cyan-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground text-sm">Assessments</p>
                              <p className="text-muted-foreground text-xs">Weekly test papers</p>
                              <p className="text-muted-foreground text-xs">mock exams in August</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Play className="w-5 h-5 text-cyan-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground text-sm">Course Type</p>
                              <p className="text-muted-foreground text-xs">Live Classes</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link href="/contact" className="block">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl py-6 font-bold text-lg shadow-lg shadow-cyan-500/25">
                            Enroll Now
                          </Button>
                        </motion.div>
                      </Link>

                      {/* Included Items */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-3">Included in the course:</p>
                        <div className="space-y-2">
                          {["Weekly test papers", "August mock exams", "Progress reports", "All 4 subjects covered"].map(
                            (item, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs text-muted-foreground">{item}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our 11+ Programme?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything your child needs to succeed in grammar school entrance exams
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Brain,
                  title: "Expert Teachers",
                  description: "Experienced educators specialized in 11+ preparation",
                  color: "from-purple-500 to-indigo-600",
                },
                {
                  icon: Target,
                  title: "Proven Results",
                  description: "High success rate in grammar school placements",
                  color: "from-cyan-500 to-blue-600",
                },
                {
                  icon: TrendingUp,
                  title: "Track Progress",
                  description: "Regular assessments and detailed progress reports",
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  icon: Award,
                  title: "Mock Exams",
                  description: "Realistic exam practice that mirrors the real test",
                  color: "from-amber-500 to-orange-600",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 rounded-2xl bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp}>
              <div className="w-20 h-20 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-cyan-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Start Your Child's Journey?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Give your child the best preparation for grammar school entry. Contact us today to learn more about our
                11+ programme and secure their place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-cyan-600 text-white hover:bg-cyan-700 rounded-xl px-8 py-6 text-lg font-bold shadow-xl"
                    >
                      Contact Us Today
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="tel:+442071838000">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 rounded-xl px-8 py-6 text-lg font-bold"
                    >
                      Call: +44 20 7183 8000
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
