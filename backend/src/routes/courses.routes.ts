import { Router } from 'express'
import * as coursesController from '../controllers/courses.controller'

const router = Router()

router.get('/', coursesController.getCourses)
router.get('/:id', coursesController.getCourseById)
router.get('/slug/:slug', coursesController.getCourseBySlug)
router.post('/', coursesController.createCourse)
router.put('/:id', coursesController.updateCourse)
router.delete('/:id', coursesController.deleteCourse)

export default router
