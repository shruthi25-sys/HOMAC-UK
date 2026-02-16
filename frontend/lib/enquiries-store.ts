import { API_URL } from "./utils"

export type EnquiryStatus = "new" | "contacted" | "in_progress" | "converted" | "closed"
export type EnquiryType = "course" | "franchise" | "support" | "general" | "enrollment"

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  type: EnquiryType
  subject: string
  message: string
  status: EnquiryStatus
  priority: "low" | "medium" | "high"
  source: string
  assignedTo?: string
  notes: any[]
  createdAt: string
  updatedAt: string
  followUpDate?: string
}

export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const res = await fetch(`${API_URL}/enquiries`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    return []
  }
}

export async function getEnquiryById(id: string): Promise<Enquiry | undefined> {
  try {
    const res = await fetch(`${API_URL}/enquiries/${id}`, { cache: 'no-store' })
    if (!res.ok) return undefined
    return res.json()
  } catch (error) {
    return undefined
  }
}

export async function addEnquiryNote(id: string, content: string, author: string): Promise<any> {
  const res = await fetch(`${API_URL}/enquiries/${id}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, author })
  })
  if (!res.ok) return undefined
  return res.json()
}

// Stats helpers - simplistic implementation fetching all
export async function getEnquiryStats() {
  const enquiries = await getEnquiries()
  return {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === "new").length,
    contacted: enquiries.filter(e => e.status === "contacted").length,
    inProgress: enquiries.filter(e => e.status === "in_progress").length,
    converted: enquiries.filter(e => e.status === "converted").length,
    closed: enquiries.filter(e => e.status === "closed").length,
    highPriority: enquiries.filter(e => e.priority === "high").length,
  }
}

export const STATUS_COLORS: Record<EnquiryStatus, { bg: string; text: string }> = {
  new: { bg: "bg-blue-500/10", text: "text-blue-500" },
  contacted: { bg: "bg-amber-500/10", text: "text-amber-500" },
  in_progress: { bg: "bg-purple-500/10", text: "text-purple-500" },
  converted: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  closed: { bg: "bg-gray-500/10", text: "text-gray-500" },
}

export const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  low: { bg: "bg-gray-500/10", text: "text-gray-500" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-500" },
  high: { bg: "bg-red-500/10", text: "text-red-500" },
}
