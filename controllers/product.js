module.exports = {
  getAllProducts: (req, res) => {
    res.send({ message: 'List all product' })
  },
  createProduct: (req, res) => {
    res.send({ message: 'Create product' })
  }
}