const product = require('../controllers/product')
const verifyUser = require('../middlewares/verifyUser')
const verifyRole = require('../middlewares/verifyRole')
const router = require('express').Router()

module.exports = router
  .get('/', verifyUser, product.getAllProducts)
  .post('/create', [verifyUser, verifyRole], product.createProduct)