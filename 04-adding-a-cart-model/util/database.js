const Sequelize = require('sequelize')

// NOTE: Connection to database
const sequelize = new Sequelize('node-complete', 'root', 'root@123', {dialect: 'mysql', host: 'localhost'})

module.exports = sequelize