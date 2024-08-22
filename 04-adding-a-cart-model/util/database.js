const Sequelize = require('sequelize')

// NOTE: connection setup
const sequelize = new Sequelize('node-complete', 'root', 'password12345678', {dialect: 'mysql', host: 'localhost'})

module.exports = sequelize