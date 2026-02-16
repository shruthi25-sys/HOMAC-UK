"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Brain,
  BookOpen,
  Trophy,
  Clock,
  ArrowRight,
  LogOut,
  Sparkles,
  Target,
  TrendingUp,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-context"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, signOut } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName = user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : "User"

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  const quickActions = [
    {
      title: "Daily Test",
      description: "Complete today's practice",
      icon: Target,
      href: "/daily-test",
      color: "bg-teal-500",
    },
    {
      title: "Study Materials",
      description: "Continue learning",
      icon: BookOpen,
      href: "/study-materials",
      color: "bg-amber-500",
    },
    {
      title: "Online Test",
      description: "Take an assessment",
      icon: Brain,
      href: "/online-test",
      color: "bg-rose-500",
    },
    {
      title: "View Courses",
      description: "Explore all courses",
      icon: Sparkles,
      href: "/courses",
      color: "bg-sky-500",
    },
  ]

  const stats = [
    { label: "Tests Completed", value: "24", icon: Trophy, trend: "+3 this week" },
    { label: "Practice Hours", value: "18h", icon: Clock, trend: "+2h this week" },
    { label: "Accuracy Rate", value: "94%", icon: TrendingUp, trend: "+5% improvement" },
    { label: "Current Streak", value: "7 days", icon: Calendar, trend: "Keep it up!" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-border">
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                H
              </div>
              <span className="text-lg font-bold text-brown">Homac UK</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-sm font-medium">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-foreground">{displayName}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="rounded-xl border-border hover:bg-muted bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-primary">{displayName.split(" ")[0]}</span>!
          </h1>
          <p className="text-muted-foreground">Ready to continue your mental arithmetic journey?</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-teal-600 mt-1">{stat.trend}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div
                  className="p-5 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all group cursor-pointer h-full"
                  whileHover={{ y: -4 }}
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                  <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Go <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            <div className="p-6 text-center text-muted-foreground">
              <Brain className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p>Start practicing to see your activity here!</p>
              <Link href="/daily-test">
                <Button className="mt-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600">
                  Start Daily Test
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
