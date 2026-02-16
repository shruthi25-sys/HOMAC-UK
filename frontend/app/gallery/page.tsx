"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Camera,
  Trophy,
  Users,
  MapPin,
  Calendar,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  PartyPopper,
  GraduationCap,
  Globe
} from "lucide-react"

// Timeline data organized by year - admins can add more entries here
const initialTimelineData = [
  {
    year: "2024",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    events: [
      {
        title: "Competition 2024 UK",
        location: "United Kingdom",
        category: "Competition",
        description: "Annual UK competition showcasing amazing mental math talents",
        images: [
          { src: "/kids-in-classroom-learning.jpg", alt: "Competition 2024 UK" },
          { src: "/award-winning-students.jpg", alt: "Winners 2024" },
        ]
      },
      {
        title: "HOMAC Presentation India",
        location: "India",
        category: "Presentation",
        description: "Expanding our reach with exciting presentations across India",
        images: [
          { src: "/diverse-kids-group-learning-mental-arithmetic.jpg", alt: "India Presentation" },
          { src: "/teacher-children-learning-cards-number-sense.jpg", alt: "Training Session" },
        ]
      }
    ]
  },
  {
    year: "2023",
    color: "from-teal-400 to-emerald-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-300",
    events: [
      {
        title: "Prize Giving Ceremony",
        location: "Sri Lanka",
        category: "Awards",
        description: "Celebrating our brilliant students' achievements",
        images: [
          { src: "/award-winning-students-celebrating.jpg", alt: "Prize Ceremony 2023" },
          { src: "/successful-student-kids-happy.jpg", alt: "Happy Winners" },
        ]
      },
      {
        title: "Franchise Meeting Sri Lanka",
        location: "Sri Lanka",
        category: "Meeting",
        description: "Bringing together our franchise partners for growth",
        images: [
          { src: "/children-learning-together-group.jpg", alt: "Franchise Meeting" },
        ]
      }
    ]
  },
  {
    year: "2017",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-300",
    events: [
      {
        title: "Prize Giving Ceremony 2017 SL",
        location: "Sri Lanka",
        category: "Awards",
        description: "A memorable celebration of student excellence",
        images: [
          { src: "/happy-children-smiling-learning-abacus.jpg", alt: "Prize Giving 2017" },
          { src: "/child-learning-progressing.jpg", alt: "Student Progress" },
        ]
      }
    ]
  },
  {
    year: "2014",
    color: "from-sky-400 to-blue-500",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-300",
    events: [
      {
        title: "Competition 2014 UK",
        location: "United Kingdom",
        category: "Competition",
        description: "Thrilling mental math competition with record participation",
        images: [
          { src: "/kids-doing-fast-math.jpg", alt: "Competition 2014" },
          { src: "/classroom-learning-abacus.jpg", alt: "Classroom Session" },
          { src: "/happy-confident-children-smiling.jpg", alt: "Happy Students" },
        ]
      },
      {
        title: "Sample Prize Scheme",
        location: "Multiple Locations",
        category: "Awards",
        description: "Recognizing excellence with our prize scheme program",
        images: [
          { src: "/successful-student-child.jpg", alt: "Prize Scheme" },
        ]
      }
    ]
  },
  {
    year: "2013",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-300",
    events: [
      {
        title: "Competition 2013 UK",
        location: "United Kingdom",
        category: "Competition",
        description: "Outstanding performances from young math wizards",
        images: [
          { src: "/children-learning-math-with-abacus.jpg", alt: "Competition 2013" },
          { src: "/kids-learning-together-group-activity.jpg", alt: "Group Activity" },
        ]
      }
    ]
  },
  {
    year: "2011",
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-300",
    events: [
      {
        title: "Competition 2011",
        location: "United Kingdom",
        category: "Competition",
        description: "Where it all began - our first major UK competition",
        images: [
          { src: "/modern-teaching-methods.jpg", alt: "Competition 2011" },
          { src: "/happy-smiling-kids-learning-abacus-fun.jpg", alt: "Fun Learning" },
        ]
      }
    ]
  },
  {
    year: "2009",
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    events: [
      {
        title: "Competition 2009 UK",
        location: "United Kingdom",
        category: "Competition",
        description: "The pioneering competition that started our journey",
        images: [
          { src: "/children-learning-with-abacus.jpg", alt: "Competition 2009" },
          { src: "/fast-mental-math-kids.jpg", alt: "Mental Math" },
          { src: "/happy-confident-children.jpg", alt: "Confident Kids" },
        ]
      },
      {
        title: "Franchise Meeting Sri Lanka",
        location: "Sri Lanka",
        category: "Meeting",
        description: "Building partnerships for global expansion",
        images: [
          { src: "/mother-child-caring-education-moment.jpg", alt: "Franchise Meeting" },
        ]
      }
    ]
  }
]

