require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) return res.status(401).send({
    status: 'Failed',
    statusCode: 401,
    message: 'Access denied!'
  })

  try {
    const authToken = token.split(' ')[1]
    const verified = jwt.verify(authToken, process.env.JWT_SECRET_KEY)
    req.user = verified

    return next()
  } catch (error) {
    return res.status(401).send({
      status: 'Failed',
      statusCode: 401,
      message: 'Access denied!'
    })
  }
}