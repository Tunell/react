var Promise = require("bluebird");
var getSqlConnection = require('./databaseConnection');
const errorParser = require('./dbErrorParser')

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
                let errorResponse = errorParser.createErrorResponse(err)
                conn.query('ROLLBACK')
                throw (errorResponse)
            })
    },

    insertUsedMaterial: (table, usedMaterial) => {
        let conn;
        let usedMaterialInsert;
        return new Promise.using(getSqlConnection(), function(connection) {
            conn = connection;
            return connection.query('START TRANSACTION');
        })
        // Add queries
            .then( () => {
                // Check that there are composite_has_materials specified
                let query = String.raw`
                SELECT *
                FROM raw_material
                WHERE unit_id = ? AND recycle_type_id = ? AND material_id = ?
                `
                return conn.query(query, [usedMaterial.unit_id, usedMaterial.recycle_type_id, usedMaterial.material_id])
                    .then( rawMaterial => {
                        console.log(rawMaterial)
                        // Query 2
                        if(rawMaterial.length === 1) {
                            // Go ahead and insert used material
                            let insertUsedMaterialQuery = String.raw`
                            INSERT INTO used_material(user_id, material_type_id, amount, comment)
                            VALUES (?, ?, ?, ?)
                            `
                            return conn.query(insertUsedMaterialQuery, [usedMaterial.user_id, usedMaterial.material_type_id, usedMaterial.amount, usedMaterial.comment])
                                .then( usedMaterialInfo => {
                                    usedMaterialInsert = usedMaterialInfo
                                    let insertUsedHasRawQuery = String.raw`
                                        INSERT INTO used_has_raw_material(used_material_id, raw_material_id)
                                        VALUES (?, ?);                          
                                        `
                                        return conn.query(insertUsedHasRawQuery, [usedMaterialInsert.insertId, rawMaterial[0].id])
                                })
                        } else {
                            let insertRawMaterialQuery = String.raw`
                            INSERT INTO raw_material(unit_id, recycle_type_id, material_id)
                            VALUES (?, ?, ?)
                            `
                            return conn.query(insertRawMaterialQuery, [usedMaterial.unit_id, usedMaterial.recycle_type_id, usedMaterial.material_id])
                                .then( rawMaterial =>  {
                                    let insertUsedMaterialQuery = String.raw`
                            INSERT INTO used_material(user_id, material_type_id, amount, comment)
                            VALUES (?, ?, ?, ?)
                            `
                                    return conn.query(insertUsedMaterialQuery, [usedMaterial.user_id, usedMaterial.material_type_id, usedMaterial.amount, usedMaterial.comment])
                                        .then( usedMaterialInfo => {
                                            usedMaterialInsert = usedMaterialInfo
                                            let insertUsedHasRawQuery = String.raw`
                                        INSERT INTO used_has_raw_material(used_material_id, raw_material_id)
                                        VALUES (?, ?);                          
                                        `
                                            return conn.query(insertUsedHasRawQuery, [usedMaterialInsert.insertId, rawMaterial.insertId])
                                        })
                                })
                        }
                    })
            })
            // Commit queries
            .then( () => conn.query('COMMIT'))
            .then( () => usedMaterialInsert)
            // If violations or failure, rollback
            .catch( err => {
                let errorResponse = errorParser.createErrorResponse(err)
                conn.query('ROLLBACK')
                throw (errorResponse)
            })
    }
}



module.exports = insert;

