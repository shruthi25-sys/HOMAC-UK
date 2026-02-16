import { API_URL } from "./utils"

export interface Course {
  id: string
  title: string
  description: string
  shortDescription: string | null
  slug: string
  category: string
  level: string
  duration: string
  price: number
  image?: string
  instructor: string
  totalStudents: number
  rating: number
  // modules: CourseModule[] // Complex to map initially
  features: string[]
  status: string
  createdAt: string
  updatedAt: string
  modifiedBy?: string
}

export type CourseModule = any; // simplified for now

export async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_URL}/courses`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, { cache: 'no-store' })
    if (!res.ok) return undefined
    return res.json()
  } catch (error) {
    return undefined
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  try {
    const res = await fetch(`${API_URL}/courses/slug/${slug}`, { cache: 'no-store' })
    if (!res.ok) return undefined
    return res.json()
  } catch (error) {
    return undefined
  }
}

export async function addCourse(course: Omit<Course, "id" | "createdAt" | "updatedAt">, modifiedBy: string): Promise<Course> {
  const res = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  })
  if (!res.ok) throw new Error('Failed to create course')
  return res.json()
}

export async function updateCourse(id: string, updates: Partial<Course>, modifiedBy: string): Promise<Course | undefined> {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
  if (!res.ok) return undefined
  return res.json()
}

export async function deleteCourse(id: string, modifiedBy: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE'
  })
  return res.ok
}
