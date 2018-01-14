var Promise = require("bluebird");
var getSqlConnection = require('./../helpers/databaseConnection');
const ADMIN_ID = 1


const selectCompositeMaterial = {
    // Select query for a single composite material, span several tables
    id: (id) => {
        return new Promise.using(getSqlConnection(), function(connection) {
                let query = "SELECT composite_material.id AS id, composite_material.user_id AS user_id, user.name AS user_name, composite_material.name AS composite_material_name, composite_material.unit_id AS composite_material_unit_id, unit_2.name AS composite_material_unit_name, composite_material.created AS created, composite_material.changed AS changed, composite_has_material.material_id AS material_id, material.name AS material_name, composite_has_material.unit_id AS material_unit_id, unit_1.name AS material_unit_name, composite_has_material.recycle_type_id AS material_recycle_type_id, recycle_type.name AS material_recycle_type_name, composite_has_material.amount AS amount FROM composite_material, composite_has_material, recycle_type, unit AS unit_1, material, unit AS unit_2, user WHERE composite_material.id = composite_has_material.composite_material_id AND composite_has_material.recycle_type_id = recycle_type.id AND composite_has_material.unit_id = unit_1.id AND composite_has_material.material_id = material.id AND composite_material.unit_id = unit_2.id AND composite_material.user_id = user.id AND composite_material.id = ?";
                return connection.query(query, [id])
                    .then( rows => createCompMaterials(rows))
            })
    },

    // Select query for all composite material, span several tables

    all: (user_id) => {
        return new Promise.using(getSqlConnection(), function(connection) {
            let query = String.raw`
            SELECT
            composite_material.id                  AS id,
                composite_material.user_id             AS user_id,
                user.name                              AS user_name,
                composite_material.name                AS composite_material_name,
                composite_material.unit_id             AS composite_material_unit_id,
                unit_2.name                            AS composite_material_unit_name,
                composite_material.created             AS created,
                composite_material.changed             AS changed,
                composite_has_material.material_id     AS material_id,
                material.name                          AS material_name,
                composite_has_material.unit_id         AS material_unit_id,
                unit_1.name                            AS material_unit_name,
                composite_has_material.recycle_type_id AS material_recycle_type_id,
                recycle_type.name                      AS material_recycle_type_name,
                composite_has_material.amount          AS amount
            FROM composite_material, composite_has_material, recycle_type, unit AS unit_1, material, unit AS unit_2, user
            WHERE composite_material.id = composite_has_material.composite_material_id AND
            composite_has_material.recycle_type_id = recycle_type.id AND composite_has_material.unit_id = unit_1.id AND
            composite_has_material.material_id = material.id AND composite_material.unit_id = unit_2.id AND
            composite_material.user_id = user.id
            `

            if(user_id !== undefined) {
              const isAdminQuery = user_id[0] === user_id[1]
              if(!isAdminQuery) {
                query += `AND (composite_material.user_id = ? `
                let user_id_without_first = user_id.slice(1, user_id.length)
                user_id_without_first.forEach( _ => { query += ` OR composite_material.user_id = ?` })
                query += `)`
              }
            }



            return connection.query(query, user_id)
                .then( rows => createCompMaterials(rows))
        })
    }
}

