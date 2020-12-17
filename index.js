require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const user = require('./routes/user')
const product = require('./routes/product')

app.use(bodyParser.json())
app.use(cors())
app.use('/images', express.static(__dirname + '/images'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1/users', user)
app.use('/api/v1/products', product)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))