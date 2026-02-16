import { Router } from 'express'
import * as cmsController from '../controllers/cms.controller'

const router = Router()

router.get('/pages', cmsController.getPages)
router.get('/pages/slug/:slug', cmsController.getPageBySlug)
router.post('/pages', cmsController.createPage)
router.put('/pages/:id', cmsController.updatePage)
router.delete('/pages/:id', cmsController.deletePage)

export default router
