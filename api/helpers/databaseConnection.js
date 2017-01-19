var mysql = require('promise-mysql');

pool = mysql.createPool({
    "connectionLimit": 100,
    host     : process.env.RDS_HOSTNAME || "localhost",
    user     : process.env.RDS_USERNAME || "root",
    password : process.env.RDS_PASSWORD || "Wrufrafr",
    port     : process.env.RDS_PORT || 3306,
    database : process.env.RDS_DB_NAME || "byggstyrning"
});

function getSqlConnection() {
    return pool.getConnection().disposer(function(connection) {
        console.log(`
${pool.pool._freeConnections.length}    // number of free connections awaiting use
${pool.pool._allConnections.length  }   // number of connections currently created, including ones in use
${pool.pool._acquiringConnections.length}`)
        pool.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;