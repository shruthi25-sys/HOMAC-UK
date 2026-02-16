import { Router } from 'express'
import * as enquiriesController from '../controllers/enquiries.controller'

const router = Router()

router.get('/', enquiriesController.getEnquiries)
router.get('/:id', enquiriesController.getEnquiryById)
router.post('/', enquiriesController.createEnquiry)
router.put('/:id', enquiriesController.updateEnquiry)
router.post('/:id/notes', enquiriesController.addNote)

export default router
