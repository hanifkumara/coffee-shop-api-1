const product = require('../controllers/product')
const router = require('express').Router()

module.exports = router
  .get('/', product.getAllProducts)
  .post('/create', product.createProduct)