var Promise = require("bluebird");
var getSqlConnection = require('./../helpers/databaseConnection');

const remove = {
    // Delete a entry in db
    deleteId: (table, id) => {
        return new Promise.using(getSqlConnection(), function(connection) {
                return connection.query('DELETE FROM ?? WHERE id = ?', [table, id])
                    .then( deleteInfo => deleteInfo.affectedRows.toString())
            })
    }
}

module.exports = remove;