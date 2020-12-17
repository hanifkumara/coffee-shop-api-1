const db = require('./database')
require('dotenv').config()

module.exports = {
  getNumOfProducts: (data) => {
    return db(`SELECT * FROM products WHERE name LIKE '%${data.keyword}%' ORDER BY price ${data.sort}`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    }) 
  },
  getAllProducts: (data) => {
    return db(`SELECT id, name, CONCAT('${process.env.BASE_URL}/images/', image) as image, price FROM products WHERE name LIKE '%${data.keyword}%' ORDER BY price ${data.sort} LIMIT ${data.page * 12 - 12}, 12`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    }) 
  },
  insertProduct: (data) => {
    return db(`INSERT INTO products SET id = '${data.id}', name = '${data.name}', description = '${data.description}', image = '${data.image}', stock = ${data.stock}, category = '${data.category}', price = ${data.price}`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    }) 
  },
  insertDeliveryMethod: (data) => {
    return db(`INSERT INTO product_delivery_methods SET id = '${data.id}', productId = '${data.productId}', deliveryMethod = '${data.deliveryMethod}'`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    })
  },
  insertProductSizes: (data) => {
    return db(`INSERT INTO product_sizes SET id = '${data.id}', productId = '${data.productId}', size = '${data.size}'`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    })
  }
}