"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  AlertCircle,
  BookOpen,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getCourses, addCourse, updateCourse, deleteCourse, type Course as StoreCourse } from "@/lib/courses-store"
import { canPerformAction, logAuditEvent } from "@/lib/admin-auth"

// Extend or alias StoreCourse if needed, but for now we'll try to use it directly
// The store course has 'totalStudents', 'instructor', etc.
// The UI uses 'ageGroup', 'level', 'enrollments' (which maps to totalStudents).
// Store definition:
// export interface Course {
//   id: string
//   title: string  <-- UI uses 'name'
//   description: string
//   shortDescription: string | null
//   slug: string
//   category: string
//   level: string
//   duration: string
//   price: number
//   image?: string
//   instructor: string
//   totalStudents: number <-- UI uses 'enrollments'
//   rating: number
//   features: string[]
//   status: string
//   createdAt: string
//   updatedAt: string
//   modifiedBy?: string
// }

// To avoid massive UI breakage, I'll map the UI 'name' to 'title', 'enrollments' to 'totalStudents'.
// And add missing fields to formData.

interface UICourse extends StoreCourse {
  // Helper accessors if needed, or just type assertions
}

export default function CoursesManagement() {
  const { session, isLoading } = useAdminAuth()
  const [courses, setCourses] = useState<StoreCourse[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Partial<StoreCourse>>({
    title: "",
    level: "",
    category: "beginner",
    duration: "",
    price: 0,
    description: "",
    image: "",
    features: [],
    status: "inactive",
  })
  const [featureInput, setFeatureInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const load = async () => {
      const data = await getCourses()
      setCourses(data)
    }
    load()
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.title?.trim()) newErrors.title = "Course name is required"
    if (!formData.level?.trim()) newErrors.level = "Age group is required"
    if (!formData.duration?.trim()) newErrors.duration = "Duration is required"
    if (formData.price === undefined || formData.price < 0) newErrors.price = "Valid price is required"
    if (!formData.description?.trim()) newErrors.description = "Description is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    const modifier = session?.user?.name || "Admin"

    try {
      if (editingId) {
        // Update
        await updateCourse(editingId, formData, modifier)
        logAuditEvent("course_updated", { courseId: editingId, title: formData.title }, session?.user || null)
      } else {
        // Create
        // Needs generic slug generation
        const slug = formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `course-${Date.now()}`

        const newCourse = {
          title: formData.title || "",
          description: formData.description || "",
          shortDescription: "",
          slug,
          image: formData.image || "",
          category: formData.category || "beginner",
          level: formData.level || "",
          duration: formData.duration || "",
          price: formData.price || 0,
          instructor: "Homac",
          totalStudents: 0,
          rating: 0,
          features: formData.features || [],
          status: formData.status || "inactive",
        }
        await addCourse(newCourse, modifier)
        logAuditEvent("course_created", { title: newCourse.title }, session?.user || null)
      }

      const data = await getCourses()
      setCourses(data)
      setShowForm(false)
      setEditingId(null)
      setFormData({
        title: "",
        level: "",
        category: "beginner",
        duration: "",
        price: 0,
        description: "",
        image: "",
        features: [],
        status: "inactive",
      })
    } catch (e) {
      console.error("Failed to save course", e)
      alert("Failed to save course")
    }
  }

  const handleEdit = (course: StoreCourse) => {
    setFormData(course)
    setEditingId(course.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (canPerformAction("delete_content")) {
      if (window.confirm(`Delete course "${name}"?`)) {
        await deleteCourse(id, session?.user?.name || "Admin")
        logAuditEvent("course_deleted", { courseId: id }, session?.user || null)
        const data = await getCourses()
        setCourses(data)
      }
    }
  }

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput],
      })
      setFeatureInput("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    })
  }

  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isEditor = session?.user.role === "editor"

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Courses Management</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Create and manage your course offerings</p>
          </div>
          <Button
            onClick={() => {
              setFormData({
                title: "",
                level: "beginner",
                category: "",
                duration: "",
                price: 0,
                description: "",
                image: "",
                features: [],
                status: "inactive",
              })
              setEditingId(null)
              setShowForm(true)
              setErrors({})
            }}
            className="gap-2"
            disabled={isEditor}
          >
            <Plus className="w-4 h-4" />
            New Course
          </Button>
        </div>
      </motion.div>

      {/* Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="sticky top-0 bg-white dark:bg-slate-900 border-b flex flex-row items-center justify-between pb-4">
              <CardTitle>{editingId ? "Edit Course" : "Create New Course"}</CardTitle>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {/* Name/Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course Name</label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value })
                    if (errors.title) setErrors({ ...errors, title: "" })
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                    errors.title ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                  )}
                  disabled={isEditor}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Level & Age Group (Category) */}
              {/* Level & Age Group (Category) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Level</label>
                  <select
                    value={formData.category || "beginner"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    disabled={isEditor}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age Group</label>
                  <input
                    type="text"
                    placeholder="e.g., 4-6 years"
                    value={formData.level || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, level: e.target.value })
                      if (errors.level) setErrors({ ...errors, level: "" })
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                      errors.level ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    )}
                    disabled={isEditor}
                  />
                  {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level}</p>}
                </div>
              </div>

              {/* Duration & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g., 6 months"
                    value={formData.duration || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, duration: e.target.value })
                      if (errors.duration) setErrors({ ...errors, duration: "" })
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                      errors.duration ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    )}
                    disabled={isEditor}
                  />
                  {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (£)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.price || 0}
                    onChange={(e) => {
                      setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                      if (errors.price) setErrors({ ...errors, price: "" })
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                      errors.price ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    )}
                    disabled={isEditor}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value })
                    if (errors.description) setErrors({ ...errors, description: "" })
                  }}
                  rows={3}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                    errors.description ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                  )}
                  disabled={isEditor}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... or /api/media/..."
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    disabled={isEditor}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Copy a URL from the Media Library and paste it here.</p>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add a feature..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (handleAddFeature(), e.preventDefault())}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    disabled={isEditor}
                  />
                  <Button onClick={handleAddFeature} size="sm" variant="outline" disabled={isEditor}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.features || []).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm">
                      <span>{feature}</span>
                      <button
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-primary hover:text-primary/70"
                        disabled={isEditor}
                        type="button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select
                  value={formData.status || "inactive"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="inactive">Inactive (Draft)</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1" disabled={isEditor}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Course
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{course.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{course.description}</p>
                        <div className="flex flex-wrap gap-3 mt-3 text-sm">
                          <span className="flex items-center gap-1 text-slate-500">Level: <span className="capitalize font-medium text-slate-700 dark:text-slate-300">{course.level}</span></span>
                          <span className="flex items-center gap-1 text-slate-500">Category: <span className="font-medium text-slate-700 dark:text-slate-300">{course.category}</span></span>
                          <span className="flex items-center gap-1 text-slate-500">Duration: <span className="font-medium text-slate-700 dark:text-slate-300">{course.duration}</span></span>
                          <span className="flex items-center gap-1 text-slate-500">£{course.price}</span>
                          <span className="flex items-center gap-1 text-slate-500">{course.totalStudents} enrolled</span>
                        </div>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium flex-shrink-0",
                        course.status === "active" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
                        course.status === "inactive" && "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
                        course.status === "archived" && "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400"
                      )}>
                        {course.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(course)}
                      disabled={isEditor}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(course.id, course.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10"
                      disabled={isEditor}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {courses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No courses yet. Create your first course to get started.</p>
          </CardContent>
        </Card>
      )}

      {isEditor && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-400">Editor Access</p>
              <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                You have limited permissions. Course creation, editing, and deletion are restricted to administrators.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
