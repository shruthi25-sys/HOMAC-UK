import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const getMedia = async (req: Request, res: Response) => {
    try {
        const { isGallery } = req.query
        const where = isGallery === 'true' ? { isGallery: true } : {}

        const media = await prisma.mediaAsset.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        })
        res.json(media.map(m => ({ ...m, type: m.assetType })))
    } catch (error) {
        console.error("Error in getMedia:", error)
        res.status(500).json({ error: 'Error fetching media' })
    }
}

export const createMedia = async (req: Request, res: Response) => {
    try {
        const { name, type, url, size, uploadedBy, isGallery, galleryYear, title, caption, location, orderIndex } = req.body
        const media = await prisma.mediaAsset.create({
            data: {
                name,
                assetType: type,
                url,
                size,
                uploadedBy,
                isGallery: isGallery || false,
                galleryYear: galleryYear ? parseInt(galleryYear) : null,
                title: title || null,
                caption: caption || null,
                location: location || null,
                orderIndex: orderIndex ? parseInt(orderIndex) : 0
            }
        })
        res.status(201).json(media)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating media asset' })
    }
}

export const updateMedia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { isGallery, galleryYear, title, caption, location, orderIndex } = req.body
        const media = await prisma.mediaAsset.update({
            where: { id },
            data: {
                isGallery,
                galleryYear: galleryYear ? parseInt(galleryYear) : undefined,
                title,
                caption,
                location,
                orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : undefined
            }
        })
        res.json(media)
    } catch (error) {
        res.status(500).json({ error: 'Error updating media asset' })
    }
}

export const deleteMedia = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.mediaAsset.delete({ where: { id } })
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting media asset' })
    }
}
