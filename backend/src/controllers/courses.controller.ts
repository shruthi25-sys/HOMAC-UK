import { Request, Response } from 'express'
import prisma from '../utils/prisma'

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.course.findMany({
            include: { modules: true }
        })
        res.json(courses)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching courses' })
    }
}

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const course = await prisma.course.findUnique({
            where: { id },
            include: { modules: true }
        })
        if (!course) return res.status(404).json({ error: 'Course not found' })
        res.json(course)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching course' })
    }
}

export const getCourseBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params
        const course = await prisma.course.findUnique({
            where: { slug },
            include: { modules: true }
        })
        if (!course) return res.status(404).json({ error: 'Course not found' })
        res.json(course)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching course' })
    }
}

export const createCourse = async (req: Request, res: Response) => {
    try {
        const { modules, ...courseData } = req.body
        const course = await prisma.course.create({
            data: {
                ...courseData,
                modules: {
                    create: modules
                }
            },
            include: { modules: true }
        })
        res.status(201).json(course)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating course' })
    }
}

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { modules, ...courseData } = req.body

        // Simple update strategy: update course fields, handling modules is complex (update/create/delete)
        // For now, we'll update basic fields. 
        // A robust implementation would reconcile modules.

        const course = await prisma.course.update({
            where: { id },
            data: courseData
        })
        res.json(course)
    } catch (error) {
        res.status(500).json({ error: 'Error updating course' })
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.course.delete({ where: { id } })
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting course' })
    }
}
