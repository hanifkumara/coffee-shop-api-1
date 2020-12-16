require('dotenv').config()
const express = require('express')
const app = express()

const user = require('./routes/user')

app.use('/api/v1/users', user)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))