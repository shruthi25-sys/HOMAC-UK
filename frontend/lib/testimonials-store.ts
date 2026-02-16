// Testimonials Management Store

export interface Testimonial {
  id: string
  name: string
  relation: string // e.g., "Parent", "Student", "Teacher"
  location: string
  image?: string
  quote: string
  rating: number
  status: "published" | "pending" | "archived"
  studentName?: string
  studentAge?: number
  course?: string
  createdAt: string
  updatedAt: string
  modifiedBy: string
}

const TESTIMONIALS_KEY = "homac_testimonials"

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Kapoor",
    relation: "Parent",
    location: "London, UK",
    quote: "My daughter's confidence has increased tremendously since joining Homac. The instructors are incredibly patient and the results speak for themselves!",
    rating: 5,
    status: "published",
    studentName: "Anjali Kapoor",
    studentAge: 7,
    course: "Beginner Abacus",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    modifiedBy: "Editor Admin",
  },
  {
    id: "test-2",
    name: "Mrs. Elizabeth Brown",
    relation: "Parent",
    location: "Manchester, UK",
    quote: "Excellent program! My son went from struggling with math to being one of the top performers in his class. Highly recommended!",
    rating: 5,
    status: "published",
    studentName: "James Brown",
    studentAge: 8,
    course: "Intermediate Abacus",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    modifiedBy: "Editor Admin",
  },
  {
    id: "test-3",
    name: "Priya Singh",
    relation: "Student",
    location: "Birmingham, UK",
    quote: "Learning abacus with Homac has been the best decision I made. It's fun, challenging, and I can see real improvement in my mental math skills.",
    rating: 5,
    status: "published",
    studentAge: 12,
    course: "Advanced Arithmetic",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    modifiedBy: "Editor Admin",
  },
  {
    id: "test-4",
    name: "David Williams",
    relation: "Parent",
    location: "Leeds, UK",
    quote: "Outstanding instructors and a well-structured curriculum. My child is more enthusiastic about learning than ever before.",
    rating: 4,
    status: "pending",
    studentName: "Sophie Williams",
    studentAge: 6,
    course: "Beginner Abacus",
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
    modifiedBy: "system",
  },
]

export function getTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return DEFAULT_TESTIMONIALS
  const stored = localStorage.getItem(TESTIMONIALS_KEY)
  if (!stored) {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(DEFAULT_TESTIMONIALS))
    return DEFAULT_TESTIMONIALS
  }
  try {
    return JSON.parse(stored)
  } catch {
    return DEFAULT_TESTIMONIALS
  }
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return getTestimonials().find((t) => t.id === id)
}

export function addTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt">, modifiedBy: string): Testimonial {
  const testimonials = getTestimonials()
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: `test-${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    modifiedBy,
  }
  testimonials.push(newTestimonial)
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials))
  return newTestimonial
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>, modifiedBy: string): Testimonial | undefined {
  const testimonials = getTestimonials()
  const index = testimonials.findIndex((t) => t.id === id)
  if (index < 0) return undefined
  
  testimonials[index] = {
    ...testimonials[index],
    ...updates,
    updatedAt: new Date().toISOString(),
    modifiedBy,
  }
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(testimonials))
  return testimonials[index]
}

export function deleteTestimonial(id: string): boolean {
  const testimonials = getTestimonials()
  const filtered = testimonials.filter((t) => t.id !== id)
  if (filtered.length === testimonials.length) return false
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(filtered))
  return true
}
