"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Check,
  Phone,
  MapPin,
  Mail,
  Globe,
  Building2,
  Briefcase,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Shield,
  Handshake,
  Rocket,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  BadgeCheck,
  CircleDollarSign,
  HeartHandshake,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"

const infoSections = [
  {
    title: "HOMAC FRANCHISE",
    icon: Building2,
    gradient: "from-teal-500 via-teal-600 to-cyan-600",
    content:
      "HOMAC is looking forward to work with Business partners with certain requirements to maintain its quality and standard. The Business partner / Franchisee should match with the following requirements as we are dealing with education and the child's brain development.",
  },
  {
    title: "MANAGEMENT AND SYSTEM SUPPORT",
    icon: Users,
    gradient: "from-slate-600 via-slate-700 to-gray-800",
    content:
      "Students and their academic excellence are what HOMAC focus on. We have built a platform to implement excellence in training through our systems, which in turn will result in business development. We believe in supporting our franchisees in implementing systems through our Franchise Support Team. Our team will provide assistance towards business operations, administration and logistics to enhance the growth of our franchisee network to create WIN-WIN Situation.",
  },
  {
    title: "TECHNICAL KNOW-HOW",
    icon: Brain,
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    content:
      "HOMAC provides technical expertise to our franchisees by providing quality training, course materials, Training materials, Frequent up gradations and evaluations etc. HOMAC has Chief Instructors who are highly competent and technically qualified. We strongly believe that there cannot be a compromise on training methodologies. We provide centralized training to the course instructors from our franchisee network in a phased manner, which includes syllabus training, discipline, attitudes and skill.",
  },
  {
    title: "BUSINESS OPPORTUNITY",
    icon: TrendingUp,
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
    content:
      "ABACUS learning has been widely accepted and it has an excellent market potential. The academic performance of the children will be improved by this methodology and they will have an edge over others in their academic career. The target segments for this concept are the parents & schools since they are open to a methodology, which plays a vital role in the child's brain development, and they are very much receptive to this method. This works as a positive sign for business partners in profit making.",
  },
  {
    title: "MARKETING SUPPORT",
    icon: Rocket,
    gradient: "from-teal-500 via-emerald-500 to-green-500",
    content:
      "HOMAC has made a remarkable presence in UK. We as a company believe in BRAND PROMOTIONS by regular advertisements through various avenues that suit the market segment. Our brand promotions will support the franchisees in their local promotional activities.",
  },
  {
    title: "COURSE INSTRUCTOR",
    icon: GraduationCap,
    gradient: "from-purple-500 via-violet-600 to-indigo-600",
    content:
      'HOMAC has a strong pool of resourceful and intensively trained course instructors who are competent and responsible. The teachers are also taught on the psychology of children and the positive effects of encouragement and negative impact of punishment. Our education methodology is unique, forward looking with classes conducted in a creative and lively format. We suggest to our business Partners to maintain our training strength by recruiting Young and Dynamic Instructors preferably a lady with a pleasing personality and proficiency in English, and have a flair and passion for teaching. This will help the centre to perform well, as the Training Implementation and Quality Emphasize is the "Key to our Success".',
  },
  {
    title: "PROBATION",
    icon: Shield,
    gradient: "from-rose-500 via-pink-500 to-red-500",
    content:
      "HOMAC has adopted a unique method in our franchising system. Our franchisees will be under the probation for a period of one year. During this period we will review the performance in Interest towards revenue generation for the business partners, as we are conscious of our commitments and ethical business conduct with a high degree of integrity.",
  },
  {
    title: "BUSINESS AGREEMENT",
    icon: Handshake,
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    content:
      "A legal business agreement will be generated between you and the company during franchisee – sign up. And an agreement between the Course Instructor and company will also be generated to enable successful training operation.",
  },
  {
    title: "RETURN ON INVESTMENT",
    icon: CircleDollarSign,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    content:
      "The return on investment can be yield between 3 to 6 months of business operation, as this business does not incur any major overhead expenses or huge Investment in Infrastructure.",
  },
]

const requirements = [
  { text: "Fair/good academic background", icon: BookOpen },
  { text: "Passionate to deal with children and children education", icon: HeartHandshake },
  { text: "Business acumen", icon: Briefcase },
  { text: "Good in relationship/marketing", icon: Users },
]

const heroStats = [
  { value: "50+", label: "Global Franchises", icon: Globe },
  { value: "20+", label: "Years Experience", icon: Award },
  { value: "12K+", label: "Students Trained", icon: GraduationCap },
  { value: "98%", label: "Success Rate", icon: TrendingUp },
]

