const getErrorMessage = (err) => {
  // Handle Mongo duplicate key errors (E11000)
  if (err && (err.code === 11000 || (err.message && err.message.includes('E11000')))) {
    const key = err.keyPattern
      ? Object.keys(err.keyPattern)[0]
      : err.keyValue
      ? Object.keys(err.keyValue)[0]
      : 'field'
    const value = err.keyValue ? err.keyValue[key] : undefined
    if (key && value) {
      return `${key} '${value}' already exists`
    }
    // Fallback generic duplicate message
    return 'Duplicate value already exists'
  }

  if (err && err.message) return err.message
  if (err && err.errmsg) return err.errmsg
  return 'Error'
}

const defaultErrorHandler = (err, req, res, next) => {
  console.error(err)
  return res.status(400).json({
    error: getErrorMessage(err)
  })
}

export default defaultErrorHandler
export { getErrorMessage }