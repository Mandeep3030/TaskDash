const getErrorMessage = (err) => {
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