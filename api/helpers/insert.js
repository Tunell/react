var Promise = require("bluebird");
var getSqlConnection = require('./databaseConnection');

const insert = {
    // Insert a entry into a table in db
    insertRow: (table, data) => {
        return new Promise.using(getSqlConnection(), function(connection) {
                return connection.query('INSERT INTO ?? SET ?', [table, data])
                    .then( insertInfo => insertInfo)
            })
    },

    // Insert a composite-material, spans several tables
    // table parameter not used!
    insertCompositeMaterial: (table, compositeMaterial) => {
        let conn;
        let compMatInsertInfo;
        return new Promise.using(getSqlConnection(), function(connection) {
                conn = connection;
                return connection.query('START TRANSACTION');
            })
            // Add queries
            .then( () => {
                // Check that there are composite_has_materials specified
                if(compositeMaterial.composite_has_materials.length === 0) {
                    throw new Error('No composite_has_materials specified in request, cannot create composite-material')
                }
                // Query 1
                return conn.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
                    [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id])
                    .then( insertInfo => {
                        // Query 2
                        compMatInsertInfo = insertInfo;
                        let newCompositeMaterialId = insertInfo.insertId;
                        return Promise.all(compositeMaterial.composite_has_materials.map(material => {
                            let query = 'INSERT INTO composite_has_material (composite_material_id, material_id, recycle_type_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)';
                            let input = [newCompositeMaterialId, material.material_id, material.recycle_type_id, material.unit_id, material.amount];
                            return conn.query(query, input)
                        }))
                    })
            })
            // Commit queries
            .then( () => conn.query('COMMIT'))
            .then( () => compMatInsertInfo)
            // If violations or failure, rollback
            .catch( err => {
                let errorResponse = createErrorResponse(err)
                conn.query('ROLLBACK')
                throw (errorResponse)
            })
    }
}

function createErrorResponse(err) {
    let msg, field, statusCode
    ({msg, field, statusCode} = decodeError(err.errno, err.message))
    const errorResponse = {
        error: {
            msg,
            field,
            code: err.errno,
            exceptionMsg: err.message,
            statusCode
        }
    }
    return errorResponse
}

function decodeError(errno,  message) {
    let field, msg, statusCode
    switch(errno) {
        // The provided foreign key ID is not found
        case 1452:
            field = message.split('FOREIGN KEY')[1].split('REFERENCES')[0].split('`')[1]
            msg = `Det id på ${field} som skickats finns ej.`
            statusCode = 403
            break

        default:
            field = "Did not find any field."
            msg = `Kunde inte hitta vad som gick fel.`
            statusCode = 403
    }
    return {field, msg, statusCode}
}

module.exports = insert;

