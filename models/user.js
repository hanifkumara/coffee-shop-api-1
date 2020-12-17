const db = require('./database')

module.exports = {
  insertUser: (data) => {
    return db(`INSERT INTO users SET id = '${data.id}', email = '${data.email}', password = '${data.password}', mobileNumber = '${data.mobileNumber}'`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    }) 
  },
  getUserByEmail: (email) => {
    return db(`SELECT * FROM users WHERE email = '${email}'`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    })
  },
  getUserById: (id) => {
    return db(`SELECT id, displayName, firstName, lastName, CONCAT('${process.env.BASE_URL}/images/', avatar) as avatar, mobileNumber, deliveryAddress, birthDate, gender FROM users WHERE id = '${id}'`)
    .then(result => {
      return result
    })
    .catch(error => {
      throw error
    })
  }
}