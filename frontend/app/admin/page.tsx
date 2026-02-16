"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Building2,
  TrendingUp,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  BookOpen,
  Star,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { cn } from "@/lib/utils"
// Import Stores
import { getEnquiries, getFranchises, type Enquiry } from "@/lib/admin-stores"
import { getCourses } from "@/lib/courses-store"

// ... (keep quickActions and statusConfig outside if static, or inside)
const quickActions = [
  { label: "View Enquiries", href: "/admin/enquiries", icon: MessageSquare },

  { label: "Edit Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
]

const statusConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", icon: AlertCircle },
  contacted: { label: "Contacted", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", icon: Clock },
  converted: { label: "Converted", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", icon: CheckCircle2 },
  in_progress: { label: "In Progress", color: "bg-purple-100 text-purple-700", icon: TrendingUp },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-700", icon: CheckCircle2 },
}

export default function AdminDashboard() {
  const { session, isLoading: authLoading } = useAdminAuth()
  const [mounted, setMounted] = useState(false)
  const [dashboardStats, setStats] = useState([
    {
      label: "Total Enquiries",
      value: "0",
      change: "Loading...",
      changeType: "neutral" as const,
      icon: MessageSquare,
      href: "/admin/enquiries",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Franchise Applications",
      value: "0",
      change: "Loading...",
      changeType: "neutral" as const,
      icon: Building2,
      href: "/admin/franchises",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Active Courses",
      value: "0",
      change: "Loading...",
      changeType: "neutral" as const,
      icon: BookOpen,
      href: "/admin/courses",
      color: "from-violet-500 to-violet-600",
    }
  ])
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    setMounted(true)
    const loadData = async () => {
      try {
        const [enquiries, franchises, courses] = await Promise.all([
          getEnquiries(),
          getFranchises(),
          getCourses()
        ])

        setRecentEnquiries(enquiries.slice(0, 5))

        setStats([
          {
            label: "Total Enquiries",
            value: enquiries.length.toString(),
            change: "Updated just now", // Could calculate vs last week if I had dates easily
            changeType: "neutral",
            icon: MessageSquare,
            href: "/admin/enquiries",
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Franchise Applications",
            value: franchises.length.toString(),
            change: "Updated just now",
            changeType: "neutral",
            icon: Building2,
            href: "/admin/franchises",
            color: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Active Courses",
            value: courses.length.toString(),
            change: `${courses.filter(c => c.status === 'active').length} active`,
            changeType: "positive",
            icon: BookOpen,
            href: "/admin/courses",
            color: "from-violet-500 to-violet-600",
          }
        ])

      } catch (error) {
        console.error("Failed to load dashboard data", error)
      } finally {
        setIsLoadingData(false)
      }
    }
    if (session) {
      loadData()
    }
  }, [session])

  if (authLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {/* Handle missing name gracefully */}
                  Welcome back, {session?.user.name ? session.user.name.split(" ")[0] : 'Admin'}!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Here's what's happening with your site today.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Role: <span className="font-medium capitalize text-primary">{session?.user.role}</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <Card className="hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg", stat.color)}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                    </div>
                    <div className="mt-2">
                      <span className={cn(
                        "text-xs font-medium",
                        stat.changeType === "positive" ? "text-emerald-600" : "text-slate-500"
                      )}>
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Recent Enquiries</CardTitle>
              <Link href="/admin/enquiries">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((enquiry) => {
                    const status = statusConfig[enquiry.status as keyof typeof statusConfig] || statusConfig.new
                    const StatusIcon = status.icon
                    return (
                      <div key={enquiry.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-slate-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white truncate">
                              {enquiry.firstName} {enquiry.lastName}
                            </p>
                            <p className="text-sm text-slate-500 truncate">{enquiry.enquiryType || 'General'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", status.color)}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                          <span className="text-xs text-slate-400 hidden sm:block">
                            {new Date(enquiry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="py-4 text-center text-slate-500">No enquiries found.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link key={action.href} href={action.href}>
                      <button
                        type="button"
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{action.label}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">API Status</span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Database</span>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Last Backup</span>
                  <span className="text-sm text-slate-500">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Role-based Notice */}
      {session?.user.role === "editor" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-400">Editor Access</p>
                <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                  You have editor permissions. Some administrative features like audit logs, settings, and user management are restricted to administrators.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
