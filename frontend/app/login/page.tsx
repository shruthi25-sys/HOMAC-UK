"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, BookOpen, Calculator, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth"
import { useAuth } from "@/components/auth/auth-context"

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-amber-200/40"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 rounded-full bg-teal-200/40"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-12 h-12 rounded-full bg-orange-200/50"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-rose-200/30"
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Stars */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-amber-400"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/3 text-teal-400"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await signIn(email, password)

    if (result.success) {
      refreshUser()
      router.push("/dashboard")
    } else {
      setError(result.error || "Login failed")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex relative bg-white overflow-hidden">
      <FloatingShapes />

      {/* Left Panel - Welcome Display */}
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
            Welcome Back to{" "}
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
            Continue your journey to mathematical excellence with our fun and engaging learning programs
          </motion.p>

          <div className="flex justify-center gap-6">
            {[
              { icon: BookOpen, label: "Learn", color: "bg-amber-100 text-amber-600", delay: 0.5 },
              { icon: Calculator, label: "Practice", color: "bg-teal-100 text-teal-600", delay: 0.6 },
              { icon: Award, label: "Achieve", color: "bg-rose-100 text-rose-600", delay: 0.7 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-md`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  <item.icon className="w-7 h-7" />
                </motion.div>
                <span className="text-sm text-gray-600 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Decorative image placeholder */}
          <motion.div
            className="mt-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-64 h-48 mx-auto rounded-2xl bg-gradient-to-br from-amber-200/50 to-orange-200/50 flex items-center justify-center">
              <img
                src="/children-learning-with-abacus.jpg"
                alt="Children learning"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 30 }}
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

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
              <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

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
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-800">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-gray-50 border-gray-300 text-amber-500 focus:ring-amber-500/20"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>

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
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-700 font-medium mb-2">Demo Credentials</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <code className="px-2 py-1 rounded bg-white text-amber-700 border border-amber-200">
                  test@homac.com
                </code>
                <code className="px-2 py-1 rounded bg-white text-amber-700 border border-amber-200">
                  test123
                </code>
              </div>
            </div>

            <p className="mt-6 text-center text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
                Sign Up
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
    </div>
  )
}
