import Job from '../models/job.model.js'
import { getErrorMessage } from './error.controller.js'

// CREATE
const create = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      createdBy: req.auth && req.auth._id
    }
    const job = new Job(jobData)
    await job.save()
    return res.status(201).json(job)
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) })
  }
}

// LIST
// Admin/manager sees all; employees also see all (per new requirement)
const list = async (req, res) => {
  try {
    const filter = {}

    const jobs = await Job.find(filter)
      .populate('assignedTo', 'employeeId name email role')
      .populate('createdBy', 'employeeId name email role')

    return res.json(jobs)
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) })
  }
}

// PARAM
const jobByID = async (req, res, next, id) => {
  try {
    const job = await Job.findById(id)
      .populate('assignedTo', 'employeeId name email role')
      .populate('createdBy', 'employeeId name email role')
    if (!job) return res.status(404).json({ error: 'Job not found' })
    req.job = job
    return next()
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve job' })
  }
}

// UPDATE
const update = async (req, res) => {
  try {
    let job = req.job
    job = Object.assign(job, req.body)
    job.updated = Date.now()
    await job.save()
    return res.json(job)
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) })
  }
}

// DELETE
const remove = async (req, res) => {
  try {
    const job = req.job
    const deletedJob = await job.deleteOne()
    return res.json(deletedJob)
  } catch (err) {
    return res.status(400).json({ error: getErrorMessage(err) })
  }
}

export default { create, list, jobByID, update, remove }
