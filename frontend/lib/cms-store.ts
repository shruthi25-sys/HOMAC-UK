// CMS Content Store
// For production, integrate with a database like Supabase

export interface PageContent {
  id: string
  slug: string
  title: string
  description: string
  sections: ContentSection[]
  seo: SEOData
  status: "published" | "draft" | "archived"
  lastModified: string
  modifiedBy: string
  version: number
}

export interface ContentSection {
  id: string
  type: "hero" | "text" | "features" | "cta" | "testimonials" | "gallery" | "faq" | "contact" | "custom"
  title?: string
  content: Record<string, unknown>
  order: number
  visible: boolean
}

export interface SEOData {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  ogImage?: string
}

const CMS_PAGES_KEY = "homac_cms_pages"

// Default page content
const DEFAULT_PAGES: PageContent[] = [
  {
    id: "page-home",
    slug: "home",
    title: "Home",
    description: "Main landing page",
    sections: [
      {
        id: "hero-1",
        type: "hero",
        title: "Hero Section",
        content: {
          headline: "Unlock Your Child's Mathematical Genius",
          subheadline: "Join 10,000+ students mastering mental arithmetic with Homac UK",
          primaryCTA: { text: "Start Free Trial", url: "/contact" },
          secondaryCTA: { text: "Watch Demo", url: "/about" },
          backgroundImage: "/happy-children-smiling-learning-abacus.jpg",
        },
        order: 1,
        visible: true,
      },
      {
        id: "features-1",
        type: "features",
        title: "Why Choose Us",
        content: {
          sectionTitle: "Why Choose Homac UK?",
          features: [
            { title: "Expert Instructors", description: "Certified teachers with 10+ years experience", icon: "users" },
            { title: "Interactive Learning", description: "Engaging games and exercises", icon: "gamepad" },
            { title: "Progress Tracking", description: "Real-time performance analytics", icon: "chart" },
            { title: "Flexible Schedule", description: "Learn at your own pace", icon: "clock" },
          ],
        },
        order: 2,
        visible: true,
      },
      {
        id: "cta-1",
        type: "cta",
        title: "Call to Action",
        content: {
          headline: "Ready to Transform Your Child's Future?",
          description: "Join thousands of parents who chose Homac UK for their children's education.",
          buttonText: "Get Started Today",
          buttonUrl: "/contact",
        },
        order: 3,
        visible: true,
      },
    ],
    seo: {
      metaTitle: "Homac UK - Premium Abacus & Mental Arithmetic Education",
      metaDescription: "Discover the future of math education with Homac UK. Expert abacus and mental arithmetic training for children.",
      keywords: ["abacus", "mental arithmetic", "education", "kids learning", "math tuition"],
    },
    status: "published",
    lastModified: new Date().toISOString(),
    modifiedBy: "Super Admin",
    version: 1,
  },
  {
    id: "page-about",
    slug: "about",
    title: "About Us",
    description: "Company information and story",
    sections: [
      {
        id: "about-hero",
        type: "hero",
        title: "About Hero",
        content: {
          headline: "About Homac UK",
          subheadline: "Empowering young minds through innovative mathematics education since 2010",
          backgroundImage: "/children-learning-together-group.jpg",
        },
        order: 1,
        visible: true,
      },
      {
        id: "about-story",
        type: "text",
        title: "Our Story",
        content: {
          heading: "Our Story",
          body: "Homac UK was founded with a simple mission: to make mathematics fun and accessible for every child. Our unique approach combines ancient abacus techniques with modern teaching methods.",
        },
        order: 2,
        visible: true,
      },
    ],
    seo: {
      metaTitle: "About Us - Homac UK",
      metaDescription: "Learn about Homac UK's mission to transform mathematics education through innovative abacus training.",
      keywords: ["about homac", "abacus education", "our story"],
    },
    status: "published",
    lastModified: new Date().toISOString(),
    modifiedBy: "Super Admin",
    version: 1,
  },
  {
    id: "page-courses",
    slug: "courses",
    title: "Courses",
    description: "Course listings and details",
    sections: [
      {
        id: "courses-hero",
        type: "hero",
        title: "Courses Hero",
        content: {
          headline: "Our Courses",
          subheadline: "Comprehensive programs designed for all skill levels",
          backgroundImage: "/classroom-learning-abacus.jpg",
        },
        order: 1,
        visible: true,
      },
    ],
    seo: {
      metaTitle: "Courses - Homac UK",
      metaDescription: "Explore our range of abacus and mental arithmetic courses for children of all ages.",
      keywords: ["abacus courses", "mental arithmetic classes", "children courses"],
    },
    status: "published",
    lastModified: new Date().toISOString(),
    modifiedBy: "Super Admin",
    version: 1,
  },
  {
    id: "page-11plus",
    slug: "11-plus",
    title: "11+ Preparation",
    description: "11+ exam preparation courses",
    sections: [
      {
        id: "11plus-hero",
        type: "hero",
        title: "11+ Hero",
        content: {
          headline: "11+ Preparation",
          subheadline: "Give your child the best chance of success in their 11+ exams",
          backgroundImage: "/award-winning-students.jpg",
        },
        order: 1,
        visible: true,
      },
    ],
    seo: {
      metaTitle: "11+ Preparation - Homac UK",
      metaDescription: "Expert 11+ exam preparation with proven results. Help your child succeed.",
      keywords: ["11+ preparation", "eleven plus", "grammar school exams"],
    },
    status: "published",
    lastModified: new Date().toISOString(),
    modifiedBy: "Super Admin",
    version: 1,
  },
  {
    id: "page-franchise",
    slug: "franchise",
    title: "Franchise",
    description: "Franchise opportunity information",
    sections: [
      {
        id: "franchise-hero",
        type: "hero",
        title: "Franchise Hero",
        content: {
          headline: "Franchise Opportunity",
          subheadline: "Join our growing network of successful education centers",
          backgroundImage: "/modern-teaching-methods.jpg",
        },
        order: 1,
        visible: true,
      },
    ],
    seo: {
      metaTitle: "Franchise Opportunity - Homac UK",
      metaDescription: "Start your own Homac education center. Low investment, high returns.",
      keywords: ["education franchise", "business opportunity", "franchise UK"],
    },
    status: "published",
    lastModified: new Date().toISOString(),
    modifiedBy: "Super Admin",
    version: 1,
  },
  {
    id: "page-contact",
    slug: "contact",
    title: "Contact",
    description: "Contact information and form",
    sections: [
      {
        id: "contact-hero",
        type: "hero",
        title: "Contact Hero",
        content: {
          headline: "Get in Touch",
          subheadline: "We'd love to hear from you",
        },
        order: 1,
        visible: true,
      },
      {
        id: "contact-form",
        type: "contact",
        title: "Contact Form",
        content: {
          formTitle: "Send us a Message",
          email: "info@homacuk.com",
          phone: "+44 123 456 7890",
          address: "123 Education Street, London, UK",
        },
        order: 2,
        visible: true,
      },
    ],
    seo: {
      metaTitle: "Contact Us - Homac UK",
      metaDescription: "Get in touch with Homac UK. We're here to answer your questions.",
      keywords: ["contact homac", "enquiry", "get in touch"],
    },
    status: "published",
    lastModified: new Date().toISOString(),
    modifiedBy: "Super Admin",
    version: 1,
  },
]

