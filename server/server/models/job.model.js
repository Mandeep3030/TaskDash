import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    trim: true,
    unique: 'Job ID must be unique',
    required: 'Job ID is required'
  },
  name: {
    type: String,
    trim: true,
    required: 'Job name is required'
  },
  description: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  machineId: {
    type: String,
    trim: true
  },
  // Assigned employee reference
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  startSlot: {
    type: Number,
    min: 0
  },
  durationSlots: {
    type: Number,
    min: 1,
    default: 1
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employee'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

export default mongoose.model('Job', JobSchema)
