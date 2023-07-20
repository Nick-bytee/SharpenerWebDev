const mysql2 = require('mysql2')

//creating query pool
const pool = mysql2.createPool({
    host: 'localhost',
    user : 'root',
    database : 'Node_Complete',
    password : 'Root123@#'
})

module.exports = pool.promise();