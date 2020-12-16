const product = require('../controllers/product')
const verifyUser = require('../middlewares/verifyUser')
const router = require('express').Router()

module.exports = router
  .get('/', verifyUser, product.getAllProducts)
  .post('/create', verifyUser, product.createProduct)