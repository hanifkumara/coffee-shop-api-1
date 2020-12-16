const user = require('../controllers/user')
const router = require('express').Router()

module.exports = router
  .post('/register', user.register)