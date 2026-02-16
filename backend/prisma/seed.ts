import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    // Create Admin User
    const password = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@homac.com' },
        update: {},
        create: {
            email: 'admin@homac.com',
            firstName: 'Super',
            lastName: 'Admin',
            password,
        },
    })

    // Create Courses
    await prisma.course.createMany({
        data: [
            {
                id: "course-1",
                title: "Beginner Abacus",
                description: "Learn the fundamentals of abacus and mental arithmetic",
                shortDescription: "Perfect for children aged 4-6",
                slug: "beginner-abacus",
                category: "beginner",
                level: "Beginner",
                duration: "3 months",
                price: 199,
                instructor: "Ms. Sarah Ahmed",
                totalStudents: 245,
                rating: 4.8,
                features: ["Live Classes", "Interactive Practice", "Progress Tracking", "Certificate"],
                status: "active",
            },
            {
                id: "course-2",
                title: "Intermediate Abacus",
                description: "Advanced abacus techniques and mental math strategies",
                shortDescription: "For students with basic abacus knowledge",
                slug: "intermediate-abacus",
                category: "intermediate",
                level: "Intermediate",
                duration: "4 months",
                price: 249,
                instructor: "Mr. David Kumar",
                totalStudents: 178,
                rating: 4.9,
                features: ["Expert Coaching", "1-on-1 Sessions", "Competition Ready", "Certificate"],
                status: "active",
            },
        ],
        skipDuplicates: true,
    })

    // Create Testimonials
    await prisma.testimonial.createMany({
        data: [
            {
                name: "Sarah Johnson",
                role: "Parent",
                content: "My son's confidence in maths improved dramatically in just 3 months. The teachers are incredible!",
                rating: 5,
                image: "/happy-mother-portrait.jpg",
                featured: true,
                status: "approved"
            },
            {
                name: "Aisha Patel",
                role: "Student",
                content: "Learning abacus has made mental maths so much fun. I never thought numbers could be this exciting!",
                rating: 5,
                image: "/young-student-girl-smiling.jpg",
                featured: true,
                status: "approved"
            },
            {
                name: "Michael Chen",
                role: "Parent",
                content: "Worth every penny. The structured approach and progress tracking give us full confidence.",
                rating: 5,
                image: "/father-portrait-smiling.jpg",
                featured: true,
                status: "approved"
            }
        ],
        skipDuplicates: true,
    })

    // Create Enquiries
    await prisma.enquiry.createMany({
        data: [
            {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                message: "Im interested in enrolling my 5 year old. Do you have weekend slots?",
                status: "new",
                priority: "medium",
                source: "website"
            },
            {
                firstName: "Emily",
                lastName: "Smith",
                email: "emily.s@example.com",
                message: "What is the fee structure for the intermediate course?",
                status: "in_progress",
                priority: "high",
                source: "referral"
            }
        ],
        skipDuplicates: true
    })

    // Create Franchise Applications
    await prisma.franchiseApplication.createMany({
        data: [
            {
                firstName: "Robert",
                lastName: "Brown",
                email: "robert.brown@business.com",
                phone: "+44 7700 900077",
                location: "Manchester",
                businessName: "Brown Learning Center",
                experience: "10 years in education sector",
                status: "pending",
                investmentAmount: "50000-100000"
            },
            {
                firstName: "Sarah",
                lastName: "Wilson",
                email: "s.wilson@edu.co.uk",
                phone: "+44 7700 900088",
                location: "Birmingham",
                experience: "Former school principal",
                status: "reviewing",
                investmentAmount: "25000-50000"
            }
        ],
        skipDuplicates: true
    })

    console.log('Seed data inserted')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
