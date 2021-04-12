const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'jocdaus',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

pool.getConnection(function (err, connection) {
    if(err){
        console.log(err);
    }
    else{
        console.log("Conectado a "+config.database+"!");
    }
});

// Export the pool
module.exports =  pool;