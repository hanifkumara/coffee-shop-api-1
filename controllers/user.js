const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')

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
        message: 'Internal server error'
      })
    }
    // userModel.getUserByEmail(req.body.email)
    // .then(result => {
    //   if (result[0]) {
    //     return res.status(400).send({
    //       status: 'Failed',
    //       statusCode: 400,
    //       message: 'Email already exists!'
    //     })
    //   }
    // })
    // .catch(error => {
    //   console.log(error)
    //   return res.status(500).send({
    //     status: 'Failed',
    //     statusCode: 500,
    //     message: 'Internal server error'
    //   })
    // })
    // console.log('Ini dijalankan')
    // console.log(coba)

    // bcrypt.genSalt(10, (error, salt) => {
    //   if (error) {
    //     console.log(error)  
    //     return res.status(500).send({
    //       status: 'Failed',
    //       statusCode: 500,
    //       message: 'Internal server error'
    //     })
    //   }

    //   bcrypt.hash(req.body.password, salt, (error, hashedPassword) => {
    //     if (error) {
    //       console.log(error)  
    //       return res.status(500).send({
    //         status: 'Failed',
    //         statusCode: 500,
    //         message: 'Internal server error'
    //       })
    //     }

    //     userModel.insertUser({
    //       id: uuid(),
    //       email: req.body.email,
    //       mobileNumber: req.body.mobileNumber,
    //       password: hashedPassword
    //     })
    //     .then(_ => {
    //       return res.status(201).send({
    //         status: 'Success',
    //         statusCode: 201,
    //         message: 'Register success!'
    //       })
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       return res.status(500).send({
    //         status: 'Failed',
    //         statusCode: 500,
    //         message: 'Internal server error'
    //       })
    //     })
    //   })
    // })
  }
}