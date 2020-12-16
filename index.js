require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const user = require('./routes/user')

app.use(bodyParser.json())

app.use('/api/v1/users', user)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))