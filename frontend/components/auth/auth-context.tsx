"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getStoredUser, signOut as authSignOut, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signOut: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = () => {
    const storedUser = getStoredUser()
    setUser(storedUser)
  }

  useEffect(() => {
    refreshUser()
    setIsLoading(false)

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "homac_auth_user") {
        refreshUser()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const signOut = () => {
    authSignOut()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, signOut, refreshUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
