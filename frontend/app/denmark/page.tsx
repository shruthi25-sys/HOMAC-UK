"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Globe, 
  BookOpen, 
  Heart, 
  Target, 
  Star, 
  Users, 
  Award, 
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  GraduationCap,
  Trophy,
  Coffee,
  Flag
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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

export default function DenmarkPage() {
  const values = [
    {
      icon: Heart,
      title: "Børnecentreret",
      description: "Hvert barns læringsrejse er unik. Vi tilpasser vores tilgang til individuelle behov.",
      color: "bg-rose-500",
    },
    {
      icon: BookOpen,
      title: "Evidensbaseret",
      description: "Vores metoder er understøttet af forskning og testet med tusindvis af studerende verden over.",
      color: "bg-teal-500",
    },
    {
      icon: Globe,
      title: "Global Excellence",
      description: "Med tilstedeværelse i 20+ lande bringer vi undervisning i verdensklasse til dit nærområde.",
      color: "bg-amber-500",
    },
    {
      icon: Target,
      title: "Resultatorienteret",
      description: "92% af vores studerende viser målelig forbedring i matematisk selvtillid.",
      color: "bg-sky-500",
    },
  ]

  const teamMembers = [
    {
      name: "Lars Nielsen",
      role: "Landdirektør, Danmark",
      bio: "Med over 15 års erfaring i uddannelsessektoren leder Lars vores ekspansion i Danmark.",
      color: "bg-amber-500",
    },
    {
      name: "Mette Hansen",
      role: "Uddannelseschef",
      bio: "Mette sikrer, at vores pædagogiske metoder lever op til danske standarder og værdier.",
      color: "bg-teal-500",
    },
    {
      name: "Søren Jørgensen",
      role: "Kundekonsulent",
      bio: "Søren hjælper forældre og skoler med at finde de bedste løsninger til deres børn.",
      color: "bg-rose-500",
    },
  ]

  const courses = [
    {
      title: "Kugleramme for begyndere",
      age: "5-7 år",
      description: "Introduktion til kuglerammen gennem sjove aktiviteter og lege.",
      icon: Star,
      color: "bg-amber-500",
    },
    {
      title: "Mental aritmetik - niveau 1",
      age: "7-9 år",
      description: "Udvikling af mentale regnestrategier og koncentration.",
      icon: Trophy,
      color: "bg-teal-500",
    },
    {
      title: "Mental aritmetik - niveau 2",
      age: "9-11 år",
      description: "Avancerede teknikker til hurtig hovedregning.",
      icon: Target,
      color: "bg-rose-500",
    },
    {
      title: "11+ forberedelse",
      age: "10-11 år",
      description: "Intensiv forberedelse til optagelsesprøver på gymnasier.",
      icon: GraduationCap,
      color: "bg-sky-500",
    },
  ]

  const stats = [
    { number: "500+", label: "Studerende i Danmark", icon: Users, color: "bg-amber-500" },
    { number: "8", label: "Lokationer", icon: MapPin, color: "bg-teal-500" },
    { number: "15", label: "Erfarne instruktører", icon: Award, color: "bg-rose-500" },
    { number: "94%", label: "Tilfredse forældre", icon: Heart, color: "bg-sky-500" },
  ]

  const upcomingEvents = [
    {
      title: "Åbent hus - København",
      date: "15. marts 2026",
      time: "10:00 - 12:30",
      location: "HOMAC København Center",
      color: "bg-amber-500",
    },
    {
      title: "Forældreorientering (online)",
      date: "22. marts 2026",
      time: "19:00 - 20:30",
      location: "Online (Zoom)",
      color: "bg-teal-500",
    },
    {
      title: "Kugleramme-workshop",
      date: "5. april 2026",
      time: "11:00 - 13:00",
      location: "HOMAC Aarhus",
      color: "bg-rose-500",
    },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        {/* Hero Section with Denmark theme */}
        <section className="min-h-[70vh] flex items-center relative overflow-hidden py-20 bg-gradient-to-br from-red-50 via-white to-white">
          {/* Animated decorations */}
          <motion.div
            className="absolute top-32 left-10 text-red-300"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <DoodleStar className="w-12 h-12" />
          </motion.div>
          <motion.div
            className="absolute top-48 right-20 text-red-300"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <DoodleCircle className="w-16 h-16" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-1/4 text-amber-300"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>

          {/* Danish flag colors decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 opacity-10 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500 opacity-10 rounded-tl-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-4">
                <Flag className="w-8 h-8 text-red-500" />
                <span className="text-lg font-semibold text-red-500">HOMAC Danmark</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-brown">
                Velkommen til{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                    Danmark
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                Siden 2023 har vi bragt vores gennemprøvede kugleramme- og mentalregningsmetoder til Danmark, 
                og hjælper danske børn med at udvikle fremragende matematiske evner.
              </p>
            </motion.div>
          </div>
        </section>

        {/* DEDICATED IMAGE SECTION - Single image with Danish theme */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Danish flag overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent z-10" />
              
              {/* Main Image - Using a placeholder div. Replace with actual image */}
              <div className="relative h-[500px] w-full bg-gradient-to-r from-amber-100 to-red-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* This is where your actual image would go */}
                    {/* <Image src="/images/denmark-center.jpg" alt="HOMAC Denmark Center" fill className="object-cover" /> */}
                    
                    {/* Placeholder with Denmark theme */}
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center">
                        <Flag className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-700 mb-2">HOMAC København</h3>
                      <p className="text-xl text-gray-500">Vores flagskibscenter i Danmark</p>
                      
                      {/* Decorative Danish flags */}
                      <div className="flex justify-center gap-4 mt-8">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                            className="w-12 h-8 bg-red-500 relative"
                          >
                            <div className="absolute left-1/2 top-0 w-4 h-full bg-white transform -translate-x-1/2" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image caption */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-white z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-2">HOMAC København Læringscenter</h3>
                <p className="text-lg text-white/90">Åbnede i 2023 - nu med over 200 glade studerende</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
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

        {/* About Denmark Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-16 text-brown">
              Om HOMAC{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Danmark
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  HOMAC ankom til Danmark i 2023 med en mission om at revolutionere, hvordan danske børn 
                  lærer matematik. Vores gennemprøvede kugleramme-metoder har allerede hjulpet hundredvis 
                  af børn i København, Aarhus og Odense med at udvikle exceptionelle regnefærdigheder.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Vi samarbejder tæt med danske skoler og uddannelsesinstitutioner for at sikre, at vores 
                  metoder supplerer det danske undervisningssystem og støtter børns matematiske udvikling.
                </p>
                <div className="flex gap-4">
                  <Badge className="bg-red-100 text-red-700 px-4 py-2">København</Badge>
                  <Badge className="bg-red-100 text-red-700 px-4 py-2">Aarhus</Badge>
                  <Badge className="bg-red-100 text-red-700 px-4 py-2">Odense</Badge>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-6 rounded-2xl">
                  <div className="text-4xl mb-2">🇩🇰</div>
                  <h3 className="font-bold text-brown">8</h3>
                  <p className="text-sm text-muted-foreground">Lokationer</p>
                </div>
                <div className="bg-teal-50 p-6 rounded-2xl">
                  <div className="text-4xl mb-2">🎓</div>
                  <h3 className="font-bold text-brown">500+</h3>
                  <p className="text-sm text-muted-foreground">Studerende</p>
                </div>
                <div className="bg-rose-50 p-6 rounded-2xl">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="font-bold text-brown">15</h3>
                  <p className="text-sm text-muted-foreground">Instruktører</p>
                </div>
                <div className="bg-sky-50 p-6 rounded-2xl">
                  <div className="text-4xl mb-2">📚</div>
                  <h3 className="font-bold text-brown">4</h3>
                  <p className="text-sm text-muted-foreground">Kurser</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-16 text-brown">
              Vores{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Værdier
              </span>
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

        {/* Courses Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-4 text-brown">
              Vores{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Kurser
              </span>
            </motion.h2>
            <motion.p {...fadeInUp} className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Tilpasset til danske børns behov og læringsstil
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, idx) => {
                const Icon = course.icon
                return (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="p-6 h-full rounded-3xl border-2 hover:shadow-xl transition-all">
                      <div className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-1 text-brown">{course.title}</h3>
                      <p className="text-sm text-amber-600 font-medium mb-3">{course.age}</p>
                      <p className="text-muted-foreground text-sm">{course.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-4 text-brown">
              Mød vores{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Team i Danmark
              </span>
            </motion.h2>
            <motion.p {...fadeInUp} className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Erfarne undervisere dedikeret til at støtte dit barns læringsrejse
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="p-6 text-center rounded-3xl border-2 hover:shadow-xl">
                    <div className={`w-20 h-20 ${member.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-lg text-brown">{member.name}</h3>
                    <p className="text-sm text-amber-600 mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center mb-4 text-brown">
              Kommende{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Begivenheder
              </span>
            </motion.h2>
            <motion.p {...fadeInUp} className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Deltag i vores arrangementer i Danmark
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 rounded-3xl border-2 hover:shadow-lg">
                    <div className={`w-12 h-12 ${event.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                      <Calendar size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-brown mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} className="text-amber-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} className="text-amber-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-amber-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
                      Læs mere
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl font-bold mb-4">Kontakt os i Danmark</h2>
                <p className="text-xl text-white/90 mb-8">
                  Har du spørgsmål om vores kurser? Kontakt vores danske team i dag.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>+45 71 23 45 67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <span>danmark@homac.uk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>Vesterbrogade 123, 1620 København</span>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
                <Card className="p-8 bg-white/10 backdrop-blur border-white/20">
                  <h3 className="text-2xl font-bold mb-4">Send os en besked</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Dit navn"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                    />
                    <input
                      type="email"
                      placeholder="Din email"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                    />
                    <textarea
                      placeholder="Din besked"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                    />
                    <Button className="w-full bg-white text-red-600 hover:bg-gray-100 rounded-full py-3">
                      Send besked
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}