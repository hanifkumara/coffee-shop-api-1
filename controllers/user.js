const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      const user = await userModel.getUserByEmail(req.body.email)
      if (user[0]) return res.status(400).send({
        status: 'Failed',
        statusCode: 400,
        message: 'Email already exists!'
      })
      
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)

      await userModel.insertUser({
        id: uuid(),
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        password: hashedPassword
      })

      return res.status(201).send({
        status: 'Success',
        statusCode: 201,
        message: 'Register success!'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        status: 'Failed',
        statusCode: 500,
        message: 'Internal server error!'
      })
    }
  },
  login: async (req, res) => {
    try {
      const user = await userModel.getUserByEmail(req.body.email)
      if (!user[0]) return res.status(404).send({
        status: 'Failed',
        statusCode: 404,
        message: 'User not found!'
      })

      const passwordMatched = await bcrypt.compare(req.body.password, user[0].password)
      if (!passwordMatched) return res.status(400).send({
        status: 'Failed',
        statusCode: 400,
        message: 'Password wrong!'
      })

      const token = jwt.sign({ userId: user[0].id, role: user[0].role }, process.env.JWT_SECRET_KEY)
      return res.status(200).send({
        status: 'Success',
        statusCode: 200,
        authToken: token,
        message: 'Login success!'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        status: 'Failed',
        statusCode: 500,
        message: 'Internal server error!'
      })
    }
  },
  getUserById: async (req, res) => {
    try {
      const result = await userModel.getUserById(req.params.id)
      if(!result[0]) return res.status(404).send({
        status: 'Failed',
        statusCode: 404,
        message: 'User not found!'
      })

      return res.status(200).send({
        status: 'Success',
        statusCode: 200,
        data: result[0]
      })
    } catch (error) {
      
    }
  }
}