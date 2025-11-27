import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import Employee from '../models/employee.model.js'
import config from '../config/config.js'

// SIGNUP: Create employee and return basic info
const signup = async (req, res) => {
  try {
    const employee = new Employee(req.body)
    await employee.save()
    employee.hashed_password = undefined
    employee.salt = undefined
    return res.status(201).json(employee)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

// SIGNIN
const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const employee = await Employee.findOne({ email: email })

    if (!employee) {
      return res.status(401).json({ error: 'User not found' })
    }

    if (!employee.authenticate(password)) {
      return res
        .status(401)
        .json({ error: "Email and password don't match." })
    }

    const token = jwt.sign({ _id: employee._id }, config.jwtSecret, {
      expiresIn: '7d'
    })

    res.cookie('t', token, { expire: new Date() + 9999 })

    return res.json({
      token,
      user: {
        _id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }
    })
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' })
  }
}

// SIGNOUT
const signout = (req, res) => {
  res.clearCookie('t')
  return res.status(200).json({ message: 'Signed out' })
}

// JWT middleware: Require signed in user
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth'
})

// Role extraction helper (use in routes)
const attachUserRole = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth._id) return next()
    const employee = await Employee.findById(req.auth._id)
    if (employee) {
      req.userRole = employee.role
    }
    return next()
  } catch (err) {
    return next()
  }
}

// Check if current user is same as loaded employee or admin
const hasAuthorization = (req, res, next) => {
  const isOwner = req.employee && req.auth && req.employee._id == req.auth._id
  const isAdmin = req.userRole === 'admin'
  if (!(isOwner || isAdmin)) {
    return res.status(403).json({ error: 'User is not authorized' })
  }
  next()
}

// Check if user has one of given roles
const hasRole = (...roles) => (req, res, next) => {
  if (!req.userRole || !roles.includes(req.userRole)) {
    return res.status(403).json({ error: 'Insufficient role' })
  }
  next()
}

// For tasks: allow admin/manager, and assigned employee for READ/UPDATE
const canAccessTask = (req, res, next) => {
  const isAdminOrManager =
    req.userRole === 'admin' || req.userRole === 'manager'

  const isAssignee =
    req.task &&
    req.task.assignedTo &&
    req.auth &&
    req.task.assignedTo._id.toString() === req.auth._id

  if (!(isAdminOrManager || isAssignee)) {
    return res.status(403).json({ error: 'Not allowed to access this task' })
  }
  next()
}

export default {
  signup,
  signin,
  signout,
  requireSignin,
  attachUserRole,
  hasAuthorization,
  hasRole,
  canAccessTask
}