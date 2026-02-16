"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import {
    Clock,
    Users,
    Star,
    CheckCircle2,
    ArrowRight,
    BookOpen,
    Calendar,
    Award,
    ChevronLeft,
    Share2,
    AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/footer/footer"
import { getCourseBySlug, type Course } from "@/lib/courses-store"

export default function CourseDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [course, setCourse] = useState<Course | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadCourse = async () => {
            if (!params.slug) return
            try {
                const data = await getCourseBySlug(params.slug as string)
                if (!data) {
                    // Handle 404 or redirect
                }
                setCourse(data || null)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        loadCourse()
    }, [params.slug])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <AlertCircle className="w-16 h-16 text-amber-500" />
                <h1 className="text-2xl font-bold text-slate-800">Course Not Found</h1>
                <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
            </div>
        )
    }

    return (
        <>
            <Navbar />

            <div className="pt-20 min-h-screen bg-white pb-20">
                {/* Breadcrumb / Back */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/courses" className="inline-flex items-center text-slate-500 hover:text-primary transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Courses
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Header Image & Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
                            >
                                <div className="h-64 sm:h-80 bg-slate-200 relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${course.category === 'beginner' ? 'from-amber-300 to-orange-400' :
                                        course.category === 'intermediate' ? 'from-teal-300 to-emerald-400' :
                                            'from-blue-300 to-indigo-400'
                                        }`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BookOpen className="text-white w-20 h-20 opacity-30" />
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold capitalize">
                                            {course.category}
                                        </span>
                                        {(course.rating || 0) > 0 && (
                                            <span className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                                                <Star fill="currentColor" className="w-4 h-4" />
                                                {Number(course.rating).toFixed(1)}
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{course.title}</h1>
                                    <p className="text-lg text-slate-600 leading-relaxed">{course.description}</p>
                                </div>
                            </motion.div>

                            {/* Features / Modules */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {course.features && course.features.length > 0 ? (
                                        course.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5" />
                                                <span className="text-slate-600">{feature}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-500 italic col-span-2">Course details coming soon.</p>
                                    )}
                                </div>
                            </div>

                            {/* Description Details */}
                            {course.shortDescription && (
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-6">About This Course</h2>
                                    <div className="prose prose-slate max-w-none text-slate-600">
                                        {course.shortDescription}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <Card className="p-6 rounded-3xl shadow-lg border-t-4 border-primary">
                                    <div className="text-3xl font-bold text-slate-900 mb-2">
                                        £{course.price}
                                        <span className="text-base font-normal text-slate-500 ml-2">/ course</span>
                                    </div>

                                    <div className="space-y-4 my-6">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Clock className="w-5 h-5 text-slate-400" />
                                            <span>Duration: <span className="font-semibold text-slate-900">{course.duration}</span></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <BookOpen className="w-5 h-5 text-slate-400" />
                                            <span>Level: <span className="font-semibold text-slate-900">{course.level}</span></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Users className="w-5 h-5 text-slate-400" />
                                            <span>Enrolled: <span className="font-semibold text-slate-900">{course.totalStudents || 0} students</span></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Award className="w-5 h-5 text-slate-400" />
                                            <span>Certificate of Completion</span>
                                        </div>
                                    </div>

                                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-amber-600 hover:from-primary/90 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20 mb-3">
                                        Enroll Now
                                    </Button>
                                    <Button variant="outline" className="w-full rounded-xl gap-2">
                                        <Share2 className="w-4 h-4" /> Share Course
                                    </Button>
                                </Card>

                                {/* Instructor Short */}
                                <Card className="p-6 rounded-3xl bg-slate-800 text-white">
                                    <h3 className="font-bold text-lg mb-4">Your Instructor</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl">
                                            {course.instructor ? course.instructor.charAt(0) : 'T'}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{course.instructor || "Homac Expert"}</p>
                                            <p className="text-sm text-slate-400">Senior Teacher</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
