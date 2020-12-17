const db = require('./database')

module.exports = {
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