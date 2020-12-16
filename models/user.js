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
  }
}