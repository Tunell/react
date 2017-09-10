var Promise = require("bluebird");
var getSqlConnection = require('./../../helpers/databaseConnection');

const generated = {
    select: (query, filter) => {
        return new Promise.using(getSqlConnection(), (connection) => {
            return connection.query(query, filter).then( rows => rows)
        })
    }
}

module.exports = generated;