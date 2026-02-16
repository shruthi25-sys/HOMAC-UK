"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getAdminSession, adminSignOut, type AdminSession, type AdminRole, canPerformAction } from "@/lib/admin-auth"

interface AdminAuthContextType {
  session: AdminSession | null
  isLoading: boolean
  signOut: () => void
  hasRole: (role: AdminRole) => boolean
  canPerform: (action: string) => boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const currentSession = getAdminSession()
    setSession(currentSession)
    setIsLoading(false)

    // If no session and not on login page, redirect
    if (!currentSession && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const signOut = () => {
    adminSignOut()
    // Clear the middleware cookie
    document.cookie = "homac_admin_active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setSession(null)
    router.push("/admin/login")
  }

  const hasRole = (role: AdminRole): boolean => {
    if (!session) return false
    if (session.user.role === "admin") return true
    return session.user.role === role
  }

  const canPerform = (action: string): boolean => {
    return canPerformAction(action)
  }

  return (
    <AdminAuthContext.Provider value={{ session, isLoading, signOut, hasRole, canPerform }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
