import { Request, Response } from 'express'
import prisma from '../utils/prisma'
// import bcrypt from 'bcryptjs' // Uncomment when bcrypt is installed

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                status: true,
                createdAt: true,
                // Exclude password
            }
        })
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: { id },
            include: { enrollments: true }
        })
        if (!user) return res.status(404).json({ error: 'User not found' })

        const { password, ...userWithoutPassword } = user
        res.json(userWithoutPassword)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName, role, phone } = req.body

        // Basic hashing placeholder - replace with bcrypt
        // const hashedPassword = await bcrypt.hash(password, 10)
        const hashedPassword = password // Placeholder!

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: role || 'student',
                phone
            }
        })

        const { password: _, ...userWithoutPassword } = user
        res.status(201).json(userWithoutPassword)
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { password, ...data } = req.body

        let updateData: any = { ...data }

        if (password) {
            // updateData.password = await bcrypt.hash(password, 10)
            updateData.password = password
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData
        })

        const { password: _, ...userWithoutPassword } = user
        res.json(userWithoutPassword)
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.user.delete({ where: { id } })
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' })
    }
}
