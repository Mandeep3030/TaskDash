import Employee from '../models/employee.model.js'
import { getErrorMessage } from './error.controller.js'

// CREATE
const create = async (req, res) => {
  try {
    const employee = new Employee(req.body)
    await employee.save()
    employee.hashed_password = undefined
    employee.salt = undefined
    return res.status(201).json(employee)
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err)
    })
  }
}

// LIST
const list = async (req, res) => {
  try {
    const employees = await Employee.find().select(
      'employeeId name email role location created updated'
    )
    return res.json(employees)
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) })
  }
}

// PARAM middleware
const employeeByID = async (req, res, next, id) => {
  try {
    const employee = await Employee.findById(id).select('-hashed_password -salt')
    if (!employee) return res.status(404).json({ error: 'Employee not found' })
    req.employee = employee
    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve employee' })
  }
}

// UPDATE
const update = async (req, res) => {
  try {
    let employee = req.employee
    employee = Object.assign(employee, req.body)
    employee.updated = Date.now()
    await employee.save()
    employee.hashed_password = undefined
    employee.salt = undefined
    return res.json(employee)
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) })
  }
}

// DELETE
const remove = async (req, res) => {
  try {
    const employee = req.employee
    const deletedEmployee = await employee.deleteOne()
    deletedEmployee.hashed_password = undefined
    deletedEmployee.salt = undefined
    return res.json(deletedEmployee)
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) })
  }
}

export default {
  create,
  list,
  employeeByID,
  update,
  remove
}