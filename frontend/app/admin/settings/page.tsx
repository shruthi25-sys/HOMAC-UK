"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Settings, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdminAuth } from "@/components/admin/admin-auth-context"

// Admin-only page with role protection
export default function SettingsPage() {
  const { hasRole, isLoading } = useAdminAuth()
  const router = useRouter()

  // Redirect non-admins
  useEffect(() => {
    if (!isLoading && !hasRole("admin")) {
      router.push("/admin")
    }
  }, [isLoading, hasRole, router])

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
              You don't have permission to access this page. Admin access required.
            </p>
          </CardContent>
        </Card>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Configure system settings and preferences</p>
        </div>

        {/* Placeholder content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Settings Module
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                This admin-only module will provide system configuration options including 
                site settings, email templates, and integration configurations. CMS features coming soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
