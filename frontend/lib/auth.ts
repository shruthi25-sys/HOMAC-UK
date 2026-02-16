// Client-side auth store using Fetch API
import { API_URL } from "./utils" // Make sure this exists or hardcode

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role?: string
  avatar?: string
  createdAt: string
}

const AUTH_KEY = "homac_auth_user"
const TOKEN_KEY = "homac_auth_token"

// Explicit define API URL if import fails
const BASE_URL = "http://localhost:3001/api"

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(AUTH_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.error || 'Login failed' }
    }

    setStoredUser(data.user)
    setToken(data.token)
    return { success: true, user: data.user }

  } catch (error) {
    return { success: false, error: "Network error" }
  }
}

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.error || 'Registration failed' }
    }

    // Auto login not implemented in backend register, so just return success
    return { success: true, user: data }

  } catch (error) {
    return { success: false, error: "Network error" }
  }
}

export function signOut(): void {
  clearStoredUser()
  // Optional: Call API to invalidate token if needed
}

