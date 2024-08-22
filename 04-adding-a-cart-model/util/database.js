// 1. npm i mysql2
// 2. 
const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'node-complete',
    password: 'password12345678'
})

module.exports = pool.promise();
