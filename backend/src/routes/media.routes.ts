import { Router } from 'express'
import * as mediaController from '../controllers/media.controller'

const router = Router()

router.get('/', mediaController.getMedia)
router.post('/', mediaController.createMedia)
router.put('/:id', mediaController.updateMedia)
router.delete('/:id', mediaController.deleteMedia)

export default router
