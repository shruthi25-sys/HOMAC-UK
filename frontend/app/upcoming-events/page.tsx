"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Users, 
  Target, 
  Globe, 
  Award,
  Sparkles,
  BookOpen,
  Heart,
  Star,
  Coffee,
  GraduationCap,
  PartyPopper,
  Presentation,
  Trophy
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  ageGroup: string
  capacity: number
  registered: number
  status: 'open' | 'limited' | 'full' | 'upcoming'
  type: 'workshop' | 'competition' | 'orientation' | 'training' | 'franchise'
  icon: React.ElementType
  description: string
  color: string
}

export default function UpcomingEvents() {
  const [filter, setFilter] = React.useState<'all' | Event['type']>('all')
  const [searchTerm, setSearchTerm] = React.useState('')

  const events: Event[] = [
    {
      id: 1,
      title: "Abacus Mental Arithmetic Workshop",
      date: "March 15, 2026",
      time: "10:00 AM - 12:30 PM",
      location: "HOMAC UK London Center",
      ageGroup: "Ages 5-12",
      capacity: 24,
      registered: 18,
      status: "open",
      type: "workshop",
      icon: BookOpen,
      description: "Hands-on abacus training for beginners. Children learn mental calculation techniques through fun activities.",
      color: "bg-amber-500"
    },
    {
      id: 2,
      title: "11+ Exam Preparation Bootcamp",
      date: "March 22, 2026",
      time: "2:00 PM - 5:00 PM",
      location: "HOMAC UK Birmingham",
      ageGroup: "Year 5 & 6",
      capacity: 30,
      registered: 27,
      status: "limited",
      type: "workshop",
      icon: Target,
      description: "Intensive preparation for grammar school entrance exams. Maths & English focus with practice papers.",
      color: "bg-teal-500"
    },
    {
      id: 3,
      title: "Parent Orientation Day",
      date: "March 28, 2026",
      time: "11:00 AM - 1:00 PM",
      location: "Online (Zoom)",
      ageGroup: "Parents",
      capacity: 100,
      registered: 45,
      status: "open",
      type: "orientation",
      icon: Heart,
      description: "Learn about our teaching methodology and how abacus math builds lifelong skills for your child.",
      color: "bg-rose-500"
    },
    {
      id: 4,
      title: "Summer Franchise Information Session",
      date: "April 5, 2026",
      time: "3:00 PM - 4:30 PM",
      location: "HOMAC UK Manchester",
      ageGroup: "Adults",
      capacity: 20,
      registered: 8,
      status: "open",
      type: "franchise",
      icon: Coffee,
      description: "Explore franchise opportunities with HOMAC UK. Expand quality education in your community.",
      color: "bg-sky-500"
    },
    {
      id: 5,
      title: "Advanced Mental Math Competition",
      date: "April 12, 2026",
      time: "9:30 AM - 3:00 PM",
      location: "HOMAC UK Bristol",
      ageGroup: "Level 3+ students",
      capacity: 50,
      registered: 42,
      status: "limited",
      type: "competition",
      icon: Trophy,
      description: "Annual competition showcasing mental arithmetic excellence with prizes and certificates.",
      color: "bg-fuchsia-500"
    },
    {
      id: 6,
      title: "Abacus Instructor Training",
      date: "April 19, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "HOMAC UK Head Office",
      ageGroup: "Certified teachers",
      capacity: 15,
      registered: 7,
      status: "open",
      type: "training",
      icon: GraduationCap,
      description: "Become a certified abacus instructor with our comprehensive training program.",
      color: "bg-emerald-500"
    },
    {
      id: 7,
      title: "Children's Day Special Workshop",
      date: "May 5, 2026",
      time: "11:00 AM - 2:00 PM",
      location: "HOMAC UK London Center",
      ageGroup: "All ages",
      capacity: 40,
      registered: 12,
      status: "upcoming",
      type: "workshop",
      icon: PartyPopper,
      description: "Fun-filled day with games, activities, and introduction to abacus for new students.",
      color: "bg-orange-500"
    },
    {
      id: 8,
      title: "11+ Mock Exam Day",
      date: "May 18, 2026",
      time: "9:00 AM - 1:00 PM",
      location: "Multiple Centers",
      ageGroup: "Year 5 & 6",
      capacity: 60,
      registered: 38,
      status: "open",
      type: "workshop",
      icon: Presentation,
      description: "Full mock exam experience with detailed feedback and parent consultation.",
      color: "bg-indigo-500"
    }
  ]

  const stats = [
    { number: "12", label: "Upcoming Events", icon: Calendar, color: "bg-amber-500" },
    { number: "8", label: "Workshops", icon: BookOpen, color: "bg-teal-500" },
    { number: "450+", label: "Registered Students", icon: Users, color: "bg-rose-500" },
    { number: "5", label: "Locations", icon: MapPin, color: "bg-sky-500" },
  ]

  const getStatusBadge = (status: Event['status']) => {
    switch(status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Registration Open</Badge>
      case 'limited':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">Limited Seats</Badge>
      case 'full':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">Full</Badge>
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">Coming Soon</Badge>
      default:
        return null
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero Section with Animations */}
        <section className="min-h-[60vh] flex items-center relative overflow-hidden py-20 bg-gradient-to-br from-amber-50 via-white to-teal-50">
          {/* Animated decorations */}
          <motion.div
            className="absolute top-32 left-10 text-amber-300"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <DoodleStar className="w-12 h-12" />
          </motion.div>
          <motion.div
            className="absolute top-48 right-20 text-teal-300"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <DoodleCircle className="w-16 h-16" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-1/4 text-rose-300"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute top-40 right-1/3 text-sky-300"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Calendar className="w-8 h-8" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-brown">
                Upcoming{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                    Events
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
                Join us for workshops, competitions, and events that bring mathematics to life. 
                Build real skills through our proven abacus and mental arithmetic education.
              </p>

              {/* Search Bar */}
              <motion.div 
                className="mt-10 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events by title, location, or description..."
                    className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-200 focus:border-amber-400 focus:outline-none shadow-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section with Vibrant Cards */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <motion.div
                      className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.p
                      className="text-3xl font-bold text-brown mb-1"
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Events
              </motion.button>
              {['workshop', 'competition', 'orientation', 'training', 'franchise'].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(type as typeof filter)}
                  className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${
                    filter === type 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredEvents.length === 0 ? (
              <motion.div 
                {...fadeInUp}
                className="text-center py-20"
              >
                <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brown mb-2">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event, idx) => {
                  const Icon = event.icon
                  const availableSpots = event.capacity - event.registered
                  const percentageFilled = (event.registered / event.capacity) * 100

                  return (
                    <motion.div
                      key={event.id}
                      {...fadeInUp}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group"
                    >
                      <Card className="h-full rounded-3xl border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:border-amber-200">
                        {/* Colored Header */}
                        <div className={`${event.color} p-6 relative overflow-hidden`}>
                          <motion.div
                            className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                          />
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                              {getStatusBadge(event.status)}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-white/90 text-sm line-clamp-2">{event.description}</p>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="p-6">
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-600">
                              <Calendar className="w-5 h-5 text-amber-500" />
                              <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                              <Clock className="w-5 h-5 text-amber-500" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                              <MapPin className="w-5 h-5 text-amber-500" />
                              <span>{event.location}</span>
                            </div>
                          </div>

                          {/* Age Group & Availability */}
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline" className="text-sm border-amber-200 text-amber-700">
                              {event.ageGroup}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              <span className="font-bold text-amber-600">{availableSpots}</span> spots left
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-6">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">Registered</span>
                              <span className="font-semibold">{event.registered}/{event.capacity}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <motion.div 
                                className={`h-2 rounded-full ${event.color}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${percentageFilled}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>

                          {/* Register Button */}
                          <Button 
                            className={`w-full rounded-full ${
                              event.status === 'full' 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                            }`}
                            disabled={event.status === 'full'}
                          >
                            {event.status === 'full' ? 'Fully Booked' : 'Register Now'}
                            {event.status !== 'full' && <ArrowRight className="ml-2 w-4 h-4" />}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section - Newsletter */}
        <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white/10"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{ transform: 'skewX(-20deg)' }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Never Miss an Event</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new workshops, competitions, and special events.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                />
                <Button className="bg-white text-amber-600 hover:bg-gray-100 rounded-full px-8 py-3">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}