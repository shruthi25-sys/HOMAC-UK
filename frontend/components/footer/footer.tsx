"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

const DoodleStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-orange-50 border-t border-amber-200 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-10 text-amber-200"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
      >
        <DoodleStar className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-10 text-rose-200"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
      >
        <DoodleStar className="w-12 h-12" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                H
              </div>
              <h3 className="font-bold text-xl text-brown">Homac UK</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Transforming young minds through premium abacus and mental arithmetic education since 2006.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg flex items-center justify-center text-brown/60 hover:text-primary hover:bg-amber-50 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-brown mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Courses", href: "/courses" },
                { label: "Franchise", href: "/franchise" },
              ].map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-brown mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Gallery", href: "/gallery" },
                { label: "Study Materials", href: "/study-materials" },
                { label: "Daily Test", href: "/daily-test" },
              ].map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-brown mb-4">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-teal-600" />
                </div>
                <a href="tel:+442071838000" className="text-muted-foreground hover:text-primary transition-colors">
                  +442035834124
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-rose-600" />
                </div>
                <a
                  href="mailto:info@homacuk.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  homacuk@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-amber-600" />
                </div>
                <span className="text-muted-foreground">London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>&copy; 2026 Homac UK. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> for young learners worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
