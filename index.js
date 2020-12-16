require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const user = require('./routes/user')
const product = require('./routes/product')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1/users', user)
app.use('/api/v1/products', product)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))