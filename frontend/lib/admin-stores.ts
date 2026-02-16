import { API_URL } from "./utils"

// ============ ENQUIRIES ============
export interface Enquiry {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  enquiryType: string | null // Schema has 'enquiryType'
  message: string
  source: string
  status: "new" | "contacted" | "in_progress" | "converted" | "closed"
  priority: "low" | "medium" | "high"
  assignedTo: string | null
  createdAt: string
  updatedAt: string
  notes: any[]
}

// Adapting to match backend response structure
export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const res = await fetch(`${API_URL}/enquiries`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    return []
  }
}

export async function saveEnquiry(enquiry: Partial<Enquiry>): Promise<void> {
  if (enquiry.id) {
    await fetch(`${API_URL}/enquiries/${enquiry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    })
  } else {
    await fetch(`${API_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    })
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  // Backend doesn't have delete for enquiry yet, but let's assume valid or skip
  // console.warn("Delete not implemented in backend for enquiries")
}

// ============ FRANCHISE APPLICATIONS ============
export interface FranchiseApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName: string | null
  location: string
  preferredArea: string | null
  investmentAmount: string | null
  experience: string | null
  motivation: string | null
  status: "pending" | "reviewing" | "approved" | "rejected" | "withdrawn"
  assignedTo: string | null
  reviewDate: string | null
  createdAt: string
  updatedAt: string
  notes: any[]
}

export async function getFranchises(): Promise<FranchiseApplication[]> {
  try {
    const res = await fetch(`${API_URL}/franchise`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    return []
  }
}

export async function saveFranchise(franchise: Partial<FranchiseApplication>): Promise<void> {
  if (franchise.id) {
    await fetch(`${API_URL}/franchise/${franchise.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(franchise)
    })
  } else {
    await fetch(`${API_URL}/franchise`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(franchise)
    })
  }
}

export async function addFranchiseNote(id: string, content: string, author: string): Promise<void> {
  await fetch(`${API_URL}/franchise/${id}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, author })
  })
}

export async function deleteFranchise(id: string): Promise<void> {
  // Backend delete not implemented yet
}

// ============ TESTIMONIALS ============
export interface Testimonial {
  id: string
  name: string
  role: string | null
  content: string
  rating: number
  image: string | null
  featured: boolean
  status: string
  createdAt: string
  updatedAt: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_URL}/testimonials`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function saveTestimonial(testimonial: Partial<Testimonial>): Promise<void> {
  const method = testimonial.id ? 'PUT' : 'POST'
  const url = testimonial.id ? `${API_URL}/testimonials/${testimonial.id}` : `${API_URL}/testimonials`

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testimonial)
  })
}

export async function deleteTestimonial(id: string): Promise<void> {
  await fetch(`${API_URL}/testimonials/${id}`, { method: 'DELETE' })
}

// ============ CMS PAGES ============
export interface CMSPage {
  id: string
  slug: string
  title: string
  status: string
  updatedAt: string
}

export async function getCMSPages(): Promise<CMSPage[]> {
  try {
    const res = await fetch(`${API_URL}/cms/pages`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function getCMSPage(slug: string): Promise<CMSPage | undefined> {
  try {
    const res = await fetch(`${API_URL}/cms/pages/slug/${slug}`, { cache: 'no-store' })
    if (!res.ok) return undefined
    return res.json()
  } catch {
    return undefined
  }
}

export async function saveCMSPage(page: Partial<CMSPage>): Promise<void> {
  const method = page.id ? 'PUT' : 'POST'
  const url = page.id ? `${API_URL}/cms/pages/${page.id}` : `${API_URL}/cms/pages`

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(page)
  })
}

export async function deleteCMSPage(id: string): Promise<void> {
  await fetch(`${API_URL}/cms/pages/${id}`, { method: 'DELETE' })
}

// Courses handled by courses-store.ts
// Media Assets
export async function getMediaAssets() {
  try {
    const res = await fetch(`${API_URL}/media`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function saveMediaAsset(asset: any) {
  await fetch(`${API_URL}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asset)
  })
}

export async function updateMediaAsset(id: string, updates: any) {
  const res = await fetch(`${API_URL}/media/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
  return res.json()
}

export async function deleteMediaAsset(id: string) {
  await fetch(`${API_URL}/media/${id}`, { method: 'DELETE' })
}


// ============ USERS ============
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "editor" | "student" | "franchise"
  status: string
  createdAt: string
  password?: string // only for creation
  phone?: string
}

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${API_URL}/users`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function saveUser(user: Partial<User>): Promise<void> {
  const method = user.id ? 'PUT' : 'POST'
  const url = user.id ? `${API_URL}/users/${user.id}` : `${API_URL}/users`

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
}

export async function deleteUser(id: string): Promise<void> {
  await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' })
}
