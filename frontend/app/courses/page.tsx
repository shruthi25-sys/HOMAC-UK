"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Check, ArrowRight, MapPin, Phone, Mail, Sparkles, Brain, Zap, Calculator, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { getCourses, type Course } from "@/lib/courses-store"
import { Loader2 } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  viewport: { once: true },
}

const DoodleStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function Courses() {
  const [activeTab, setActiveTab] = useState<"abacus" | "mental" | "mathematics">("abacus")
  const [dbCourses, setDbCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses()
        setDbCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])
const mainCourses = [
  {
    name: "Homac Prep Course",
    color: "from-amber-400 to-yellow-500",
    icon: Sparkles,
    image: "/classroom-kids-learning-abacus-fun.jpg",
    description:
      "Designed for young learners to build early number skills and confidence through fun and engaging activities.",
    highlights: ["Age 4–5 years", "Early numeracy", "Confidence building"],
  },
  {
    name: "Homac Reception",
    color: "from-teal-400 to-emerald-500",
    icon: Brain,
    image: "/teacher-children-learning-cards-number-sense.jpg",
    description:
      "Focuses on developing number sense and counting skills essential for early academic success.",
    highlights: ["Age 5–6 years", "Number sense", "Counting skills"],
  },
  {
    name: "Homac Key Stages",
    color: "from-rose-400 to-pink-500",
    icon: Zap,
    image: "/diverse-kids-group-learning-mental-arithmetic.jpg",
    description:
      "Structured multi-stage program that strengthens mental arithmetic and problem-solving skills.",
    highlights: ["Age 6–12 years", "Mental arithmetic", "Skill progression"],
  },
];


  const globalLocations = [
    {
      country: "Sri Lanka",
      name: "Mrs.Karthi",
      address: "15 Sri Gunananda Mawatha, Colombo 01300, Sri Lanka",
      phone: "0097 7153 1164",
      email: "homaclanka@gmail.com",
      color: "border-amber-400",
    },
    {
      country: "India",
      name: "Mr.Murugesan",
      address: "3rd Cross Street,Thiruvalluvar Salai,Oddanchatram,Tamil nadu",
      phone: "00919600533344",
      email: "homacindia@gmail.com",
      color: "border-teal-400",
    },
    {
      country: "Switzerland",
      name: "Mr. J Sounderrajan",
      address: "Schaffhauserstrasse 263, 8500 Frauenfeld",
      phone: "+41 76 420 05 70",
      email: "info@homacswiss.ch",
      color: "border-rose-400",
    },
    {
      country: "Denmark",
      name: "Mr.Shakthi",
      address: "1050 Markham Road, Toronto, ON",
      phone: "+1 (647) 745-3123",
      email: "homacuk@gmail.com",
      color: "border-sky-400",
    },
  ]

  const tabContent = {
  abacus: {
    title: "What is Abacus?",
    paragraphs: [
      "Abacus is a traditional calculation tool made of beads arranged on rods within a frame. It has been used for centuries, even before pen and paper, and is still practiced in many parts of the world today, including Japanese, Chinese, and Russian methods.",
      "Abacus learning makes numbers fun and engaging for children. By using touch and visual memory, children understand calculations more easily, helping them learn faster and with greater confidence.",
    ],
  },

  mental: {
    title: "Mental Arithmetic Training",
    intro:
      "Mental Arithmetic training helps children perform calculations quickly and accurately without using tools like calculators or abacus. It strengthens both the right and left sides of the brain, improving memory, speed, and concentration from an early age.",

    points: [
      "Develops strong calculation skills using visual and mental techniques.",
      "Improves concentration, memory, and problem-solving abilities.",
      "Encourages whole-brain development through visualization and practice.",
      "Boosts confidence by enabling children to solve problems independently.",
      "Reduces fear of numbers and builds a positive attitude towards mathematics.",
      "Enhances academic performance across all subjects.",
      "Provides lifelong skills such as focus, speed, and time management.",
    ],
  },

  mathematics: {
    title: "Mathematics and Abacus",
    paragraphs: [
      "Mathematics plays a vital role in everyday life and future careers. Early exposure to numbers helps children build confidence and develop logical thinking skills essential for academic success.",
      "Many children develop a fear of mathematics due to its abstract nature. Learning maths through abacus introduces numbers in a friendly and visual way, helping overcome this fear.",
      "Abacus training improves concentration, speed, accuracy, and memory. It strengthens cognitive development and enhances a child’s ability to visualise and solve problems effectively.",
      "By stimulating the right side of the brain, abacus learning helps children master mental calculations and apply logical thinking in real-life situations.",
    ],
  },
};

  const tabs = [
    { id: "abacus" as const, label: "Abacus", icon: Calculator, color: "bg-primary hover:bg-primary/90" },
    { id: "mental" as const, label: "Mental Arithmetic", icon: Brain, color: "bg-slate-600 hover:bg-slate-700" },
    {
      id: "mathematics" as const,
      label: "Mathematics and Abacus",
      icon: BookOpen,
      color: "bg-teal-500 hover:bg-teal-600",
    },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        <section className="bg-white py-16 relative overflow-hidden">
          <motion.div
            className="absolute top-10 right-20 text-white/30"
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
          >
            <DoodleStar className="w-20 h-20" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Our Courses</h1>
                <p className="text-white/90 text-lg">Discover the perfect learning path for your child</p>
              </div>
              <div className="text-white text-lg font-semibold hidden md:block">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>Courses</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white relative overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 text-amber-300/40"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{
              rotate: { repeat: Number.POSITIVE_INFINITY, duration: 20 },
              scale: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-teal-300/40"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
          >
            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </motion.div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">
                Learn About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                  Our Methods
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">Discover the power of abacus-based learning</p>
            </motion.div>

            <motion.div {...fadeInUp} className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center gap-2 ${activeTab === tab.id ? tab.color + " shadow-lg scale-105" : "bg-gray-400 hover:bg-gray-500"
                    }`}
                  whileHover={{ scale: activeTab === tab.id ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 rounded-3xl shadow-xl border-t-4 border-primary bg-white">
                  {activeTab === "abacus" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-brown flex items-center gap-3">
                        <Calculator className="text-primary" />
                        {tabContent.abacus.title}
                      </h3>
                      {tabContent.abacus.paragraphs.map((para, idx) => (
                        <p key={idx} className="text-muted-foreground leading-relaxed text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {activeTab === "mental" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-brown flex items-center gap-3">
                        <Brain className="text-slate-600" />
                        {tabContent.mental.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base">{tabContent.mental.intro}</p>
                      <div className="space-y-4 mt-6">
                        {tabContent.mental.points.map((point, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-3"
                          >
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-amber-500 flex items-center justify-center">
                                <Check size={14} className="text-white" />
                              </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-sm">{point}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "mathematics" && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-brown flex items-center gap-3">
                        <BookOpen className="text-teal-500" />
                        {tabContent.mathematics.title}
                      </h3>
                      {tabContent.mathematics.paragraphs.map((para, idx) => (
                        <p key={idx} className="text-muted-foreground leading-relaxed text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">
                Courses In{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  HOMAC
                </span>
              </h2>
              <div className="flex justify-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-400" />
                <div className="w-4 h-4 rounded-full bg-teal-400" />
                <div className="w-4 h-4 rounded-full bg-rose-400" />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {mainCourses.map((course, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="h-full" whileHover={{ y: -10 }}>
                  <Card
                    className={`bg-gradient-to-br ${course.color} text-white h-full overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all`}
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <motion.div
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
                      >
                        <course.icon size={24} className="text-white" />
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4 text-center">{course.name}</h3>
                      <p className="text-sm leading-relaxed mb-6 text-white/90">{course.description}</p>

                      <div className="space-y-2">
                        {course.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                            <span className="text-white/90 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">
                Available{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                  Classes
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">Enroll in our upcoming batches</p>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : dbCourses.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {dbCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <Link href={`/courses/${course.slug}`}>
                      <Card className="h-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all border border-slate-100 flex flex-col">
                        <div className="h-48 bg-slate-200 relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${course.category === 'beginner' ? 'from-amber-300 to-orange-400' :
                            course.category === 'intermediate' ? 'from-teal-300 to-emerald-400' :
                              'from-blue-300 to-indigo-400'
                            }`} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="text-white w-12 h-12 opacity-50" />
                          </div>
                          <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-slate-700 capitalize">
                            {course.category}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-brown">{course.title}</h3>
                            <div className="text-lg font-bold text-primary">£{course.price}</div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>

                          <div className="mt-auto space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <Brain size={16} className="text-slate-500" />
                              </div>
                              <span>{course.level || "All Levels"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <Zap size={16} className="text-slate-500" />
                              </div>
                              <span>{course.duration || "Flexible"}</span>
                            </div>
                          </div>

                          <Button className="w-full mt-6 bg-slate-900 text-white hover:bg-slate-800 rounded-xl">
                            View Details
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No classes currently scheduled. Please check back later.
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-16 text-brown">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                Global Presence
              </span>
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {globalLocations.map((location, idx) => (
                <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -5 }}>
                  <Card
                    className={`p-6 border-t-4 ${location.color} h-full rounded-2xl hover:shadow-xl transition-all`}
                  >
                    <h3 className="text-xl font-bold text-brown mb-4">{location.country}</h3>
                    <div className="space-y-3 text-sm">
                      <p className="font-semibold text-primary">{location.name}</p>
                      <div className="flex gap-2">
                        <MapPin size={16} className="text-amber-500 flex-shrink-0 mt-1" />
                        <p className="text-muted-foreground">{location.address}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Phone size={16} className="text-teal-500" />
                        <a href={`tel:${location.phone}`} className="text-muted-foreground hover:text-primary">
                          {location.phone}
                        </a>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Mail size={16} className="text-rose-500" />
                        <a
                          href={`mailto:${location.email}`}
                          className="text-muted-foreground hover:text-primary truncate"
                        >
                          {location.email}
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Enroll Your Child?</h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of families in our global community and start the learning journey today.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-white/90 font-bold rounded-full px-10 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  Contact Us Today
                  <ArrowRight size={20} className="ml-2" />
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
