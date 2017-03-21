
var Promise = require("bluebird");
var getSqlConnection = require('./databaseConnection');
const errorParser = require('./dbErrorParser')

const update = {
    // Insert a entry into a table in db
    updateRow: (table, id, data) => {
        return new Promise.using(getSqlConnection(), function(connection) {
            return connection.query('UPDATE ?? SET ? WHERE id = ?',
                [table, data, id])
                .then( updateInfo => updateInfo.changedRows)
        })
    },

    // Insert a composite-material, spans several tables
    // table parameter not used!
    updateCompositeMaterial: (table, id, compositeMaterial) => {
        let conn;
        let compMatUpdateInfo;
        let delInfo;
        return new Promise.using(getSqlConnection(), function(connection) {
            conn = connection;
            return connection.query('START TRANSACTION');
        })
        // Add queries
            .then( () => {
                // Check that there are composite_has_materials specified
                if(compositeMaterial.composite_has_materials.length === 0) {
                    //throw new Error('No composite_has_materials specified in request, update not allowed')
                }
                // Query 1
                let query = 'UPDATE composite_material SET name = ?, unit_id = ? WHERE id = ?';
                let input = [compositeMaterial.name, compositeMaterial.unit_id, id];
                return conn.query(query, input)
                    .then( () => {
                        return conn.query('DELETE FROM composite_has_material WHERE composite_material_id = ?', [id])
                    })
                    .then( deleteInfo => {
                        delInfo = deleteInfo
                        return deleteInfo.affectedRows.toString()
                    })
                    .then( insertInfo => {
                        // Query 2
                        compMatUpdateInfo = insertInfo;
                        return Promise.all(compositeMaterial.composite_has_materials.map(material => {
                            let query = 'INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)';
                            let input = [id, material.material_id, material.recycle_type_id, material.unit_id, material.amount];
                            return conn.query(query, input)
                        }))
                    })
            })
            // Commit queries
            .then( () => conn.query('COMMIT'))
            .then( () => compMatUpdateInfo)
            // If violations or failure, rollback
            .catch( err => {
                let errorResponse = errorParser.createErrorResponse(err)
                conn.query('ROLLBACK')
                throw (errorResponse)
            })
    }
}

module.exports = update;

