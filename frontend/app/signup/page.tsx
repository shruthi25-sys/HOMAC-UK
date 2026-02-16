"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Star, Trophy, Users, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/auth"
import { useAuth } from "@/components/auth/auth-context"

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 rounded-full bg-teal-200/40"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 left-20 w-16 h-16 rounded-full bg-amber-200/40"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 right-1/4 w-12 h-12 rounded-full bg-rose-200/50"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full bg-orange-200/30"
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Stars */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-teal-400"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/3 text-amber-400"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>
    </div>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const passwordStrength = () => {
    if (password.length === 0) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-amber-400", "bg-teal-400"]
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (!agreedToTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)
    const result = await signUp(firstName, lastName, email, password)

    if (result.success) {
      refreshUser()
      router.push("/dashboard")
    } else {
      setError(result.error || "Registration failed")
    }
    setIsLoading(false)
  }

  const benefits = [
    { text: "Personalized learning paths", icon: Star, color: "text-amber-500 bg-amber-100" },
    { text: "Track your progress", icon: Trophy, color: "text-teal-500 bg-teal-100" },
    { text: "Join our community", icon: Users, color: "text-rose-500 bg-rose-100" },
    { text: "Expert guidance", icon: Heart, color: "text-orange-500 bg-orange-100" },
  ]

  return (
    <div className="min-h-screen flex relative bg-white overflow-hidden">
      <FloatingShapes />

      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                H
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-500 text-sm">Start your learning journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-500" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 rounded-xl bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-500" />
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 rounded-xl bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${i < passwordStrength() ? strengthColors[passwordStrength() - 1] : "bg-gray-200"
                            }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Strength:{" "}
                      <span className={`font-medium ${passwordStrength() > 0 ? "text-gray-700" : ""}`}>
                        {strengthLabels[passwordStrength() - 1] || "Too short"}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 rounded-xl bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400/20"
                  required
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded bg-gray-50 border-gray-300 text-amber-500 focus:ring-amber-500/20"
                />
                <span className="text-sm">
                  I accept the{" "}
                  <Link href="/terms" className="text-amber-600 hover:text-amber-700 font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-amber-600 hover:text-amber-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold text-lg shadow-lg shadow-orange-500/25 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
                Sign In
              </Link>
            </p>

            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Back to Homepage
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Welcome Display */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          {/* Logo */}
          <motion.div
            className="w-32 h-32 mx-auto mb-8 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 blur-xl" />
            <div className="relative w-full h-full rounded-3xl bg-white shadow-xl border border-amber-100 flex items-center justify-center overflow-hidden">
              <span className="text-6xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                H
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Join{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Homac UK
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 mb-10 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Unlock your child&apos;s potential with our proven abacus and mental arithmetic programs
          </motion.p>

          <div className="space-y-4 text-left max-w-sm mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/70 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ x: 5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${benefit.color} flex items-center justify-center flex-shrink-0`}
                >
                  <benefit.icon className="w-5 h-5" />
                </div>
                <span className="text-gray-700 text-sm font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Decorative image */}
          <motion.div
            className="mt-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="w-64 h-48 mx-auto rounded-2xl overflow-hidden">
              <img
                src="/happy-confident-children-smiling.jpg"
                alt="Happy children learning"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
