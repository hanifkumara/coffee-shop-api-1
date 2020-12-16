module.exports = (res, statusCode, data, error = null) => {
  if(error) {
    return res.status(statusCode)
  }
}