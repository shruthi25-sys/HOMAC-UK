"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, AlertTriangle, Clock, User, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getAuditEvents, type AuditEvent } from "@/lib/admin-auth"
import { cn } from "@/lib/utils"

// Admin-only page with role protection
export default function AuditLogsPage() {
  const { hasRole, isLoading } = useAdminAuth()
  const router = useRouter()
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([])

  // Redirect non-admins
  useEffect(() => {
    if (!isLoading && !hasRole("admin")) {
      router.push("/admin")
    }
  }, [isLoading, hasRole, router])

  // Load audit events
  useEffect(() => {
    if (hasRole("admin")) {
      setAuditEvents(getAuditEvents())
    }
  }, [hasRole])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show access denied for non-admins
  if (!hasRole("admin")) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="max-w-md w-full border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400 mb-2">
              Access Restricted
            </h3>
            <p className="text-amber-700 dark:text-amber-500">
              Audit logs are restricted to administrators only.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getActionColor = (action: string) => {
    if (action.includes("login_success")) return "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20"
    if (action.includes("login_failed")) return "text-red-600 bg-red-100 dark:bg-red-500/20"
    if (action.includes("logout")) return "text-amber-600 bg-amber-100 dark:bg-amber-500/20"
    return "text-blue-600 bg-blue-100 dark:bg-blue-500/20"
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Admin Only</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Logs</h1>
          <p className="text-slate-500 dark:text-slate-400">Track system activity and user actions</p>
        </div>

        {/* Audit Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {auditEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No Activity Yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Audit events will appear here as users interact with the admin panel.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {auditEvents.slice(0, 20).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className={cn("p-2 rounded-lg", getActionColor(event.action))}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-white capitalize">
                        {event.action.replace(/_/g, " ")}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {event.user?.name || "Anonymous"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