// Categories for filtering
const categories = [
  { id: "all", label: "All Events", icon: Sparkles },
  { id: "Competition", label: "Competitions", icon: Trophy },
  { id: "Awards", label: "Awards", icon: Star },
  { id: "Meeting", label: "Meetings", icon: Users },
  { id: "Presentation", label: "Presentations", icon: GraduationCap },
]

// Locations for filtering
const locations = [
  { id: "all", label: "All Locations", icon: Globe },
  { id: "United Kingdom", label: "UK", icon: MapPin },
  { id: "Sri Lanka", label: "Sri Lanka", icon: MapPin },
  { id: "India", label: "India", icon: MapPin },
]

export default function Gallery() {
  const [timelineData, setTimelineData] = useState(initialTimelineData)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [expandedYears, setExpandedYears] = useState<string[]>([]) // Start empty or with current year
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  // Fetch backend gallery items
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001/api"}/media?isGallery=true`)
        if (res.ok) {
          const assets = await res.json()

          // Group by Year -> Title
          const groupedByYear: Record<string, any[]> = {}
          assets.forEach((asset: any) => {
            const year = asset.galleryYear || new Date().getFullYear()
            if (!groupedByYear[year]) groupedByYear[year] = []
            groupedByYear[year].push(asset)
          })

          const newTimelineEvents = Object.keys(groupedByYear).map(year => {
            // Further group by Title within key
            const byTitle: Record<string, any[]> = {}
            groupedByYear[year].forEach(asset => {
              const title = asset.title || "Gallery Moments"
              if (!byTitle[title]) byTitle[title] = []
              byTitle[title].push(asset)
            })

            const events = Object.keys(byTitle).map(title => {
              const group = byTitle[title]
              const first = group[0]
              return {
                title: title,
                location: "Online Gallery", // Default
                category: "Gallery",
                description: first.caption || `${group.length} photos`,
                images: group.map((item: any) => ({
                  src: item.url,
                  alt: item.title || "Gallery Image"
                }))
              }
            })

            return {
              year: year.toString(),
              color: "from-amber-400 to-orange-500", // Default styling
              bgColor: "bg-amber-50",
              borderColor: "border-amber-300",
              events
            }
          })

          // Merge with initial data
          setTimelineData(prev => {
            // Simple strategy: Merge new year objects or update existing ones
            const combined = [...initialTimelineData]

            newTimelineEvents.forEach(newItem => {
              const existingIndex = combined.findIndex(c => c.year === newItem.year)
              if (existingIndex >= 0) {
                // Append events to existing year
                // Check for duplicates based on title to avoid double adding if strict
                const existingEventTitles = new Set(combined[existingIndex].events.map(e => e.title))
                const uniqueNewEvents = newItem.events.filter(e => !existingEventTitles.has(e.title))
                combined[existingIndex].events.push(...uniqueNewEvents)
              } else {
                combined.push(newItem)
              }
            })

            // Sort by year desc
            return combined.sort((a, b) => parseInt(b.year) - parseInt(a.year))
          })

          // Expand fetched years
          setExpandedYears(prev => [...Array.from(new Set([...prev, ...newTimelineEvents.map(t => t.year)]))])
        }
      } catch (e) {
        console.error("Failed to load gallery", e)
      }
    }
    fetchGallery()
  }, [])

  const toggleYear = (year: string) => {
    setExpandedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    )
  }

  const filteredTimeline = timelineData.map(yearData => ({
    ...yearData,
    events: yearData.events.filter(event => {
      const categoryMatch = selectedCategory === "all" || event.category === selectedCategory
      const locationMatch = selectedLocation === "all" || event.location.includes(selectedLocation)
      return categoryMatch && locationMatch
    })
  })).filter(yearData => yearData.events.length > 0)

  return (
    <>
      <Navbar />

      <div className="pt-20 bg-white min-h-screen">
        {/* Hero Section - Fun & Kid-friendly */}
        <section className="relative overflow-hidden py-16 md:py-24">
          {/* Floating decorative elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 bg-amber-300/30 rounded-full"
              animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-32 right-20 w-16 h-16 bg-teal-300/30 rounded-full"
              animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 w-24 h-24 bg-rose-300/20 rounded-full"
              animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 right-10 w-12 h-12 bg-orange-300/30 rounded-full"
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Star decorations */}
            <Star className="absolute top-20 right-1/3 w-8 h-8 text-amber-300/50" />
            <Star className="absolute bottom-32 right-1/4 w-6 h-6 text-teal-300/50" />
            <Sparkles className="absolute top-40 left-1/3 w-10 h-10 text-rose-300/40" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Fun badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Camera className="w-5 h-5 text-amber-600" />
                <span className="text-amber-700 font-medium">Our Amazing Journey</span>
                <PartyPopper className="w-5 h-5 text-orange-500" />
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gray-800">Memory </span>
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-transparent bg-clip-text">
                  Lane
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                Take a magical trip through our incredible journey! See all the fun moments,
                amazing competitions, and wonderful celebrations from over the years.
              </p>

              {/* Fun stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                {[
                  { icon: Trophy, label: "Competitions", value: "15+", color: "text-amber-500" },
                  { icon: Star, label: "Awards Given", value: "500+", color: "text-teal-500" },
                  { icon: Globe, label: "Countries", value: "4+", color: "text-rose-500" },
                  { icon: Calendar, label: "Years of Joy", value: "15+", color: "text-orange-500" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    <div className="text-left">
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 sticky top-16 z-30 bg-white/80 backdrop-blur-lg border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* Category filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </motion.button>
                ))}
              </div>

              <div className="hidden md:block w-px h-8 bg-gray-300" />

              {/* Location filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {locations.map((loc) => (
                  <motion.button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLocation === loc.id
                      ? "bg-gradient-to-r from-teal-400 to-emerald-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <loc.icon className="w-4 h-4" />
                    {loc.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Roadmap */}
        <section className="py-16 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Central timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-teal-300 via-rose-300 to-orange-300 rounded-full hidden md:block" />

            {filteredTimeline.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500">No events found for this filter.</p>
                <Button
                  onClick={() => { setSelectedCategory("all"); setSelectedLocation("all"); }}
                  className="mt-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full"
                >
                  Show All Events
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-12">
                {filteredTimeline.map((yearData, yearIdx) => (
                  <motion.div
                    key={yearData.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: yearIdx * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {/* Year marker */}
                    <div className="flex items-center justify-center mb-8">
                      <motion.button
                        onClick={() => toggleYear(yearData.year)}
                        className={`flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${yearData.color} text-white rounded-full shadow-lg font-bold text-xl relative z-10`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Calendar className="w-6 h-6" />
                        {yearData.year}
                        {expandedYears.includes(yearData.year) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>

                    {/* Events for this year */}
                    <AnimatePresence>
                      {expandedYears.includes(yearData.year) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-8"
                        >
                          {yearData.events.map((event, eventIdx) => (
                            <motion.div
                              key={event.title}
                              className={`flex flex-col ${eventIdx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                              initial={{ opacity: 0, x: eventIdx % 2 === 0 ? -50 : 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: eventIdx * 0.1 }}
                              viewport={{ once: true }}
                            >
                              {/* Event card */}
                              <div className="flex-1 w-full">
                                <Card className={`p-6 ${yearData.bgColor} border-2 ${yearData.borderColor} rounded-3xl shadow-lg hover:shadow-xl transition-all overflow-hidden relative`}>
                                  {/* Decorative corner */}
                                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${yearData.color} opacity-20 rounded-bl-full`} />

                                  {/* Header */}
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-3 py-1 bg-gradient-to-r ${yearData.color} text-white text-xs font-semibold rounded-full`}>
                                          {event.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                                          <MapPin className="w-3 h-3" />
                                          {event.location}
                                        </span>
                                      </div>
                                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">{event.title}</h3>
                                    </div>
                                    <Trophy className={`w-8 h-8 text-gray-300`} />
                                  </div>

                                  <p className="text-gray-600 mb-4">{event.description}</p>

                                  {/* Image grid */}
                                  <div className={`grid gap-3 ${event.images.length === 1 ? "grid-cols-1" : event.images.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
                                    {event.images.map((img, imgIdx) => (
                                      <motion.div
                                        key={imgIdx}
                                        className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedImage(img)}
                                      >
                                        <Image
                                          src={img.src || "/placeholder.svg"}
                                          alt={img.alt}
                                          fill
                                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                      </motion.div>
                                    ))}

                                    {/* Placeholder for admin to add more images */}

                                  </div>
                                </Card>
                              </div>

                              {/* Timeline connector dot (desktop only) */}
                              <div className="hidden md:block">
                                <motion.div
                                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${yearData.color} shadow-lg border-4 border-white`}
                                  whileHover={{ scale: 1.3 }}
                                />
                              </div>

                              {/* Spacer for alternating layout */}
                              <div className="flex-1 hidden md:block" />
                            </motion.div>
                          ))}

                          {/* Add new event placeholder for this year */}

                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Add new year section */}

              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <Star className="absolute top-20 right-1/4 w-12 h-12 text-white/20" />
            <Sparkles className="absolute bottom-20 left-1/4 w-10 h-10 text-white/20" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Be Part of Our Story!
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of happy students and become the next star in our gallery.
                Your success story is waiting to be written!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="px-8 py-6 bg-white text-orange-500 hover:bg-gray-100 rounded-full text-lg font-semibold shadow-xl">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Enroll Now
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full text-lg font-semibold">
                    <Camera className="w-5 h-5 mr-2" />
                    Share Your Moment
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="object-contain w-full h-auto max-h-[80vh] rounded-2xl"
              />
              <p className="text-white text-center mt-4 text-lg">{selectedImage.alt}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white text-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}
