"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function FloatingButtons() {
  // Replace with your actual WhatsApp number (including country code, no + or spaces)
  const whatsappNumber = "447123456789"
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in learning more about Homac UK courses.")
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Contact Button */}
      <Link href="/contact">
        <motion.div
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl cursor-pointer"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold text-sm">Contact Us</span>
        </motion.div>
      </Link>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl cursor-pointer"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp Logo SVG */}
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.158-1.962C9.752 30.996 12.77 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.334 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.672-1.22-4.762-1.974-7.826-6.81-8.064-7.126-.228-.316-1.916-2.55-1.916-4.864 0-2.314 1.214-3.45 1.644-3.922.39-.428 1.024-.624 1.63-.624.196 0 .372.01.53.018.468.02.702.048 1.012.784.386.918 1.326 3.232 1.442 3.468.118.236.236.556.076.872-.15.326-.282.472-.518.74-.236.268-.46.474-.696.762-.216.254-.458.526-.196.994.262.458 1.166 1.922 2.504 3.114 1.72 1.532 3.168 2.01 3.616 2.228.348.17.762.13.992-.13.294-.334.658-.886 1.028-1.43.264-.386.596-.434.976-.294.386.13 2.446 1.152 2.866 1.362.42.208.7.316.802.486.1.17.1.986-.29 2.086z" />
        </svg>
      </motion.a>
    </div>
  )
}
