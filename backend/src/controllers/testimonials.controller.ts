import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const getTestimonials = async (req: Request, res: Response) => {
    try {
        const { status } = req.query
        const where = status ? { status: String(status) } : {}
        const testimonials = await prisma.testimonial.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        })
        res.json(testimonials)
    } catch (error) {
        console.error("Error in getTestimonials:", error)
        res.status(500).json({ error: 'Error fetching testimonials' })
    }
}

export const createTestimonial = async (req: Request, res: Response) => {
    try {
        const testimonial = await prisma.testimonial.create({
            data: req.body
        })
        res.status(201).json(testimonial)
    } catch (error) {
        res.status(500).json({ error: 'Error creating testimonial' })
    }
}

export const updateTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: req.body
        })
        res.json(testimonial)
    } catch (error) {
        res.status(500).json({ error: 'Error updating testimonial' })
    }
}

export const deleteTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.testimonial.delete({ where: { id } })
        res.json({ message: 'Testimonial deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting testimonial' })
    }
}
