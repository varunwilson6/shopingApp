const mySql = require('mysql2');

const pool = mySql.createPool({
    host:'localhost',
    user:'root',
    database:'node_complete',
    password: 'Online@1Hour'
});

module.exports = pool.promise();