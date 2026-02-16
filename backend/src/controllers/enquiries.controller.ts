import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const getEnquiries = async (req: Request, res: Response) => {
    try {
        const enquiries = await prisma.enquiry.findMany({
            include: { notes: true },
            orderBy: { createdAt: 'desc' }
        })
        res.json(enquiries)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching enquiries' })
    }
}

export const getEnquiryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const enquiry = await prisma.enquiry.findUnique({
            where: { id },
            include: { notes: true }
        })
        if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' })
        res.json(enquiry)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching enquiry' })
    }
}

export const createEnquiry = async (req: Request, res: Response) => {
    try {
        const enquiry = await prisma.enquiry.create({
            data: req.body
        })
        res.status(201).json(enquiry)
    } catch (error) {
        res.status(500).json({ error: 'Error creating enquiry' })
    }
}

export const updateEnquiry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { id: _, createdAt, updatedAt, notes, ...updateData } = req.body
        const enquiry = await prisma.enquiry.update({
            where: { id },
            data: updateData
        })
        res.json(enquiry)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating enquiry' })
    }
}

export const addNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { content, author } = req.body
        const note = await prisma.enquiryNote.create({
            data: {
                content,
                author,
                enquiryId: id
            }
        })
        res.status(201).json(note)
    } catch (error) {
        res.status(500).json({ error: 'Error adding note' })
    }
}