export function getPages(): PageContent[] {
  if (typeof window === "undefined") return DEFAULT_PAGES
  const stored = localStorage.getItem(CMS_PAGES_KEY)
  if (!stored) {
    // Initialize with default pages
    localStorage.setItem(CMS_PAGES_KEY, JSON.stringify(DEFAULT_PAGES))
    return DEFAULT_PAGES
  }
  try {
    return JSON.parse(stored)
  } catch {
    return DEFAULT_PAGES
  }
}

export function getPageBySlug(slug: string): PageContent | undefined {
  const pages = getPages()
  return pages.find((p) => p.slug === slug)
}

export function getPageById(id: string): PageContent | undefined {
  const pages = getPages()
  return pages.find((p) => p.id === id)
}

export function updatePage(updatedPage: PageContent, modifiedBy: string): PageContent {
  const pages = getPages()
  const index = pages.findIndex((p) => p.id === updatedPage.id)
  
  const newPage = {
    ...updatedPage,
    lastModified: new Date().toISOString(),
    modifiedBy,
    version: (pages[index]?.version || 0) + 1,
  }
  
  if (index >= 0) {
    pages[index] = newPage
  } else {
    pages.push(newPage)
  }
  
  localStorage.setItem(CMS_PAGES_KEY, JSON.stringify(pages))
  return newPage
}

export function updatePageSection(
  pageId: string,
  sectionId: string,
  updates: Partial<ContentSection>,
  modifiedBy: string
): PageContent | undefined {
  const page = getPageById(pageId)
  if (!page) return undefined
  
  const sectionIndex = page.sections.findIndex((s) => s.id === sectionId)
  if (sectionIndex < 0) return undefined
  
  page.sections[sectionIndex] = {
    ...page.sections[sectionIndex],
    ...updates,
  }
  
  return updatePage(page, modifiedBy)
}

export function addPageSection(
  pageId: string,
  section: Omit<ContentSection, "id" | "order">,
  modifiedBy: string
): PageContent | undefined {
  const page = getPageById(pageId)
  if (!page) return undefined
  
  const newSection: ContentSection = {
    ...section,
    id: `section-${crypto.randomUUID().slice(0, 8)}`,
    order: page.sections.length + 1,
  }
  
  page.sections.push(newSection)
  return updatePage(page, modifiedBy)
}

export function deletePageSection(
  pageId: string,
  sectionId: string,
  modifiedBy: string
): PageContent | undefined {
  const page = getPageById(pageId)
  if (!page) return undefined
  
  page.sections = page.sections.filter((s) => s.id !== sectionId)
  // Reorder sections
  page.sections = page.sections.map((s, idx) => ({ ...s, order: idx + 1 }))
  
  return updatePage(page, modifiedBy)
}

export function updatePageSEO(
  pageId: string,
  seo: Partial<SEOData>,
  modifiedBy: string
): PageContent | undefined {
  const page = getPageById(pageId)
  if (!page) return undefined
  
  page.seo = { ...page.seo, ...seo }
  return updatePage(page, modifiedBy)
}

export function setPageStatus(
  pageId: string,
  status: "published" | "draft" | "archived",
  modifiedBy: string
): PageContent | undefined {
  const page = getPageById(pageId)
  if (!page) return undefined
  
  page.status = status
  return updatePage(page, modifiedBy)
}
