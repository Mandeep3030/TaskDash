import express from 'express'
import jobCtrl from '../controllers/job.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.param('jobId', jobCtrl.jobByID)

// Protect all job routes
router.use(authCtrl.requireSignin, authCtrl.attachUserRole)

// List / Create
router
  .route('/')
  .get(jobCtrl.list)
  .post(authCtrl.hasRole('admin', 'manager'), jobCtrl.create)

// Read / Update / Delete single job
router
  .route('/:jobId')
  .put(jobCtrl.update) // role checked inside future enhancements
  .delete(authCtrl.hasRole('admin', 'manager'), jobCtrl.remove)

export default router
