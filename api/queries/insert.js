var Promise = require("bluebird");
var getSqlConnection = require('./../helpers/databaseConnection');
const errorParser = require('./../helpers/dbErrorParser')
const queryHelper = require('./../helpers/queryHelpers')

const RAW_MATERIAL = 1

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
        let usedMaterialInsert
        return new Promise.using(getSqlConnection(), function(connection) {
            conn = connection;
            return connection.query('START TRANSACTION');
        })
            .then( () => {
                let insertUsedMaterialQuery = String.raw`
                            INSERT INTO used_material(user_id, material_type_id, amount, comment)
                            VALUES (?, ?, ?, ?)
                            `
                return conn.query(insertUsedMaterialQuery, [usedMaterial.user_id, usedMaterial.material_type_id, usedMaterial.amount, usedMaterial.comment])
                    .then( (usedMaterialInsertInfo) => {
                        usedMaterialInsert = usedMaterialInsertInfo
                        let usedMaterialInsertId = usedMaterialInsertInfo.insertId
                        if(usedMaterial.material_type_id === RAW_MATERIAL) {
                            queryHelper.findRawMaterialId(conn, usedMaterial.material_id, usedMaterial.recycle_type_id, usedMaterial.unit_id)
                                .then( rawMaterialId => {
                                    let insertUsedHasRawQuery = String.raw`
                                        INSERT INTO used_has_raw_material(used_material_id, raw_material_id)
                                        VALUES (?, ?);                          
                                        `
                                    return conn.query(insertUsedHasRawQuery, [usedMaterialInsertId, rawMaterialId])
                                })
                        } else {
                            let insertUsedHasCompQuery = String.raw`
                                        INSERT INTO used_has_composite_material(used_material_id, composite_material_id)
                                        VALUES (?, ?);                          
                                        `
                            return conn.query(insertUsedHasCompQuery, [usedMaterialInsertId, usedMaterial.material_id])
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

