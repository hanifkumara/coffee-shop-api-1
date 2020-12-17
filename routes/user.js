const user = require('../controllers/user')
const router = require('express').Router()
const verifyUser = require('../middlewares/verifyUser')

module.exports = router
  .post('/register', user.register)
  .post('/login', user.login)
  .get('/:id', verifyUser, user.getUserById)