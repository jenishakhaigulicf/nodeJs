const Sequelize = require('sequelize')

// NOTE: Connection to database
const sequelize = new Sequelize('node-complete', 'root', 'password12345678', {dialect: 'mysql', host: 'localhost'})

module.exports = sequelize