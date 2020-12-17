const { v4: uuid } = require('uuid')
const productModel = require('../models/product')

module.exports = {
  getAllProducts: (req, res) => {
    res.send(__dirname)
  },
  createProduct: async (req, res) => {
    try {
      let image = 'default_product.jpg'
      if(req.file) image = req.file.filename
      const product = {
        id: uuid(),
        name: req.body.name,
        description: req.body.description,
        image: image,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
      }
      await productModel.insertProduct(product)

      if (typeof req.body.productSizes === 'string') req.body.productSizes = JSON.parse(req.body.productSizes).productSizes
      if (typeof req.body.deliveryMethods === 'string') req.body.deliveryMethods = JSON.parse(req.body.deliveryMethods).deliveryMethods

      for (size of req.body.productSizes) {
        await productModel.insertProductSizes({
          id: uuid(),
          productId: product.id,
          size: size
        })
      }

      for (deliveryMethod of req.body.deliveryMethods) {
        await productModel.insertDeliveryMethod({
          id: uuid(),
          productId: product.id,
          deliveryMethod: deliveryMethod
        })
      }

      return res.status(201).send({
        status: 'Success',
        statusCode: 201,
        insertId: product.id,
        message: 'Create product success'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        status: 'Failed',
        statusCode: 500,
        message: 'Internal server error!'
      })
    }
  }
}