// Admin authentication with role-based permissions

export type AdminRole = "admin" | "editor"

export interface AdminUser {
  id: string
  email: string
  name: string
  role: AdminRole
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface AdminSession {
  user: AdminUser
  token: string
  expiresAt: string
}

const ADMIN_SESSION_KEY = "homac_admin_session"
const ADMIN_AUDIT_KEY = "homac_admin_audit"

// Demo admin users
const DEMO_ADMINS: Record<string, { password: string; user: AdminUser }> = {
  "admin@homacuk.com": {
    password: "admin123",
    user: {
      id: "admin-1",
      email: "admin@homacuk.com",
      name: "System Administrator",
      role: "admin",
      createdAt: "2024-01-01T00:00:00Z",
    },
  },
  "editor@homacuk.com": {
    password: "editor123",
    user: {
      id: "editor-1",
      email: "editor@homacuk.com",
      name: "Content Editor",
      role: "editor",
      createdAt: "2024-01-15T00:00:00Z",
    },
  },
}

// Session token generation
function generateToken(): string {
  return `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

// Get current admin session
export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(ADMIN_SESSION_KEY)
  if (!stored) return null
  
  try {
    const session: AdminSession = JSON.parse(stored)
    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      clearAdminSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

// Set admin session
export function setAdminSession(session: AdminSession): void {
  if (typeof window === "undefined") return
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
}

// Clear admin session
export function clearAdminSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(ADMIN_SESSION_KEY)
}

// Admin sign in
export async function adminSignIn(
  email: string,
  password: string
): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const admin = DEMO_ADMINS[email.toLowerCase()]
  if (!admin || admin.password !== password) {
    // Log failed attempt
    logAuditEvent("login_failed", { email }, null)
    return { success: false, error: "Invalid email or password" }
  }

  const session: AdminSession = {
    user: {
      ...admin.user,
      lastLogin: new Date().toISOString(),
    },
    token: generateToken(),
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours
  }

  setAdminSession(session)
  logAuditEvent("login_success", { email }, session.user)
  
  return { success: true, session }
}

// Admin sign out
export function adminSignOut(): void {
  const session = getAdminSession()
  if (session) {
    logAuditEvent("logout", {}, session.user)
  }
  clearAdminSession()
}

// Check if user has specific role
export function hasRole(requiredRole: AdminRole): boolean {
  const session = getAdminSession()
  if (!session) return false
  
  // Admin has access to everything
  if (session.user.role === "admin") return true
  
  // Editor only has editor access
  return session.user.role === requiredRole
}

// Check if user can perform action
export function canPerformAction(action: string): boolean {
  const session = getAdminSession()
  if (!session) return false
  
  const adminOnlyActions = [
    "delete_user",
    "manage_roles",
    "view_audit_logs",
    "manage_settings",
    "delete_content",
    "create_course",
    "edit_course",
    "delete_course",
    "upload_media",
    "delete_media",
    "manage_pages",
    "view_users",
  ]
  
  if (adminOnlyActions.includes(action)) {
    return session.user.role === "admin"
  }
  
  // Editor can do most things except admin-only actions
  return true
}

// Permission check for specific features
export function hasPermission(feature: string): boolean {
  const session = getAdminSession()
  if (!session) return false
  
  const adminFeatures: Record<string, AdminRole[]> = {
    // Courses
    create_course: ["admin"],
    edit_course: ["admin"],
    delete_course: ["admin"],
    publish_course: ["admin", "editor"],
    view_courses: ["admin", "editor"],
    
    // Testimonials
    create_testimonial: ["admin", "editor"],
    edit_testimonial: ["admin", "editor"],
    delete_testimonial: ["admin"],
    approve_testimonial: ["admin"],
    feature_testimonial: ["admin"],
    
    // Media
    upload_media: ["admin"],
    delete_media: ["admin"],
    view_media: ["admin", "editor"],
    
    // Pages
    edit_pages: ["admin"],
    publish_pages: ["admin"],
    
    // Analytics
    view_analytics: ["admin", "editor"],
    view_audit_logs: ["admin"],
    
    // Enquiries
    view_enquiries: ["admin", "editor"],
    respond_enquiry: ["admin", "editor"],
    close_enquiry: ["admin", "editor"],
    
    // Settings & Users
    manage_users: ["admin"],
    manage_settings: ["admin"],
  }
  
  const allowedRoles = adminFeatures[feature] || []
  return allowedRoles.includes(session.user.role)
}

// Audit logging
export interface AuditEvent {
  id: string
  timestamp: string
  action: string
  details: Record<string, unknown>
  user: AdminUser | null
  ip?: string
}

export function logAuditEvent(
  action: string,
  details: Record<string, unknown>,
  user: AdminUser | null
): void {
  if (typeof window === "undefined") return
  
  const events = getAuditEvents()
  const event: AuditEvent = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    action,
    details,
    user,
  }
  
  events.unshift(event)
  // Keep only last 1000 events
  const trimmedEvents = events.slice(0, 1000)
  localStorage.setItem(ADMIN_AUDIT_KEY, JSON.stringify(trimmedEvents))
}

export function getAuditEvents(): AuditEvent[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(ADMIN_AUDIT_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}
