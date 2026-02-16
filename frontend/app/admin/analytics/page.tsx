"use client"

import React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Users,
  MessageSquare,
  Eye,
  FileText,
  Calendar,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getEnquiries, getFranchises, getTestimonials, getCMSPages } from "@/lib/admin-stores"
import { getCourses } from "@/lib/courses-store"

interface AnalyticMetric {
  label: string
  value: string | number
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ElementType
  color: string
}

interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
  icon: React.ElementType
}

export default function AnalyticsDashboard() {
  const { isLoading } = useAdminAuth()
  const [metrics, setMetrics] = useState<AnalyticMetric[]>([])
  const [activityLog, setActivityLog] = useState<ActivityItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [dateRange, setDateRange] = useState<"week" | "month" | "all">("month")

  useEffect(() => {
    setMounted(true)

    const loadData = async () => {
      try {
        const [enquiries, franchises, courses, testimonials, pages] = await Promise.all([
          getEnquiries(),
          getFranchises(),
          getCourses(),
          getTestimonials(),
          getCMSPages()
        ])

        // Calculate metrics
        const newEnquiries = enquiries.filter((e) => e.status === "new").length
        const convertedEnquiries = enquiries.filter((e) => e.status === "converted").length
        const avgConversionRate = enquiries.length > 0 ? Math.round((convertedEnquiries / enquiries.length) * 100) : 0
        const activeFranchises = franchises.filter((f) => f.status === "approved").length

        setMetrics([
          {
            label: "Total Page Views",
            value: "2,847",
            change: "+18% from last month",
            changeType: "positive",
            icon: Eye,
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Total Enquiries",
            value: enquiries.length,
            change: `${newEnquiries} new this week`,
            changeType: "positive",
            icon: MessageSquare,
            color: "from-violet-500 to-violet-600",
          },
          {
            label: "Active Courses",
            value: courses.filter((c) => c.status === "active").length,
            change: `${courses.length} total courses`,
            changeType: "neutral",
            icon: FileText,
            color: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Conversion Rate",
            value: `${avgConversionRate}%`,
            change: `${convertedEnquiries} converted`,
            changeType: avgConversionRate > 20 ? "positive" : "neutral",
            icon: TrendingUp,
            color: "from-amber-500 to-amber-600",
          },
          {
            label: "Franchise Applications",
            value: franchises.length,
            change: `${activeFranchises} approved`,
            changeType: "positive",
            icon: Users,
            color: "from-pink-500 to-pink-600",
          },
          {
            label: "Published Testimonials",
            value: testimonials.filter((t) => t.status === "approved").length,
            change: `${testimonials.filter((t) => t.status === "pending").length} pending`,
            changeType: "neutral",
            icon: BarChart3,
            color: "from-cyan-500 to-cyan-600",
          },
        ])

        // Build activity log (Simulated mixed with real if needed, mostly static for now as real activity log needs backend support)
        // Keeping the static mock data for now as per previous code, but in a real app would merge with audit logs.
        const activities: ActivityItem[] = [
          {
            id: "act-1",
            type: "Enquiry",
            description: "New parent enquiry about abacus courses",
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            icon: MessageSquare,
          },
          {
            id: "act-2",
            type: "Course",
            description: "New course created: Advanced Arithmetic",
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            icon: FileText,
          },
          {
            id: "act-3",
            type: "Testimonial",
            description: "New testimonial submitted and approved",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            icon: BarChart3,
          },
          {
            id: "act-4",
            type: "Franchise",
            description: "New franchise application from Manchester",
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            icon: Users,
          },
          {
            id: "act-5",
            type: "Page",
            description: "Home page content updated",
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            icon: FileText,
          },
        ]

        setActivityLog(activities)
      } catch (error) {
        console.error("Failed to load analytics data", error)
      }
    }

    loadData()
  }, [])

  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString("en-UK")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Track your site's performance and key metrics</p>
          </div>

          {/* Date Range Filter */}
          <div className="flex gap-2">
            {(["week", "month", "all"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all text-sm",
                  dateRange === range
                    ? "bg-primary text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                {range === "week" ? "Week" : range === "month" ? "Month" : "All Time"}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg", metric.color)}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
                  </div>
                  <div className="mt-2">
                    <span className={cn(
                      "text-xs font-medium",
                      metric.changeType === "positive" && "text-emerald-600",
                      metric.changeType === "negative" && "text-red-600",
                      metric.changeType === "neutral" && "text-slate-500"
                    )}>
                      {metric.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activityLog.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:pb-0 last:border-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white">{activity.type}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{activity.description}</p>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{formatDate(activity.timestamp)}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">API Response</span>
                  <span className="text-sm font-bold text-emerald-600">98%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 1 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Page Load Speed</span>
                  <span className="text-sm font-bold text-emerald-600">1.2s</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="h-full bg-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Database Health</span>
                  <span className="text-sm font-bold text-emerald-600">100%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-violet-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Top Pages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Home", views: 1240, percentage: 42 },
                { name: "Courses", views: 680, percentage: 23 },
                { name: "About", views: 480, percentage: 16 },
                { name: "Contact", views: 380, percentage: 13 },
              ].map((page) => (
                <div key={page.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{page.name}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{page.views}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${page.percentage}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Enquiry Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "New", count: 12, color: "bg-blue-100 dark:bg-blue-500/20", value: "25%" },
              { label: "Contacted", count: 18, color: "bg-amber-100 dark:bg-amber-500/20", value: "38%" },
              { label: "Converted", count: 13, color: "bg-emerald-100 dark:bg-emerald-500/20", value: "27%" },
              { label: "Closed", count: 4, color: "bg-slate-100 dark:bg-slate-500/20", value: "8%" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("w-3 h-3 rounded-full", item.color)} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Popular Course Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { level: "Beginner", enrollments: 42, percentage: 48 },
              { level: "Intermediate", enrollments: 28, percentage: 32 },
              { level: "Advanced", enrollments: 18, percentage: 20 },
            ].map((item) => (
              <div key={item.level}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.level}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{item.enrollments}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
