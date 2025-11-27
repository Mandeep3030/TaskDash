import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import employeeRoutes from './routes/employee.routes.js'
import jobRoutes from './routes/job.routes.js'
import config from './config/config.js'
import connectDB from './config/db.js'
import defaultErrorHandler from './controllers/error.controller.js'

const app = express()

connectDB()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/jobs', jobRoutes)

app.use(defaultErrorHandler)

export default app