const srilankanFranchises = [
  { name: "Mrs. Bula Jaganathan", location: "Mattakkuliya", phone: "0777153419" },
  { name: "Mrs. Shyamala Kannan", location: "Kotahena", phone: "0777215530" },
  { name: "Mrs.Gayathri Ramanayake", location: "Panadura", phone: "0776104723" },
  { name: "Mr. Ameen Irshad", location: "Samanthurai", phone: "0767290611" },
  { name: "Mrs.Ranusa Ubuman", location: "Maligawatta", phone: "0770537933" },
  { name: "Mrs. Shiyara Prashanthi Fernando", location: "Moratuwa", phone: "0779976246" },
  { name: "Mrs. Yasanthini", location: "Nawalpitiya", phone: "0710171134" },
  { name: "Mrs.Anne Fernando", location: "Hatton", phone: "0772221977" },
  { name: "Mrs. Dharshika", location: "Imbulgoda", phone: "0777153419" },
  { name: "Mrs. Anne Florida", location: "Wattala", phone: "0722963922" },
  { name: "Mrs. Harshani Weerathunga", location: "Gampola", phone: "0771705269" },
  { name: "Mrs. Asma Haniff.", location: "Dematagoda", phone: "0757423030" },
]

const ukFranchises = [
  { name: "Mr.Senthil Kumar", location: "Edmonton", phone: "07713919296" },
  { name: "Mrs. Sumathi", location: "Gants Hill & romfort ", phone: "07538673867" },
  { name: "Mrs. Sivarani", location: "Milton Keynes", phone: "01908222907" },
  
  { name: "Mrs.Sivarubini", location: "Luton", phone: "07980205846" },
   { name: "Mrs.azra", location: "Licesera", phone: "079429602354" },
  
]

const countryContacts = [
  {
    country: "Sri Lanka",
    flag: "🇱🇰",
    name: "Mrs.Karthii",
    address: "814/1/1 A/J, Hirinapathuramy Mawatha, Colombo 13, Sri Lanka.",
    phone: "0094 77153 1164",
    email: "homaclanka@gmail.com",
  },
  {
    country: "India",
    flag: "🇮🇳",
    name: "Mr.Murugesan",
    address: "50, 80 Feet Road, Karur Post, Karur, Tamil Nadu, India - 639001.",
    phone: "00919600533344",
    email: "homacindia@gmail.com",
  },
  {
    country: "Switzerland",
    flag: "🇨🇭",
    name: "Mr. J Sounderrajan",
    address: "Schaffhauserstrasse 263, 8500 Frauenfeld, Switzerland.",
    phone: "+ 41 76 420 05 70",
    email: "info@homacswiss.ch",
    website: "www.homacswiss.ch",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    name: "Ms Shakthi",
    address: "1050 Markham Road, ough, Toronto, ON Canada-M1H2Y7.",
    phone: "+1 (647) 745-3123",
    email: "homacuk@gmail.com",
  },
]

function FloatingParticles() {
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([])

  useEffect(() => {
    setParticles(
      Array(20)
        .fill(null)
        .map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
        })),
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
    </div>
  )
}

