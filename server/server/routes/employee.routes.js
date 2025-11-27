import express from 'express'
import employeeCtrl from '../controllers/employee.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Param
router.param('employeeId', employeeCtrl.employeeByID)

// Protect all employee routes
router.use(authCtrl.requireSignin, authCtrl.attachUserRole)

// Admin-only create and list
router
  .route('/')
  .get(employeeCtrl.list) // Allow all signed-in users to list employees for assignment
  .post(authCtrl.hasRole('admin'), employeeCtrl.create)

// Read, update, delete single employee
router
  .route('/:employeeId')
  .put(authCtrl.hasAuthorization, employeeCtrl.update)
  .delete(authCtrl.hasRole('admin'), employeeCtrl.remove)

export default router