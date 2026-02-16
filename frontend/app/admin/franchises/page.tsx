"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  MapPin,
  DollarSign,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Mail,
  Download,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getFranchises, saveFranchise, deleteFranchise, addFranchiseNote, type FranchiseApplication } from "@/lib/admin-stores"
import { cn } from "@/lib/utils"

type StatusFilter = "all" | "pending" | "reviewing" | "approved" | "rejected"

const statusConfig = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", icon: Clock },
  reviewing: { label: "Reviewing", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400", icon: XCircle },
  withdrawn: { label: "Withdrawn", color: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400", icon: XCircle },
}

export default function FranchisesPage() {
  const { session, isLoading, hasRole } = useAdminAuth()
  const [franchises, setFranchises] = useState<FranchiseApplication[]>([])
  const [mounted, setMounted] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFranchise, setSelectedFranchise] = useState<FranchiseApplication | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingNotes, setEditingNotes] = useState("")

  useEffect(() => {
    setMounted(true)
    const load = async () => {
      const data = await getFranchises()
      setFranchises(data)
    }
    load()
  }, [])

  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const filteredFranchises = franchises.filter((app) => {
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchLower) ||
      app.lastName.toLowerCase().includes(searchLower) ||
      app.email.toLowerCase().includes(searchLower) ||
      app.location.toLowerCase().includes(searchLower)
    return matchesStatus && matchesSearch
  })

  const handleStatusChange = (app: FranchiseApplication, newStatus: FranchiseApplication["status"]) => {
    // Only update local state, do not save yet
    const updated: FranchiseApplication = {
      ...app,
      status: newStatus,
      // Don't update updatedAt here, backend will do it on save
    }
    setSelectedFranchise(updated)
  }

  const handleSaveChanges = async () => {
    if (selectedFranchise) {
      try {
        // 1. Save Status / Details
        await saveFranchise(selectedFranchise)

        // 2. Save Note if present
        if (editingNotes.trim()) {
          await addFranchiseNote(selectedFranchise.id, editingNotes, session?.user?.name || "Admin")
        }

        // 3. Refresh and Close
        const newData = await getFranchises()
        setFranchises(newData)
        setShowModal(false)
        setEditingNotes("") // Reset notes
      } catch (error) {
        console.error("Failed to save", error)
        alert("Failed to save changes")
      }
    }
  }

  const handleDelete = async (app: FranchiseApplication) => {
    if (confirm(`Delete franchise application from ${app.firstName}?`)) {
      await deleteFranchise(app.id)
      const newData = await getFranchises()
      setFranchises(newData)
      setShowModal(false)
      setSelectedFranchise(null)
    }
  }

  const handleExport = () => {
    const csv = [
      ["Name", "Location", "Email", "Phone", "Investment", "Status", "Date"].join(","),
      ...filteredFranchises.map((a) =>
        [
          `"${a.firstName} ${a.lastName}"`,
          a.location,
          a.email,
          a.phone,
          a.investmentAmount,
          a.status,
          new Date(a.createdAt).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `franchises-${new Date().toISOString().split("T")[0]}.csv`
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
              <Building2 className="w-8 h-8 text-emerald-500" />
              Franchise Applications
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Review and manage franchise applications</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
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
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, location or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "pending", "reviewing", "approved", "rejected"] as const).map((status) => (
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
              {status === "all" ? "All" : statusConfig[status as keyof typeof statusConfig]?.label || status}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Franchises List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-3"
      >
        {filteredFranchises.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <p className="text-slate-500 dark:text-slate-400">No applications found</p>
            </div>
          </Card>
        ) : (
          filteredFranchises.map((app, index) => {
            const statusInfo = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.pending
            const StatusIcon = statusInfo.icon
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card
                  className="hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedFranchise(app)
                    setEditingNotes("")
                    setShowModal(true)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {app.firstName} {app.lastName}
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
                            <MapPin className="w-4 h-4" />
                            {app.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            £{app.investmentAmount || "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {app.email}
                          </span>
                        </div>
                        {app.experience && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{app.experience}</p>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                        {new Date(app.createdAt).toLocaleDateString()}
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-xs text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{franchises.length}</p>
              </div>
              {(["pending", "reviewing", "approved", "rejected"] as const).map((status) => {
                const count = franchises.filter((a) => a.status === status).length
                return (
                  <div key={status} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <p className="text-xs text-slate-600 dark:text-slate-400">{statusConfig[status]?.label || status}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{count}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal */}
      {showModal && selectedFranchise && (
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
                Application Details
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
                      {selectedFranchise.firstName} {selectedFranchise.lastName}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">{selectedFranchise.email}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Phone</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">{selectedFranchise.phone}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Date Applied</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">
                      {new Date(selectedFranchise.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Franchise Info */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Franchise Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Location</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">{selectedFranchise.location}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Investment Range</p>
                    <p className="font-medium text-slate-900 dark:text-white mt-1">£{selectedFranchise.investmentAmount || "N/A"}</p>
                  </div>
                  {selectedFranchise.experience && (
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700 sm:col-span-2">
                      <p className="text-xs text-slate-600 dark:text-slate-400">Background</p>
                      <p className="text-slate-700 dark:text-slate-300 mt-1">{selectedFranchise.experience}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              {selectedFranchise.motivation && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Motivation / Message</h3>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{selectedFranchise.motivation}</p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {(["pending", "reviewing", "approved", "rejected"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusChange(selectedFranchise, status)}
                      className={cn(
                        "px-3 py-2 rounded-lg font-medium text-sm transition-all",
                        selectedFranchise.status === status
                          ? statusConfig[status]?.color || "bg-gray-100"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                      )}
                    >
                      {statusConfig[status]?.label || status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Add Note</h3>
                <textarea
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add internal note..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent"
                />

                {/* Note History */}
                {selectedFranchise.notes && Array.isArray(selectedFranchise.notes) && selectedFranchise.notes.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">History</h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 max-h-40 overflow-y-auto space-y-3">
                      {selectedFranchise.notes.map((note: any) => (
                        <div key={note.id} className="text-sm">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>{note.author}</span>
                            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  onClick={handleSaveChanges}
                  className="bg-gradient-to-r from-primary to-accent text-white flex-1"
                >
                  Save Changes
                </Button>
                {hasRole("admin") && (
                  <Button
                    onClick={() => handleDelete(selectedFranchise)}
                    variant="outline"
                    className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
