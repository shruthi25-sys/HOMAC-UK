"use client"

// Audit log types and store for tracking admin actions

export type AuditAction = 
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "view"
  | "export"
  | "status_change"
  | "permission_change"

export type AuditResource = 
  | "page_content"
  | "course"
  | "enquiry"
  | "franchise"
  | "testimonial"
  | "gallery"
  | "student"
  | "enrollment"
  | "admin_user"
  | "settings"

export interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  userRole: string
  action: AuditAction
  resource: AuditResource
  resourceId?: string
  resourceName?: string
  details?: string
  previousValue?: string
  newValue?: string
  ipAddress?: string
  userAgent?: string
}

// Mock audit logs for demonstration
const mockAuditLogs: AuditLog[] = [
  {
    id: "audit-001",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    userId: "admin-001",
    userName: "John Smith",
    userRole: "super_admin",
    action: "update",
    resource: "page_content",
    resourceId: "home",
    resourceName: "Home Page",
    details: "Updated hero section title and description",
    previousValue: "Welcome to HOMAC UK",
    newValue: "Transform Your Child's Future with HOMAC UK",
  },
  {
    id: "audit-002",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    userId: "admin-002",
    userName: "Sarah Johnson",
    userRole: "admin",
    action: "status_change",
    resource: "enquiry",
    resourceId: "enq-003",
    resourceName: "Parent Enquiry - Mathematics",
    details: "Changed status from 'new' to 'contacted'",
    previousValue: "new",
    newValue: "contacted",
  },
  {
    id: "audit-003",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    userId: "admin-003",
    userName: "Emily Davis",
    userRole: "editor",
    action: "create",
    resource: "testimonial",
    resourceId: "test-015",
    resourceName: "New Testimonial",
    details: "Added testimonial from Mrs. Patel",
  },
  {
    id: "audit-004",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    userId: "admin-001",
    userName: "John Smith",
    userRole: "super_admin",
    action: "permission_change",
    resource: "admin_user",
    resourceId: "admin-004",
    resourceName: "Michael Brown",
    details: "Updated role from 'editor' to 'admin'",
    previousValue: "editor",
    newValue: "admin",
  },
  {
    id: "audit-005",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    userId: "admin-002",
    userName: "Sarah Johnson",
    userRole: "admin",
    action: "update",
    resource: "course",
    resourceId: "course-002",
    resourceName: "Abacus Mental Arithmetic",
    details: "Updated course description and pricing",
  },
  {
    id: "audit-006",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    userId: "admin-001",
    userName: "John Smith",
    userRole: "super_admin",
    action: "login",
    resource: "admin_user",
    details: "Admin login successful",
  },
  {
    id: "audit-007",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    userId: "admin-003",
    userName: "Emily Davis",
    userRole: "editor",
    action: "delete",
    resource: "gallery",
    resourceId: "img-042",
    resourceName: "Outdated event photo",
    details: "Removed outdated image from gallery",
  },
  {
    id: "audit-008",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    userId: "admin-002",
    userName: "Sarah Johnson",
    userRole: "admin",
    action: "export",
    resource: "enquiry",
    details: "Exported enquiries report (CSV)",
  },
  {
    id: "audit-009",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    userId: "admin-001",
    userName: "John Smith",
    userRole: "super_admin",
    action: "create",
    resource: "admin_user",
    resourceId: "admin-005",
    resourceName: "New Editor Account",
    details: "Created new editor account for content team",
  },
  {
    id: "audit-010",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    userId: "admin-002",
    userName: "Sarah Johnson",
    userRole: "admin",
    action: "status_change",
    resource: "franchise",
    resourceId: "fr-007",
    resourceName: "Manchester Franchise Application",
    details: "Changed status from 'under_review' to 'approved'",
    previousValue: "under_review",
    newValue: "approved",
  },
]

// In-memory store
let auditLogs = [...mockAuditLogs]

export function getAuditLogs(filters?: {
  action?: AuditAction
  resource?: AuditResource
  userId?: string
  startDate?: string
  endDate?: string
}): AuditLog[] {
  let filtered = [...auditLogs]
  
  if (filters?.action) {
    filtered = filtered.filter(log => log.action === filters.action)
  }
  
  if (filters?.resource) {
    filtered = filtered.filter(log => log.resource === filters.resource)
  }
  
  if (filters?.userId) {
    filtered = filtered.filter(log => log.userId === filters.userId)
  }
  
  if (filters?.startDate) {
    filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(filters.startDate!))
  }
  
  if (filters?.endDate) {
    filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(filters.endDate!))
  }
  
  return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function addAuditLog(log: Omit<AuditLog, "id" | "timestamp">): AuditLog {
  const newLog: AuditLog = {
    ...log,
    id: `audit-${Date.now()}`,
    timestamp: new Date().toISOString(),
  }
  auditLogs = [newLog, ...auditLogs]
  return newLog
}

export function getActionColor(action: AuditAction): string {
  switch (action) {
    case "login":
    case "logout":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "create":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "update":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    case "delete":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "view":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    case "export":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "status_change":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
    case "permission_change":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export function getActionLabel(action: AuditAction): string {
  switch (action) {
    case "login": return "Login"
    case "logout": return "Logout"
    case "create": return "Created"
    case "update": return "Updated"
    case "delete": return "Deleted"
    case "view": return "Viewed"
    case "export": return "Exported"
    case "status_change": return "Status Changed"
    case "permission_change": return "Permission Changed"
    default: return action
  }
}

export function getResourceLabel(resource: AuditResource): string {
  switch (resource) {
    case "page_content": return "Page Content"
    case "course": return "Course"
    case "enquiry": return "Enquiry"
    case "franchise": return "Franchise"
    case "testimonial": return "Testimonial"
    case "gallery": return "Gallery"
    case "student": return "Student"
    case "enrollment": return "Enrollment"
    case "admin_user": return "Admin User"
    case "settings": return "Settings"
    default: return resource
  }
}
