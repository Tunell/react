var Promise = require("bluebird");
var getSqlConnection = require('./databaseConnection');

const generated = {
    select: (query) => {
        return new Promise.using(getSqlConnection(), (connection) => {
            return connection.query(query).then( rows => rows)
        })
    }
}

module.exports = generated;