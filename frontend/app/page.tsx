"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Brain,
  Zap,
  Star,
  GraduationCap,
  BookOpen,
  School,
  Heart,
  Trophy,
  Globe,
  Play,
  Volume2,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import CardSwap, { Card } from "@/components/card-swap/card-swap"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  viewport: { once: true },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
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

const DoodleZigzag = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 60 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  >
    <path d="M2 10 L12 2 L22 18 L32 2 L42 18 L52 2 L58 10" />
  </svg>
)

const DoodlePlus = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
)

const DoodleHeart = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const DoodleSpiral = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
  </svg>
)

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [data, setData] = useState([
{
    name: "Haretha Kanishkumar",
    role: "Student",
    content:
      "Homac helped me improve my mental maths and gain confidence across subjects. I now complete exams faster and consistently achieve top results in maths.",
    avatar: "/young-student-girl-smiling.jpg",
  },
  {
    name: "Chantelle Williams",
    role: "Parent",
    content:
      "Homac works for children of all abilities. My children made rapid progress, gained discipline, and developed a strong confidence in maths within months.",
    avatar: "/happy-mother-portrait.jpg",
  },
  {
    name: "Mirren Biason",
    role: "Student",
    content:
      "Attending Homac transformed my learning. I mastered difficult maths concepts and gained skills I will use throughout my life.",
    avatar: "/father-portrait-smiling.jpg",
  },
  {
    name: "Ana Maradia",
    role: "Parent",
    content:
      "With the guidance of Mrs. Menaka and Mr. Kumar, my son secured a place at Latymer School in just seven months. The teaching approach is outstanding.",
    avatar: "/happy-mother-portrait.jpg",
  },
  {
    name: "Parent of an 11+ Student",
    role: "Parent",
    content:
      "Abacus training significantly improved my child’s confidence and mathematical ability, contributing to success in the 11+ exams. Highly recommended.",
    avatar: "/father-portrait-smiling.jpg",
  },
])


  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/testimonials?status=approved`)
        if (res.ok) {
          const json = await res.json()
          const featured = json.filter((t: any) => t.featured).map((t: any) => ({
            name: t.name,
            role: t.role,
            content: t.content,
            avatar: t.image || "/placeholder-user.jpg"
          }))

          if (featured.length > 0) {
            setData(featured)
          }
        }
      } catch (e) {
        console.error("Failed to load testimonials", e)
      }
    }
    loadTestimonials()

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % data.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [data])

  const testimonials = data

  const learningPillars = [
    {
      title: "Mind",
      description: "Cognitive Development",
      icon: Brain,
      bgColor: "bg-teal-500",
      gradientFrom: "from-teal-400",
      gradientTo: "to-teal-600",
      link: "/courses",
    },
    {
      title: "Speed",
      description: "Lightning Calculation",
      icon: Zap,
      bgColor: "bg-amber-400",
      gradientFrom: "from-amber-300",
      gradientTo: "to-amber-500",
      link: "/courses",
    },
    {
      title: "Confidence",
      description: "Personal Growth",
      icon: Award,
      bgColor: "bg-rose-400",
      gradientFrom: "from-rose-300",
      gradientTo: "to-rose-500",
      link: "/courses",
    },
    {
      title: "Education",
      description: "Structured Learning",
      icon: GraduationCap,
      bgColor: "bg-sky-500",
      gradientFrom: "from-sky-400",
      gradientTo: "to-sky-600",
      link: "/courses",
    },
    {
      title: "Community",
      description: "Social Learning",
      icon: Users,
      bgColor: "bg-orange-500",
      gradientFrom: "from-orange-400",
      gradientTo: "to-orange-600",
      link: "/courses",
    },
    {
      title: "Excellence",
      description: "Achievement Focus",
      icon: Star,
      bgColor: "bg-emerald-500",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-emerald-600",
      link: "/courses",
    },
  ]

  const branches = [
    { name: "United Kingdom", flagUrl: "https://flagcdn.com/w160/gb.png", code: "GB" },
    
    { name: "India", flagUrl: "https://flagcdn.com/w160/in.png", code: "IN" },
    
    { name: "Switzerland", flagUrl: "https://flagcdn.com/w160/ch.png", code: "CH" },
    { name: "Australia", flagUrl: "https://flagcdn.com/w160/au.png", code: "AU" },
      {
    name: "Denmark",
    flagUrl: "https://flagcdn.com/w160/dk.png",
    code: "DK",
  },

  ]

  const stats = [
    { value: "20+", label: "Years of excellence in abacus education", icon: Trophy, bgColor: "bg-orange-500" },
    { value: "12K+", label: "Students mastered mental arithmetic", icon: Brain, bgColor: "bg-teal-500" },
    { value: "50+", label: "Certified training centers worldwide", icon: School, bgColor: "bg-amber-400" },
    { value: "12", label: "Countries with HOMAC presence", icon: Globe, bgColor: "bg-rose-500" },
    { value: "98%", label: "Student satisfaction rate", icon: Heart, bgColor: "bg-sky-500" },
    { value: "200+", label: "Trained & certified instructors", icon: GraduationCap, bgColor: "bg-emerald-500" },
  ]

  // YouTube video data - using a sample HOMAC UK video (replace with actual video ID)
  const featuredVideo = {
    id: "dQw4w9WgXcQ", // Replace with your actual HOMAC UK YouTube video ID
    title: "HOMAC UK - Abacus Mental Arithmetic in Action",
    channel: "HOMAC UK Official",
  }

  return (
    <>
      <Navbar />

      <section className="relative pt-24 pb-8 overflow-hidden bg-white">
        {/* Colorful animated doodles */}
        <motion.div
          className="absolute top-32 left-8 text-amber-400"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
        >
          <DoodleStar className="w-10 h-10" />
        </motion.div>
        <motion.div
          className="absolute top-48 right-12 text-teal-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 15, ease: "linear" }}
        >
          <DoodleCircle className="w-14 h-14" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-16 text-rose-400"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5 }}
        >
          <DoodlePlus className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-64 left-1/4 text-orange-400"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <DoodleZigzag className="w-20 h-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-48 right-1/4 text-pink-400"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
        >
          <DoodleHeart className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-80 right-20 text-sky-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        >
          <DoodleSpiral className="w-12 h-12" />
        </motion.div>

        {/* Floating colorful dots */}
        <motion.div
          className="absolute top-40 right-1/4 w-5 h-5 rounded-full bg-teal-400"
          animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-4 h-4 rounded-full bg-amber-400"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, delay: 1 }}
        />
        <motion.div
          className="absolute top-60 left-1/3 w-3 h-3 rounded-full bg-rose-400"
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5 }}
        />
        <motion.div
          className="absolute bottom-60 left-20 w-4 h-4 rounded-full bg-purple-400"
          animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left content - removed badge section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10 order-2 lg:order-1"
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brown leading-tight mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="text-balance">
                  Building Your Child's Future{" "}
                  <span className="relative inline-block">
                    in Great Motion
                    <motion.svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 200 12"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <motion.path
                        d="M2 8 Q50 2 100 8 Q150 14 198 6"
                        stroke="#f59e0b"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </motion.svg>
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                We don't just give our students only lectures but real life experiences through our proven abacus and
                mental arithmetic education.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/courses">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all group">
                    Get Started Now
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowRight size={20} />
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-brown text-brown hover:bg-brown hover:text-white transition-all bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - Images with fun animations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative flex gap-4 justify-center items-end">
                {/* Left child image */}
                <motion.div
                  className="relative w-40 md:w-48 lg:w-56"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, delay: 0 }}
                >
                  <div className="absolute -inset-4 bg-teal-400/30 rounded-full blur-2xl" />
                  <div className="relative bg-gradient-to-b from-teal-200 to-teal-400 rounded-t-full rounded-b-3xl overflow-hidden aspect-[3/4] shadow-xl">
                    <img
                      src="/happy-boy-holding-skateboard-green-tint-excited.jpg"
                      alt="Happy boy learning"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -left-4 top-1/4 text-amber-400"
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "linear" }}
                  >
                    <DoodleStar className="w-8 h-8" />
                  </motion.div>
                </motion.div>

                {/* Center floating card */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl p-4 shadow-xl border-2 border-amber-200"
                  animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-rose-600" />
                    </div>
                  </div>
                </motion.div>

                {/* Right child image */}
                <motion.div
                  className="relative w-40 md:w-48 lg:w-56"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, delay: 0.5 }}
                >
                  <div className="absolute -inset-4 bg-rose-400/30 rounded-full blur-2xl" />
                  <div className="relative bg-gradient-to-b from-amber-100 to-amber-300 rounded-t-full rounded-b-3xl overflow-hidden aspect-[3/4] shadow-xl">
                    <img
                      src="/happy-girl-holding-books-above-head-excited-smilin.jpg"
                      alt="Happy girl with books"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -right-2 top-1/3"
                    animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  >
                    <span className="text-4xl">🍎</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating pencil and book */}
              <motion.div
                className="absolute bottom-0 right-0"
                animate={{ rotate: [15, 25, 15], y: [0, -8, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5 }}
              >
                <span className="text-4xl">✏️</span>
              </motion.div>
              <motion.div
                className="absolute top-10 left-0"
                animate={{ rotate: [-5, 5, -5], y: [0, -5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
              >
                <span className="text-3xl">📚</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 -mt-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className={`${stat.bgColor} rounded-3xl p-5 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all cursor-pointer group`}
                whileHover={{ y: -8, rotate: [-1, 1, -1] }}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <motion.div
                    className="p-2.5 bg-white/20 rounded-xl"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, delay: idx * 0.3 }}
                  >
                    <stat.icon size={24} className="text-white" />
                  </motion.div>
                  <motion.span
                    className="text-3xl md:text-4xl font-bold"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: idx * 0.1 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-xs text-white/90 leading-snug">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Section with warm colors */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 text-amber-200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 25, ease: "linear" }}
        >
          <DoodleCircle className="w-24 h-24" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 text-teal-200"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
        >
          <DoodleStar className="w-16 h-16" />
        </motion.div>
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="100" cy="0" r="60" fill="#fef3c7" stroke="#fcd34d" strokeWidth="4" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-200/50 to-orange-200/50 rounded-3xl blur-xl" />
                <div className="relative bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-50 rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src="/mother-hugging-child-caring-moment-warm-educationa.jpg"
                    alt="Care and support"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 bg-teal-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg"
                  animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
                >
                  Since 2006
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown mb-6 leading-tight">
                Because Strong Foundations{" "}
                <span className="block">
                  Build{" "}
                  <span className="text-primary relative inline-block">
                    Brilliant Minds
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-1.5 bg-amber-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </span>
                  .
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We empower children to master numbers through abacus-based learning and mental arithmetic. Our
                structured programs strengthen concentration, memory, and problem-solving skills—helping young learners
                build confidence and excel academically from an early age.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Learn More
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-6 font-semibold border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white transition-all bg-transparent"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 text-rose-300"
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
        >
          <DoodleZigzag className="w-24 h-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-amber-300"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
        >
          <DoodleStar className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-1/4 text-teal-300"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        >
          <DoodleCircle className="w-20 h-20" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown mb-4">
              <span className="relative">
                Our Learning
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </span>{" "}
              Pillars
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building a strong foundation through our comprehensive learning approach
            </p>
          </motion.div>

          {/* CardSwap Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-6">
                Six Pillars of <span className="text-primary">Excellence</span>
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our holistic approach combines cognitive development, speed training, confidence building, structured
                education, community engagement, and excellence focus to create well-rounded learners.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {learningPillars.slice(0, 4).map((pillar, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-md border border-amber-100"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-10 h-10 ${pillar.bgColor} rounded-xl flex items-center justify-center`}>
                      <pillar.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-brown text-sm">{pillar.title}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/courses">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all group">
                  Explore All Pillars
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </Button>
              </Link>
            </motion.div>

            {/* Right - CardSwap Animation */}
            <motion.div
              className="flex-1 flex justify-center items-center relative"
              style={{ height: "600px" }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CardSwap
                width={320}
                height={400}
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
                easing="elastic"
                skewAmount={6}
              >
                {learningPillars.map((pillar, idx) => (
                  <Card
                    key={idx}
                    customClass={`bg-gradient-to-br ${pillar.gradientFrom} ${pillar.gradientTo} p-8 flex flex-col justify-between cursor-pointer`}
                  >
                    <div>
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
                      >
                        <pillar.icon size={32} className="text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-white mb-3">{pillar.title}</h3>
                      <p className="text-white/90 text-lg mb-4">{pillar.description}</p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {idx === 0 &&
                          "Enhance cognitive abilities through structured mental exercises and problem-solving techniques."}
                        {idx === 1 && "Master lightning-fast calculations with our proven abacus methodology."}
                        {idx === 2 && "Build unshakeable confidence through progressive achievement milestones."}
                        {idx === 3 && "Follow our comprehensive curriculum designed for optimal learning outcomes."}
                        {idx === 4 && "Learn alongside peers in a supportive, collaborative environment."}
                        {idx === 5 && "Strive for excellence with our achievement-focused approach."}
                      </p>
                    </div>
                    <Link href={pillar.link} className="mt-auto">
                      <div className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all">
                        Explore <ArrowRight size={18} />
                      </div>
                    </Link>
                  </Card>
                ))}
              </CardSwap>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence with auto-scrolling flags */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown mb-4">
              Global{" "}
              <span className="relative text-teal-600">
                Presence
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-teal-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">Trusted by families in 12 countries worldwide</p>
          </motion.div>

          {/* Auto-scrolling flags */}
          <div className="relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex animate-scroll-infinite">
              {[...branches, ...branches].map((branch, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 mx-6 bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100 hover:border-teal-300 transition-colors group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={branch.flagUrl || "/placeholder.svg"}
                      alt={`${branch.name} flag`}
                      className="w-20 h-14 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                      crossOrigin="anonymous"
                    />
                    <span className="font-semibold text-brown whitespace-nowrap">{branch.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with fun styling */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50/50 to-background relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 text-amber-300"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        >
          <DoodleCircle className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-rose-300"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
        >
          <DoodleHeart className="w-12 h-12" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown mb-4">
              What Parents{" "}
              <span className="relative text-rose-500">
                Say
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-rose-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </span>
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-rose-100 relative"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
            >
              <div className="absolute -top-4 -left-4 text-6xl text-rose-300">"</div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-rose-300 rotate-180">"</div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.img
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-rose-200"
                />
                <div className="flex-1 text-center md:text-left">
                  <motion.p
                    key={`content-${activeTestimonial}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-muted-foreground mb-6 leading-relaxed italic"
                  >
                    {testimonials[activeTestimonial].content}
                  </motion.p>
                  <motion.div
                    key={`name-${activeTestimonial}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="font-bold text-lg text-brown">{testimonials[activeTestimonial].name}</p>
                    <p className="text-rose-500 font-medium">{testimonials[activeTestimonial].role}</p>
                  </motion.div>
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${idx === activeTestimonial ? "bg-rose-500 w-8" : "bg-rose-200 hover:bg-rose-300"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* YouTube Video Section - Matching the reference image style */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 text-amber-200"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 25, ease: "linear" }}
        >
          <DoodleCircle className="w-24 h-24" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown mb-4">
              <span className="relative">
                HOMAC UK -
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </span>{" "}
              Abacus Mental Arithmetic in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Watch how our students master mental arithmetic through proven abacus techniques. 
              See the transformation in just 3 months!
            </p>
          </motion.div>

          {/* Main Video Player - Clean version without cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video max-w-4xl mx-auto"
          >
            {/* Video Thumbnail / Player */}
            <div className="relative w-full h-full">
              <img 
                src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
                alt={featuredVideo.title}
                className="w-full h-full object-cover"
              />
              
              {/* Video Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                {/* Top Bar with channel info */}
                <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                    H
                  </div>
                  <span className="text-white font-semibold">{featuredVideo.channel}</span>
                </div>

                {/* Center Play Button */}
                <motion.button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open(`https://youtube.com/watch?v=${featuredVideo.id}`, '_blank')}
                >
                  <Play size={36} className="text-white ml-1" />
                </motion.button>

                {/* Bottom Controls - Minimal */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Play size={18} className="mr-1" /> Play
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Volume2 size={18} />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Maximize2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Title - Simple and clean */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-brown mb-2">{featuredVideo.title}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch our proven methodology in action and see how children develop exceptional mental arithmetic skills through fun, engaging activities.
            </p>
          </motion.div>

          {/* Simple "Endless Possibilities" banner - Matching reference but with HOMAC */}
          <motion.div 
            className="mt-12 bg-gradient-to-r from-amber-500 to-rose-500 rounded-2xl p-6 text-white text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-1">Endless Possibilities with HOMAC UK</h3>
            <p className="text-white/90">
              From beginners to advanced learners, our abacus programs adapt to fit your child's needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 relative overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 text-white/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 30, ease: "linear" }}
        >
          <DoodleCircle className="w-32 h-32" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-white/30"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
        >
          <DoodleStar className="w-24 h-24" />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Child's Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of families who have transformed their children's mathematical abilities with Homac UK.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-white/90 rounded-full px-10 py-7 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  Explore Courses
                  <ArrowRight size={22} className="ml-2" />
                </Button>
              </Link>
              <Link href="/franchise">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-10 py-7 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-all bg-transparent"
                >
                  Become a Franchisee
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}