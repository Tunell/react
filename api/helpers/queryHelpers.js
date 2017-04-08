const helpers = {
    findRawMaterialId: (conn, material_id, recycle_type_id, unit_id) => {
        let query = String.raw`
                SELECT *
                FROM raw_material
                WHERE unit_id = ? AND recycle_type_id = ? AND material_id = ?
                `
        return conn.query(query, [unit_id, recycle_type_id, material_id])
            .then( (foundRaw) => {
                if (foundRaw.length === 1) {
                    return foundRaw[0].id
                } else {
                    let insertRawMaterialQuery = String.raw`
                            INSERT INTO raw_material(unit_id, recycle_type_id, material_id)
                            VALUES (?, ?, ?)
                            `
                    return conn.query(insertRawMaterialQuery, [unit_id, recycle_type_id, material_id])
                        .then( (insertedRaw) => insertedRaw.insertId)
                }
            })
    }
}

module.exports = helpers;