export default function Franchise() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % infoSections.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white">
        <section className="relative min-h-[80vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex items-center">
          <GridBackground />
          <FloatingParticles />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/30 mb-6"
                >
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span className="text-teal-300 text-sm font-medium">Join Our Global Network</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  Become a{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                      HOMAC Franchise
                    </span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </span>{" "}
                  Partner
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl"
                >
                  Transform lives through education. Join our award-winning franchise network and help children unlock
                  their full potential with our proven abacus methodology.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-full px-8 shadow-lg shadow-teal-500/25 group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-full px-8 bg-transparent"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>

              {/* Right - Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {heroStats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-teal-500/50 transition-all">
                      <stat.icon className="w-8 h-8 text-teal-400 mb-3" />
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-teal-400"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </section>

        <section className="py-20 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-900 to-transparent" />
          <div className="absolute top-20 right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
                Partner Requirements
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-brown mb-4">What We Look For</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join hands with HOMAC and become part of a mission to transform young minds through innovative
                education.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {requirements.map((req, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-teal-100/50 transition-all overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                        <req.icon className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">{req.text}</p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-teal-100 to-transparent rounded-full opacity-50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
                Why Partner With Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-brown mb-4">Comprehensive Franchise Support</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infoSections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`group relative ${idx === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="h-full rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Gradient Header */}
                    <div className={`relative p-6 bg-gradient-to-r ${section.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-wide">{section.title}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>

                      {/* Requirements list for first section */}
                      {idx === 0 && (
                        <div className="mt-6 space-y-3">
                          {requirements.map((req, reqIdx) => (
                            <motion.div
                              key={reqIdx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + reqIdx * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-200">
                                <Check size={14} className="text-white" />
                              </div>
                              <span className="text-gray-700 text-sm">{req.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Hover accent line */}
                    <div
                      className={`h-1 bg-gradient-to-r ${section.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600" />
                <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10" />
                <FloatingParticles />

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Ready to Start Your Franchise Journey?
                    </h3>
                    <p className="text-white/80 max-w-xl">
                      Join our network of successful education entrepreneurs and make a difference in children's lives.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    size="lg"
                    className="bg-white text-teal-700 hover:bg-gray-100 font-semibold rounded-full px-8 shadow-xl group whitespace-nowrap"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    Apply Now
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 mb-6">
                <span className="text-2xl">🇱🇰</span>
                <span className="text-teal-700 font-medium">Sri Lanka Network</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brown mb-4">Srilankan Franchises</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our growing network of dedicated franchise partners across Sri Lanka.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {srilankanFranchises.map((franchise, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative h-full p-5 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-teal-200 transition-all overflow-hidden">
                    {/* Accent corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-bl-3xl flex items-start justify-end p-2">
                      <BadgeCheck className="w-4 h-4 text-white" />
                    </div>

                    <h4 className="font-bold text-brown mb-3 pr-12">{franchise.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                      <MapPin size={14} className="text-teal-500" />
                      <span>{franchise.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone size={14} className="text-teal-500" />
                      <span>{franchise.phone}</span>
                    </div>

                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6">
                <span className="text-2xl">🇬🇧</span>
                <span className="text-amber-700 font-medium">United Kingdom Network</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brown mb-4">United Kingdom Franchises</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our established network of franchise partners serving communities across the UK.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ukFranchises.map((franchise, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative h-full p-5 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl hover:border-amber-200 transition-all overflow-hidden">
                    {/* Accent corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-bl-3xl flex items-start justify-end p-2">
                      <BadgeCheck className="w-4 h-4 text-white" />
                    </div>

                    <h4 className="font-bold text-brown mb-3 pr-12">{franchise.name}</h4>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                      <MapPin size={14} className="text-amber-500" />
                      <span>{franchise.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone size={14} className="text-amber-500" />
                      <span>{franchise.phone}</span>
                    </div>

                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <GridBackground />

          {/* Animated orbs */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 border border-white/20">
                Global Presence
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Contact Our Regional Offices</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Get in touch with our regional coordinators to learn more about franchise opportunities in your area.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {countryContacts.map((contact, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative h-full p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      {/* Country header */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-3xl">{contact.flag}</span>
                        <h3 className="text-xl font-bold text-white">{contact.country}</h3>
                      </div>

                      <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-2 text-teal-400 font-semibold">
                          <Users size={16} />
                          <span>{contact.name}</span>
                        </div>
                        <div className="flex items-start gap-2 text-slate-400">
                          <MapPin size={16} className="text-teal-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{contact.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Phone size={16} className="text-teal-500" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail size={16} className="text-teal-500" />
                          <span>{contact.email}</span>
                        </div>
                        {contact.website && (
                          <div className="flex items-center gap-2 text-slate-400">
                            <Globe size={16} className="text-teal-500" />
                            <a
                              href={`https://${contact.website}`}
                              className="hover:text-teal-400 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {contact.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-t-3xl" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Building2 size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brown">Franchise Enquiry</h2>
                  <p className="text-gray-500 text-sm">Take the first step towards your success</p>
                </div>
              </div>

              <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const data = {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    location: formData.get('location'), // Using preferred location for both currently
                    preferredArea: formData.get('location'),
                    investmentAmount: "Pending discussion", // Default value as field is missing
                    experience: "Not provided", // Default value as field is missing
                    motivation: formData.get('motivation'),
                    status: "pending"
                  }

                  try {
                    // Import directly from utils if possible, hardcoding for safety if import fails here
                    // import { API_URL } from "@/lib/utils"
                    const API_URL = "http://localhost:3001/api"

                    const res = await fetch(`${API_URL}/franchise`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    })

                    if (res.ok) {
                      alert("Application submitted successfully!")
                      setIsFormOpen(false)
                    } else {
                      alert("Failed to submit application. Please try again.")
                    }
                  } catch (error) {
                    console.error(error)
                    alert("An error occurred.")
                  }
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">First Name</label>
                    <Input name="firstName" required placeholder="John" className="rounded-xl border-gray-200 focus:border-teal-500 h-12" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name</label>
                    <Input name="lastName" required placeholder="Doe" className="rounded-xl border-gray-200 focus:border-teal-500 h-12" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
                  <Input
                    name="email"
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-xl border-gray-200 focus:border-teal-500 h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
                  <Input
                    name="phone"
                    required
                    placeholder="+44 123 456 7890"
                    className="rounded-xl border-gray-200 focus:border-teal-500 h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Preferred Location</label>
                  <Input
                    name="location"
                    required
                    placeholder="City, Country"
                    className="rounded-xl border-gray-200 focus:border-teal-500 h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tell us about yourself</label>
                  <textarea
                    name="motivation"
                    required
                    placeholder="Your background, experience, and why you're interested in HOMAC franchise..."
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none text-gray-700"
                    rows={4}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-xl h-12 shadow-lg shadow-teal-500/25"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    Submit Enquiry
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl h-12 border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Footer />
    </>
  )
}
