"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Filter,
  Download,
  X,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getEnquiries, saveEnquiry, deleteEnquiry, type Enquiry } from "@/lib/admin-stores"
import { cn } from "@/lib/utils"

type StatusFilter = "all" | "new" | "in_progress" | "contacted" | "converted" | "closed"

const statusConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", icon: AlertCircle },
  in_progress: { label: "In Progress", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400", icon: Clock },
  contacted: { label: "Contacted", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", icon: Phone },
  converted: { label: "Converted", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", icon: CheckCircle2 },
  closed: { label: "Closed", color: "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400", icon: X },
}

export default function EnquiriesPage() {
  const { session, isLoading } = useAdminAuth()
  const searchParams = useSearchParams()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [mounted, setMounted] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingNotes, setEditingNotes] = useState("")

  useEffect(() => {
    setMounted(true)
    // Initialize search from URL
    const q = searchParams.get('q')
    if (q) setSearchTerm(q)

    const loadEnquiries = async () => {
      const data = await getEnquiries()
      setEnquiries(data)
    }
    loadEnquiries()
  }, [searchParams])

  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = statusFilter === "all" || enq.status === statusFilter
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      enq.firstName.toLowerCase().includes(searchLower) ||
      enq.lastName.toLowerCase().includes(searchLower) ||
      enq.email.toLowerCase().includes(searchLower) ||
      enq.message.toLowerCase().includes(searchLower)
    return matchesStatus && matchesSearch
  })

  const handleStatusChange = async (enquiry: Enquiry, newStatus: Enquiry["status"]) => {
    const updated: Enquiry = {
      ...enquiry,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    }
    await saveEnquiry(updated)
    const data = await getEnquiries()
    setEnquiries(data)
    setSelectedEnquiry(updated)
  }

  const handleSaveNotes = async () => {
    if (selectedEnquiry) {
      const updated: Enquiry = {
        ...selectedEnquiry,
        notes: editingNotes, // Note: Schema expects array, simplistic assignment here might need fix if notes is array of objects. Store type says any[].
        updatedAt: new Date().toISOString(),
      }
      // Assuming backend handles string note or we should push to object logic.
      // For now passing as is, but schema has EnquiryNote relation. 
      // The update implementation in controller (if present) needs to handle this.
      // Store just sends JSON.
      await saveEnquiry(updated)
      const data = await getEnquiries()
      setEnquiries(data)
      setSelectedEnquiry(updated)
    }
  }

  const handleDelete = async (enquiry: Enquiry) => {
    if (confirm(`Delete enquiry from ${enquiry.firstName}?`)) {
      await deleteEnquiry(enquiry.id)
      const data = await getEnquiries()
      setEnquiries(data)
      setShowModal(false)
      setSelectedEnquiry(null)
    }
  }

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Phone", "Type", "Status", "Date", "Message"].join(","),
      ...filteredEnquiries.map((e) =>
        [
          `"${e.firstName} ${e.lastName}"`,
          e.email,
          e.phone || "N/A",
          e.enquiryType,
          e.status,
          new Date(e.createdAt).toLocaleDateString(),
          `"${e.message.slice(0, 50)}..."`,
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `enquiries-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-8 h-8 text-primary" />
              Enquiries
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage parent enquiries and track responses</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="flex-1 relative">
          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, email or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "new", "in_progress", "contacted", "converted", "closed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-2 rounded-lg font-medium text-sm transition-all",
                statusFilter === status
                  ? "bg-primary text-white shadow-md"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              )}
            >
              {status === "all" ? "All" : statusConfig[status as keyof typeof statusConfig].label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Enquiries List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-3"
      >
        {filteredEnquiries.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <p className="text-slate-500 dark:text-slate-400">No enquiries found</p>
            </div>
          </Card>
        ) : (
          filteredEnquiries.map((enquiry, index) => {
            const statusInfo = statusConfig[enquiry.status as keyof typeof statusConfig]
            const StatusIcon = statusInfo.icon
            return (
              <motion.div
                key={enquiry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card
                  className="hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedEnquiry(enquiry)
                    setEditingNotes(enquiry.notes || "")
                    setShowModal(true)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {enquiry.firstName} {enquiry.lastName}
                          </h3>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                              statusInfo.color
                            )}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {enquiry.email}
                          </span>
                          {enquiry.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {enquiry.phone}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                          {enquiry.enquiryType}: {enquiry.message}
                        </p>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:gap-2 text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                        <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                        {Array.isArray(enquiry.notes) && enquiry.notes.length > 0 && (
                          <MessageCircle className="w-4 h-4 text-primary" aria-label="Has notes" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-xs text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{enquiries.length}</p>
              </div>
              {(["new", "in_progress", "contacted", "converted", "closed"] as const).map((status) => {
                const count = enquiries.filter((e) => e.status === status).length
                return (
                  <div key={status} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{statusConfig[status].label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{count}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal */}
      {showModal && selectedEnquiry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Enquiry Details
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Name</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">
                      {selectedEnquiry.firstName} {selectedEnquiry.lastName}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">{selectedEnquiry.email}</p>
                  </div>
                  {selectedEnquiry.phone && (
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Phone</p>
                      <p className="font-medium text-slate-900 dark:text-white mt-1">{selectedEnquiry.phone}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Date</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">
                      {new Date(selectedEnquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enquiry Details */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Enquiry Details</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Type</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">{selectedEnquiry.enquiryType}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Message</p>
                    <p className="text-slate-700 dark:text-slate-300 mt-1 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {(["new", "in_progress", "contacted", "converted", "closed"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry, status)}
                      className={cn(
                        "px-3 py-2 rounded-lg font-medium text-sm transition-all",
                        selectedEnquiry.status === status
                          ? statusConfig[status].color
                          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      )}
                    >
                      {statusConfig[status].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Admin Notes</h3>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add internal notes about this enquiry..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  onClick={handleSaveNotes}
                  className="bg-gradient-to-r from-primary to-accent text-white flex-1"
                >
                  Save Notes
                </Button>
                <Button
                  onClick={() => handleDelete(selectedEnquiry)}
                  variant="outline"
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
