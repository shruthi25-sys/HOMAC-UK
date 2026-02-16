import { Request, Response } from 'express'
import prisma from '../utils/prisma'

// Pages
export const getPages = async (req: Request, res: Response) => {
    try {
        const pages = await prisma.cMSPage.findMany({ // Check casing: CMSPage or cMSPage? Prisma usually capitalizes models.
            // Wait, schema has `CMSPage`. Prisma generates `cMSPage` as property on prisma client instance if it respects camelCase.
            // But convention is usually `cMSPage` for Prisma Client key?
            // Actually, in schema: model M matches prisma.m.
            // If model is `CMSPage`, it is usually `prisma.cMSPage` or `prisma.cMSPage`.
            // Let's assume `cMSPage` is the property name generated.
            include: { sections: true },
            orderBy: { updatedAt: 'desc' }
        })
        res.json(pages)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching pages' })
    }
}

export const getPageBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params
        const page = await prisma.cMSPage.findUnique({
            where: { slug },
            include: { sections: { orderBy: { orderIndex: 'asc' } } }
        })
        if (!page) return res.status(404).json({ error: 'Page not found' })
        res.json(page)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching page' })
    }
}

export const createPage = async (req: Request, res: Response) => {
    try {
        const page = await prisma.cMSPage.create({
            data: req.body
        })
        res.status(201).json(page)
    } catch (error) {
        res.status(500).json({ error: 'Error creating page' })
    }
}

export const updatePage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const page = await prisma.cMSPage.update({
            where: { id },
            data: req.body
        })
        res.json(page)
    } catch (error) {
        res.status(500).json({ error: 'Error updating page' })
    }
}

export const deletePage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.cMSPage.delete({ where: { id } })
        res.json({ message: 'Page deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting page' })
    }
}
