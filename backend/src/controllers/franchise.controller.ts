import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const getApplications = async (req: Request, res: Response) => {
    try {
        const applications = await prisma.franchiseApplication.findMany({
            include: { notes: true },
            orderBy: { createdAt: 'desc' }
        })
        res.json(applications)
    } catch (error) {
        console.error("Error in getApplications:", error)
        res.status(500).json({ error: 'Error fetching applications' })
    }
}

export const getApplicationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const application = await prisma.franchiseApplication.findUnique({
            where: { id },
            include: { notes: true }
        })
        if (!application) return res.status(404).json({ error: 'Application not found' })
        res.json(application)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching application' })
    }
}

export const createApplication = async (req: Request, res: Response) => {
    try {
        const application = await prisma.franchiseApplication.create({
            data: req.body
        })
        res.status(201).json(application)
    } catch (error) {
        res.status(500).json({ error: 'Error creating application' })
    }
}

export const updateApplication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { id: _, createdAt, updatedAt, notes, ...updateData } = req.body
        const application = await prisma.franchiseApplication.update({
            where: { id },
            data: updateData
        })
        res.json(application)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating application' })
    }
}

export const addNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { content, author } = req.body
        const note = await prisma.franchiseNote.create({
            data: {
                content,
                author,
                franchiseId: id
            }
        })
        res.status(201).json(note)
    } catch (error) {
        res.status(500).json({ error: 'Error adding note' })
    }
}
