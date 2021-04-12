const pool = require('../config/db');

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, rows) => {
            if(err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        })
    })
    
}

module.exports = query;