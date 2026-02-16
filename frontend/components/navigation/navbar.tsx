"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading } = useAuth()
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "11+", href: "/11-plus" },
    { label: "Gallery", href: "/gallery" },
    { label: "Abacus", href: "/abacus" },
    { label: "Franchise", href: "/franchise" },
    { label: "Contact", href: "/contact" },
    { label: "Denmark", href: "/denmark" },
    {label: "Upcoming events", href: "/upcoming-events"},
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Colorful top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              H
            </motion.div>
            <span className="text-xl font-bold">
              <span className="text-gray-800">Homac</span>{" "}
              <span className="text-orange-500">UK</span>
            </span>
          </Link>

          {/* Desktop Navigation - Centered pill container */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm px-2 py-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Admin Button */}
            <Link href="/admin/login">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="text-sm px-5 bg-slate-700 hover:bg-slate-800 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all">
                  Admin
                </Button>
              </motion.div>
            </Link>

            {!isLoading && (
              <>
                {user ? (
                  <Link href="/dashboard">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="text-sm px-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                        Dashboard
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <span className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                        Sign In
                      </span>
                    </Link>
                    <Link href="/signup">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="text-sm px-6 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                          Get Started
                        </Button>
                      </motion.div>
                    </Link>
                  </>
                )}
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden pb-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-2 flex flex-col px-2">
                <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-medium shadow-md">
                    Admin Portal
                  </Button>
                </Link>
                
                {!isLoading && (
                  <>
                    {user ? (
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-semibold shadow-md">
                          Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full rounded-xl font-medium bg-transparent">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-semibold shadow-md">
                            Get Started
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