const selectUsedMaterial = {
    query: (user_id, id) => {
        let resultQueryOne;
        let resultQueryTwo;
        return new Promise.using(getSqlConnection(), (connection) => {
        let query = String.raw
        `
       SELECT 
	used_material.id AS id, 
    used_material.user_id AS user_id,
    user.name AS user_name,
    used_has_raw_material.raw_material_id AS used_has_material_id,
    material.name AS used_has_material_name,
    material.id AS material_id,
    record_state.id AS record_state_id,
    record_state.name AS record_state_name,
    used_material.comment AS comment,
    used_material.amount AS amount,
    used_material.material_type_id AS material_type_id,
    material_type.name AS material_type_name,
    recycle_type.id AS recycle_type_id,
    recycle_type.name AS recycle_type_name,
    unit.id AS unit_id,
    unit.name AS unit_name,
    used_material.created AS created,
    used_material.changed AS changed
    
    
FROM byggstyrning.used_material,  used_has_raw_material, raw_material, material, user, record_state, material_type, recycle_type, unit
WHERE
used_material.id = used_has_raw_material.used_material_id AND
raw_material.id = used_has_raw_material.raw_material_id AND
user.id = used_material.user_id AND
used_material.record_state_id = record_state.id AND
used_material.material_type_id = material_type.id AND
material.id = raw_material.material_id AND
recycle_type.id = raw_material.recycle_type_id AND
unit.id = raw_material.unit_id
`
            let params = []
            if(user_id !== undefined) {
              const isAdminQuery = user_id[0] === ADMIN_ID
              if(!isAdminQuery) {
                params.push(user_id)
                //query += `AND (composite_material.user_id = ? OR composite_material.user_id = ?)`
                query += `AND (used_material.user_id = ? `
                let user_id_without_first = user_id.slice(1, user_id.length)
                user_id_without_first.forEach(_ => {
                  query += ` OR used_material.user_id = ?`
                })
                query += `)`
              }
            }

            if(id !== undefined) {
                params.push(id)
                //query += `AND (composite_material.user_id = ? OR composite_material.user_id = ?)`
                query += `AND (used_material.id = ? )`
            }


            return connection.query(query, params)
                .then( (res) => {
                    resultQueryOne = res;
                    let query2 = String.raw
                        `
SELECT 
	used_material.id AS id, 
    used_material.user_id AS user_id,
    user.name AS user_name,
    used_has_composite_material.composite_material_id AS used_has_material_id,
    composite_material.name AS used_has_material_name,
    record_state.id AS record_state_id,
    record_state.name AS record_state_name,
    used_material.comment AS comment,
    used_material.amount AS amount,
    used_material.material_type_id AS material_type_id,
    material_type.name AS material_type_name,
    used_material.created AS created,
    used_material.changed AS changed,
    
composite_material.name                AS composite_material_name,
                composite_material.unit_id             AS composite_material_unit_id,
                unit_2.name                            AS composite_material_unit_name,
                composite_has_material.material_id     AS material_id,
                material.name                          AS material_name,
                composite_has_material.unit_id         AS material_unit_id,
                unit_1.name                            AS material_unit_name,
                composite_has_material.recycle_type_id AS material_recycle_type_id,
                recycle_type.name                      AS material_recycle_type_name,
                composite_has_material.amount          AS material_amount
    
    
FROM byggstyrning.used_material,  used_has_composite_material, composite_material, user, record_state, material_type, composite_has_material, recycle_type, unit AS unit_1, material, unit AS unit_2
WHERE
used_material.id = used_has_composite_material.used_material_id AND
composite_material.id = used_has_composite_material.composite_material_id AND
user.id = used_material.user_id AND
used_material.record_state_id = record_state.id AND
used_material.material_type_id = material_type.id AND

composite_material.id = composite_has_material.composite_material_id AND
composite_has_material.recycle_type_id = recycle_type.id AND composite_has_material.unit_id = unit_1.id AND
composite_has_material.material_id = material.id AND composite_material.unit_id = unit_2.id AND
composite_material.user_id = user.id
`
                    if(user_id !== undefined) {
                      const isAdminQuery = user_id[0] === ADMIN_ID
                      if(!isAdminQuery) {
                        query2 += `AND (used_material.user_id = ? `
                        let user_id_without_first = user_id.slice(1, user_id.length)
                        user_id_without_first.forEach(_ => {
                          query += ` OR used_material.user_id = ?`
                        })
                        query2 += `)`
                      }
                    }

                    if(id !== undefined) {
                        query2 += `AND (used_material.id = ? )`
                    }

                   return connection.query(query2, params)
                })
                .then( (res) => {
                    resultQueryTwo = res;
                    console.log(resultQueryOne)

                    let composite_has_materials = createCompMaterials(resultQueryTwo, true)
                    composite_has_materials.forEach( row => resultQueryOne.push(row))
                    return resultQueryOne
                })
        })
    }
}

// Given a composite-material row, returns if it matches another row.
function findIndexId(compositeMaterial) {
    return compositeMaterial.id === this.id;
}

// Given a db output, creates a composite-material that can be sent to client.
function createCompMaterials(rows, isUsedMaterial){
    let compositeMaterials = []
    rows.forEach( row => {
        let compositeMaterial = {};
        let compositeHasMaterial = createCompHasMaterial(row, isUsedMaterial);
        if(compositeMaterials.length === 0) {
            compositeMaterials.push(createCompMaterial(row, compositeHasMaterial, isUsedMaterial));
        } else {
            let indexOfId = compositeMaterials.findIndex(findIndexId, row);
            if(indexOfId === -1) {
                compositeMaterial = createCompMaterial(row, compositeHasMaterial, isUsedMaterial);
                compositeMaterials.push(compositeMaterial);
            } else {
                compositeMaterials[indexOfId].composite_has_materials.push(compositeHasMaterial);
            }
        }
    })
    return compositeMaterials;
}

// Given a row, extracts data to construct a single compositeHasMaterial object
function createCompHasMaterial(row, isUsedMaterial) {
    let compositeHasMaterial = {
        composite_material_id: isUsedMaterial ? row.used_has_material_id : row.composite_material_id,
        material_id: row.material_id,
        material_name: row.material_name,
        recycle_type_id: row.material_recycle_type_id,
        recycle_type_name: row.material_recycle_type_name,
        unit_id: row.material_unit_id,
        unit_name: row.material_unit_name,
        amount: isUsedMaterial ? row.material_amount : row.amount
    }
    return compositeHasMaterial;
}

// Given a row and a compositeHasMaterial, creates a compositeMaterial with one compositeHasMaterial
function createCompMaterial(row, compositeHasMaterial, isUsedMaterial) {
    let compositeMaterial = {
        id: row.id,
        user_id: row.user_id,
        user_name: row.user_name,
        name: row.composite_material_name,
        unit_id: row.composite_material_unit_id,
        unit_name: row.composite_material_unit_name,
        created: row.created,
        changed: row.changed,
        composite_has_materials: [compositeHasMaterial]
    }

    if(isUsedMaterial) {
        compositeMaterial.amount = row.amount
        compositeMaterial.comment = row.comment
        compositeMaterial.used_has_material_name = row.used_has_material_name
        compositeMaterial.used_has_material_id = row.used_has_material_id
        compositeMaterial.record_state_id = row.record_state_id
        compositeMaterial.record_state_name = row.record_state_name
        compositeMaterial.material_type_id = row.material_type_id
        compositeMaterial.material_type_name = row.material_type_name
    }

    return compositeMaterial;
}

module.exports = {selectUsedMaterial, selectCompositeMaterial};

