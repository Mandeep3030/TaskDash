const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'Goup3',
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://127.0.0.1:27017/tasksdash'
}

export default config
