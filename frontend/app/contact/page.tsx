"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { useToast } from "@/components/ui/use-toast"
import { API_URL } from "@/lib/utils"

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

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactMethods = [
    { icon: Phone, label: "Call Us", value: "+44 20 7183 8000", href: "tel:+442071838000", color: "bg-teal-500" },
    { icon: Mail, label: "Email Us", value: "info@homacuk.com", href: "mailto:info@homacuk.com", color: "bg-rose-500" },
    { icon: MapPin, label: "Visit Us", value: "London, United Kingdom", href: "#", color: "bg-amber-500" },
  ]

  const faqs = [
    {
      q: "What is the minimum age to start?",
      a: "We recommend starting from 4 years old, but assessments can be done for younger children.",
    },
    {
      q: "How long does each course take?",
      a: "Course duration varies from 6-10 months depending on the level and frequency of classes.",
    },
    {
      q: "Do you offer online classes?",
      a: "Yes, we offer hybrid options. Contact us for more details about our online programs.",
    },
    {
      q: "What is the refund policy?",
      a: "Please contact our support team for detailed information about our refund and cancellation policy.",
    },
  ]

  return (
    <>
      <Navbar />

      <div className="pt-20">
        <section className="py-20 bg-white relative overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 text-rose-200"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
          >
            <DoodleStar className="w-16 h-16" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 text-brown">
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Touch</span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon
                return (
                  <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.1 }} whileHover={{ y: -5 }}>
                    <a href={method.href}>
                      <Card className="p-8 text-center rounded-3xl border-2 hover:shadow-xl transition-all h-full group">
                        <motion.div
                          className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={28} />
                        </motion.div>
                        <h3 className="font-bold text-lg mb-2 text-brown">{method.label}</h3>
                        <p className="text-muted-foreground group-hover:text-primary transition-colors">
                          {method.value}
                        </p>
                      </Card>
                    </a>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Card className="p-8 rounded-3xl border-2 border-amber-200 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brown">Send us a Message</h2>
                    <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsSubmitting(true)
                    const formData = new FormData(e.currentTarget)
                    const data = {
                      firstName: formData.get('firstName'),
                      lastName: formData.get('lastName'),
                      email: formData.get('email'),
                      phone: formData.get('phone'),
                      enquiryType: formData.get('enquiryType'),
                      message: formData.get('message'),
                      source: "website",
                      status: "new"
                    }

                    try {
                      const res = await fetch(`${API_URL}/enquiries`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                      })

                      if (res.ok) {
                        toast({
                          title: "Message sent!",
                          description: "We'll get back to you shortly.",
                          variant: "default",
                          className: "bg-green-500 text-white"
                        })
                          // Reset form
                          ; (e.target as HTMLFormElement).reset()
                      } else {
                        toast({
                          title: "Error",
                          description: "Failed to send message. Please try again.",
                          variant: "destructive"
                        })
                      }
                    } catch (error) {
                      console.error(error)
                      toast({
                        title: "Error",
                        description: "An unexpected error occurred.",
                        variant: "destructive"
                      })
                    } finally {
                      setIsSubmitting(false)
                    }
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input name="firstName" placeholder="First Name" className="rounded-xl border-2 py-6" required />
                    <Input name="lastName" placeholder="Last Name" className="rounded-xl border-2 py-6" required />
                  </div>
                  <Input name="email" placeholder="Email Address" type="email" className="rounded-xl border-2 py-6" required />
                  <Input name="phone" placeholder="Phone Number (Optional)" className="rounded-xl border-2 py-6" />
                  <select
                    name="enquiryType"
                    className="w-full px-4 py-4 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Enquiry Type</option>
                    <option value="course">Course Information</option>
                    <option value="franchise">Franchise Opportunity</option>
                    <option value="support">Support</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={5}
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl py-6 font-bold shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={18} className="ml-2" />
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HelpCircle size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-brown">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <motion.div key={idx} {...fadeInUp} transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.02 }}>
                  <Card className="p-6 rounded-2xl border-2 hover:border-teal-300 transition-all">
                    <h3 className="font-bold text-brown mb-2">{item.q}</h3>
                    <p className="text-muted-foreground">{item.a}</p>
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
