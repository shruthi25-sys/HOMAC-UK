import { Router } from 'express'
import * as franchiseController from '../controllers/franchise.controller'

const router = Router()

router.get('/', franchiseController.getApplications)
router.get('/:id', franchiseController.getApplicationById)
router.post('/', franchiseController.createApplication)
router.put('/:id', franchiseController.updateApplication)
router.post('/:id/notes', franchiseController.addNote)

export default router
