"use client"

import React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Upload,
  Trash2,
  Copy,
  Download,
  AlertCircle,
  X,
  FileText,
  ImageIcon,
  LayoutGrid,
  Edit2,
  Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getMediaAssets, saveMediaAsset, updateMediaAsset, deleteMediaAsset } from "@/lib/admin-stores"
import { canPerformAction, logAuditEvent } from "@/lib/admin-auth"

export interface MediaAsset {
  id: string
  name: string
  type: "image" | "video" | "document"
  url: string
  size: number
  uploadedBy: string
  createdAt: string
  // Gallery fields
  isGallery?: boolean
  galleryYear?: number
  title?: string
  caption?: string
  location?: string
  orderIndex?: number
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]

export default function MediaLibrary() {
  const { session, isLoading } = useAdminAuth()
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [filterType, setFilterType] = useState<"all" | "image" | "video" | "document">("all")
  const [uploadError, setUploadError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Gallery State
  const [viewMode, setViewMode] = useState<"library" | "gallery">("library")
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [editingAsset, setEditingAsset] = useState<MediaAsset | null>(null)
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    caption: "",
    location: "",
    year: new Date().getFullYear(),
    file: null as File | null
  })

  useEffect(() => {
    setMounted(true)
    const load = async () => {
      const data = await getMediaAssets()
      setAssets(data)
    }
    load()
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setUploading(true)
    setUploadError("")

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Validate file
        if (!ALLOWED_TYPES.includes(file.type)) {
          setUploadError("Only JPEG, PNG, GIF, and WebP images are allowed")
          continue
        }

        if (file.size > MAX_FILE_SIZE) {
          setUploadError("File size must be less than 5MB")
          continue
        }

        // In a real app, you'd upload to a cloud service like Vercel Blob
        // For now, we'll simulate it with a data URL
        const reader = new FileReader()

        await new Promise<void>((resolve) => {
          reader.onload = async (e) => {
            const asset: MediaAsset = {
              id: `media-${Date.now()}-${i}`,
              name: file.name,
              type: "image",
              url: e.target?.result as string,
              size: file.size,
              uploadedBy: session?.user.name || "Unknown",
              createdAt: new Date().toISOString(),
            }

            await saveMediaAsset(asset)
            logAuditEvent("media_uploaded", { id: asset.id, name: asset.name, size: asset.size }, session?.user || null)
            const data = await getMediaAssets()
            setAssets(data)
            resolve()
          }
          reader.readAsDataURL(file)
        })
      }
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (canPerformAction("delete_content")) {
      const asset = assets.find((a) => a.id === id)
      if (window.confirm(`Delete "${asset?.name}"?`)) {
        await deleteMediaAsset(id)
        logAuditEvent("media_deleted", { id, name: asset?.name }, session?.user || null)
        const data = await getMediaAssets()
        setAssets(data)
      }
    }
  }

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleGallerySave = async () => {
    setUploading(true)
    try {
      let assetToSave: any = {}

      if (editingAsset) {
        // Updating existing
        await updateMediaAsset(editingAsset.id, {
          isGallery: true,
          galleryYear: galleryForm.year,
          title: galleryForm.title,
          caption: galleryForm.caption,
          location: galleryForm.location
        })
        logAuditEvent("gallery_updated", { id: editingAsset.id, title: galleryForm.title }, session?.user || null)
      } else {
        // Creating new
        if (!galleryForm.file) return

        const file = galleryForm.file
        const reader = new FileReader()

        await new Promise<void>((resolve) => {
          reader.onload = async (e) => {
            const asset = {
              name: file.name,
              type: "image",
              url: e.target?.result as string,
              size: file.size,
              uploadedBy: session?.user.name || "Unknown",
              isGallery: true,
              galleryYear: galleryForm.year,
              title: galleryForm.title,
              caption: galleryForm.caption,
              location: galleryForm.location
            }
            await saveMediaAsset(asset)
            resolve()
          }
          reader.readAsDataURL(file)
        })
        logAuditEvent("gallery_created", { title: galleryForm.title }, session?.user || null)
      }

      const data = await getMediaAssets()
      setAssets(data)
      setShowGalleryModal(false)
      setEditingAsset(null)
      setGalleryForm({ title: "", caption: "", location: "", year: new Date().getFullYear(), file: null })
    } catch (e) {
      console.error(e)
      setUploadError("Failed to save gallery item")
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const isEditor = session?.user.role === "editor"
  const filteredAssets = filterType === "all" ? assets : assets.filter((a) => a.type === filterType)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Media & Gallery</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage assets and organizational memories</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("library")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                viewMode === "library" ? "bg-white dark:bg-slate-700 shadow text-primary" : "text-slate-600 dark:text-slate-400"
              )}
            >
              <ImageIcon className="w-4 h-4" />
              Library
            </button>
            <button
              onClick={() => setViewMode("gallery")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                viewMode === "gallery" ? "bg-white dark:bg-slate-700 shadow text-primary" : "text-slate-600 dark:text-slate-400"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Memory Lane
            </button>
          </div>
        </div>
      </motion.div>

      {/* VIEW: MEDIA LIBRARY */}
      {viewMode === "library" && (
        <div className="space-y-6">
          {/* Upload Area */}
          {!isEditor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="border-2 border-dashed border-slate-300 dark:border-slate-600">
                <CardContent className="p-8">
                  <label className="cursor-pointer block">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {uploading ? "Uploading..." : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          PNG, JPG, GIF or WebP (Max. 5MB)
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </CardContent>
              </Card>
              {uploadError && (
                <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="font-medium text-red-800 dark:text-red-400">{uploadError}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "image", "video", "document"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  filterType === type
                    ? "bg-primary text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                {type === "all" ? "All Files" : type.charAt(0).toUpperCase() + type.slice(1) + "s"}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssets.map((asset, idx) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center relative">
                    {asset.type === "image" ? (
                      <img src={asset.url || "/placeholder.svg"} alt={asset.name} className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="w-12 h-12 text-slate-400" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <Button size="sm" variant="outline" className="bg-white text-slate-900" onClick={() => handleCopyUrl(asset.url, asset.id)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white text-slate-900" onClick={() => handleDownload(asset.url, asset.name)}>
                        <Download className="w-4 h-4" />
                      </Button>
                      {!isEditor && (
                        <Button size="sm" variant="outline" className="bg-white text-red-600" onClick={() => handleDelete(asset.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate text-sm">{asset.name}</h3>
                    <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <p>Size: {formatFileSize(asset.size)}</p>
                      <p>Uploaded: {formatDate(asset.createdAt)}</p>
                    </div>
                    {copiedId === asset.id && (
                      <div className="mt-3 p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                        URL copied to clipboard
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: MEMORY LANE (GALLERY) */}
      {viewMode === "gallery" && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Memory Lane</h2>
            <Button onClick={() => {
              setEditingAsset(null)
              setGalleryForm({ title: "", caption: "", location: "", year: new Date().getFullYear(), file: null })
              setShowGalleryModal(true)
            }}>
              <Plus className="w-4 h-4 mr-2" /> Add Memory
            </Button>
          </div>

          {/* Grouped by Year */}
          {Array.from(new Set(assets.filter(a => a.isGallery && a.galleryYear).map(a => a.galleryYear)))
            .sort((a, b) => (b || 0) - (a || 0))
            .map(year => (
              <div key={year} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b pb-2">{year} Memories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assets.filter(a => a.isGallery && a.galleryYear === year).map((asset) => (
                    <Card key={asset.id} className="group relative">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                        <img src={asset.url} alt={asset.title || asset.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" onClick={() => {
                            setEditingAsset(asset)
                            setGalleryForm({
                              title: asset.title || "",
                              caption: asset.caption || "",
                              location: asset.location || "",
                              year: asset.galleryYear || new Date().getFullYear(),
                              file: null
                            })
                            setShowGalleryModal(true)
                          }}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(asset.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">{asset.title || "Untitled Memory"}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{asset.caption || "No caption"}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

          {assets.filter(a => a.isGallery).length === 0 && (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed">
              <LayoutGrid className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No memories added yet. Start building your Memory Lane!</p>
            </div>
          )}
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowGalleryModal(false)}>
          <Card className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingAsset ? "Edit Memory" : "New Memory"}</CardTitle>
              <button onClick={() => setShowGalleryModal(false)}><X className="w-5 h-5" /></button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  value={galleryForm.year}
                  onChange={e => setGalleryForm({ ...galleryForm, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. Annual Sports Day"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location {/* Optional */}</label>
                <input
                  type="text"
                  value={galleryForm.location}
                  onChange={e => setGalleryForm({ ...galleryForm, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. London, UK"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Caption</label>
                <textarea
                  value={galleryForm.caption}
                  onChange={e => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Describe the memory..."
                />
              </div>
              {!editingAsset && (
                <div>
                  <label className="block text-sm font-medium mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => e.target.files && setGalleryForm({ ...galleryForm, file: e.target.files[0] })}
                    className="w-full"
                  />
                </div>
              )}
              <div className="pt-4 flex gap-2">
                <Button className="flex-1" onClick={handleGallerySave} disabled={uploading || (!editingAsset && !galleryForm.file)}>
                  {uploading ? "Saving..." : "Save Memory"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  )
}
