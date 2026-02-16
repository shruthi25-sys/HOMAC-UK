"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  X,
  Save,
  AlertCircle,
  Star,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getTestimonials, saveTestimonial, deleteTestimonial } from "@/lib/admin-stores"
import { canPerformAction, logAuditEvent } from "@/lib/admin-auth"

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
  featured: boolean
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
}

export default function TestimonialsManagement() {
  const { session, isLoading } = useAdminAuth()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: "",
    role: "",
    content: "",
    rating: 5,
    image: "",
    featured: false,
    status: "pending",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const load = async () => {
      const data = await getTestimonials()
      setTestimonials(data)
    }
    load()
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name?.trim()) newErrors.name = "Name is required"
    if (!formData.role?.trim()) newErrors.role = "Role is required"
    if (!formData.content?.trim()) newErrors.content = "Testimonial content is required"
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) newErrors.rating = "Rating must be between 1 and 5"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    const now = new Date().toISOString()
    const baseData = {
      name: formData.name || "",
      role: formData.role || "",
      content: formData.content || "",
      rating: formData.rating || 5,
      image: formData.image || "",
      featured: formData.featured || false,
      status: formData.status || "pending",
    }

    if (editingId) {
      const original = testimonials.find((t) => t.id === editingId)
      await saveTestimonial({
        ...baseData,
        id: editingId,
        createdAt: original?.createdAt || now,
        updatedAt: now,
      })
      logAuditEvent("testimonial_updated", { id: editingId, name: baseData.name }, session?.user || null)
    } else {
      await saveTestimonial({
        ...baseData,
        createdAt: now,
        updatedAt: now,
      } as any)
      logAuditEvent("testimonial_created", { name: baseData.name }, session?.user || null)
    }

    const data = await getTestimonials()
    setTestimonials(data)

    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: "",
      role: "",
      content: "",
      rating: 5,
      image: "",
      featured: false,
      status: "pending",
    })
  }

  const handleEdit = (testimonial: Testimonial) => {
    setFormData(testimonial)
    setEditingId(testimonial.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (canPerformAction("delete_content")) {
      const testimonial = testimonials.find((t) => t.id === id)
      if (window.confirm(`Delete testimonial from "${testimonial?.name}"?`)) {
        await deleteTestimonial(id)
        logAuditEvent("testimonial_deleted", { id }, session?.user || null)
        const data = await getTestimonials()
        setTestimonials(data)
      }
    }
  }

  const handleApprove = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id)
    if (testimonial) {
      await saveTestimonial({ ...testimonial, status: "approved", updatedAt: new Date().toISOString() })
      logAuditEvent("testimonial_approved", { id }, session?.user || null)
      const data = await getTestimonials()
      setTestimonials(data)
    }
  }

  const handleToggleFeatured = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id)
    if (testimonial) {
      await saveTestimonial({ ...testimonial, featured: !testimonial.featured, updatedAt: new Date().toISOString() })
      logAuditEvent("testimonial_featured_toggled", { id, featured: !testimonial.featured }, session?.user || null)
      const data = await getTestimonials()
      setTestimonials(data)
    }
  }

  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isEditor = session?.user.role === "editor"
  const filteredTestimonials = filterStatus === "all"
    ? testimonials
    : testimonials.filter((t) => t.status === filterStatus)

  const statuses = {
    pending: { label: "Pending Approval", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", icon: Clock },
    approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", icon: CheckCircle2 },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400", icon: X },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Testimonials Management</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and approve customer testimonials</p>
          </div>
          <Button
            onClick={() => {
              setFormData({
                name: "",
                role: "",
                content: "",
                content: "",
                rating: 5,
                image: "",
                featured: false,
                status: "pending",
              })
              setEditingId(null)
              setShowForm(true)
              setErrors({})
            }}
            className="gap-2"
            disabled={isEditor}
          >
            <Plus className="w-4 h-4" />
            New Testimonial
          </Button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              filterStatus === status
                ? "bg-primary text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            {status === "all" ? "All" : statuses[status as keyof typeof statuses].label}
          </button>
        ))}
      </div>

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
              <CardTitle>{editingId ? "Edit Testimonial" : "New Testimonial"}</CardTitle>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {/* Name & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: "" })
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                      errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    )}
                    disabled={isEditor}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <input
                    type="text"
                    placeholder="e.g., Parent, Student"
                    value={formData.role || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, role: e.target.value })
                      if (errors.role) setErrors({ ...errors, role: "" })
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                      errors.role ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    )}
                    disabled={isEditor}
                  />
                  {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Testimonial Content</label>
                <textarea
                  value={formData.content || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, content: e.target.value })
                    if (errors.content) setErrors({ ...errors, content: "" })
                  }}
                  rows={4}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white",
                    errors.content ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                  )}
                  disabled={isEditor}
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={cn(
                        "transition-colors",
                        (formData.rating || 0) >= star ? "text-amber-400" : "text-slate-300"
                      )}
                      disabled={isEditor}
                      type="button"
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
              </div>

              {/* Status & Featured */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status || "pending"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded"
                      disabled={isEditor}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Feature on homepage</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1" disabled={isEditor}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Testimonial
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTestimonials.map((testimonial, idx) => {
          const statusConfig = statuses[testimonial.status as keyof typeof statuses]
          const StatusIcon = statusConfig.icon
          return (
            <motion.div
              key={testimonial.id}
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
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{testimonial.name}</h3>
                            {testimonial.featured && (
                              <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-xs font-medium rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                          <blockquote className="mt-2 italic text-slate-700 dark:text-slate-300 border-l-4 border-primary pl-3">
                            "{testimonial.content}"
                          </blockquote>
                          <div className="flex items-center gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "w-4 h-4",
                                  star <= testimonial.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-medium flex-shrink-0", statusConfig.color)}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {testimonial.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(testimonial.id)}
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFeatured(testimonial.id)}
                        className={testimonial.featured ? "text-amber-600" : ""}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(testimonial)}
                        disabled={isEditor}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(testimonial.id)}
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
          )
        })}
      </div>

      {filteredTestimonials.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No testimonials yet. Create your first testimonial to get started.</p>
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
                You have limited permissions. Testimonial creation, editing, and deletion are restricted to administrators.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
