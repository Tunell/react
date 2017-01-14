const select = {

    // Standard select query, uses query parameter like id
    selectQuery: (pool, table, query) => {
        return pool.getConnection()
            .then( connection => connection.query('SELECT * FROM ?? WHERE ?', [table, query])
                .then( rows => rows))
    },

    // Standard select query, selects all entries in table
    selectAll: (pool, table) => {
        return pool.getConnection()
            .then( connection => connection.query('SELECT * FROM ??', [table])
                .then( rows => rows))
    },

    // Select query for a single composite material, span several tables
    selectCompositeMaterialId: (pool, id) => {
        return pool.getConnection()
            .then( connection => {
                let query = "SELECT composite_material.id AS id, composite_material.user_id AS user_id, user.name AS user_name, composite_material.name AS composite_material_name, composite_material.unit_id AS composite_material_unit_id, unit_2.name AS composite_material_unit_name, composite_material.created AS created, composite_material.changed AS changed, composite_has_material.material_id AS material_id, material.name AS material_name, composite_has_material.unit_id AS material_unit_id, unit_1.name AS material_unit_name, composite_has_material.recycle_type_id AS material_recycle_type_id, recycle_type.name AS material_recycle_type_name, composite_has_material.amount AS amount FROM composite_material, composite_has_material, recycle_type, unit AS unit_1, material, unit AS unit_2, user WHERE composite_material.id = composite_has_material.composite_material_id AND composite_has_material.recycle_type_id = recycle_type.id AND composite_has_material.unit_id = unit_1.id AND composite_has_material.material_id = material.id AND composite_material.unit_id = unit_2.id AND composite_material.user_id = user.id AND composite_material.id = ?";
                return connection.query(query, [id])
                    .then( rows => createCompMaterials(rows))
            })
    },

    // Select query for all composite material, span several tables
    selectCompositeMaterialAll: (pool) => {
        return pool.getConnection()
            .then( connection => {
                let query = "SELECT composite_material.id AS id, composite_material.user_id AS user_id, user.name AS user_name, composite_material.name AS composite_material_name, composite_material.unit_id AS composite_material_unit_id, unit_2.name AS composite_material_unit_name, composite_material.created AS created, composite_material.changed AS changed, composite_has_material.material_id AS material_id, material.name AS material_name, composite_has_material.unit_id AS material_unit_id, unit_1.name AS material_unit_name, composite_has_material.recycle_type_id AS material_recycle_type_id, recycle_type.name AS material_recycle_type_name, composite_has_material.amount AS amount FROM composite_material, composite_has_material, recycle_type, unit AS unit_1, material, unit AS unit_2, user WHERE composite_material.id = composite_has_material.composite_material_id AND composite_has_material.recycle_type_id = recycle_type.id AND composite_has_material.unit_id = unit_1.id AND composite_has_material.material_id = material.id AND composite_material.unit_id = unit_2.id AND composite_material.user_id = user.id";
                return connection.query(query)
                    .then( rows => createCompMaterials(rows))
            })
    },

    selectUsedMaterialId: (pool, id) => {
        return pool.getConnection()
            .then( connection => connection.query(
                String.raw`
                    SELECT used_material.id, used_material.user_id, user.name AS user_name, composite_material_id, composite_material.name AS composite_material_name, amount, comment
                    FROM used_material, composite_material, user
                    WHERE 
                        used_material.composite_material_id = composite_material.id AND 
                        used_material.user_id = user.id AND
                        used_material.id = ?`, [id])
                .then( rows => rows))
    },

    selectUsedMaterialAll: (pool) => {
        return pool.getConnection()
        .then( connection => connection.query(
        String.raw`
            SELECT used_material.id, used_material.user_id, user.name AS user_name, composite_material_id, composite_material.name AS composite_material_name, amount, comment
            FROM used_material, composite_material, user
            WHERE used_material.composite_material_id = composite_material.id AND used_material.user_id = user.id`)
            .then( rows => rows))
    }


}

// Given a composite-material row, returns if it matches another row.
function findIndexId(compositeMaterial) {
    return compositeMaterial.id === this.id;
}

// Given a db output, creates a composite-material that can be sent to client.
function createCompMaterials(rows){
    let compositeMaterials = []
    rows.forEach( row => {
        let compositeMaterial = {};
        let compositeHasMaterial = createCompHasMaterial(row);
        if(compositeMaterials.length === 0) {
            compositeMaterials.push(createCompMaterial(row, compositeHasMaterial));
        } else {
            let indexOfId = compositeMaterials.findIndex(findIndexId, row);
            if(indexOfId === -1) {
                compositeMaterial = createCompMaterial(row, compositeHasMaterial);
                compositeMaterials.push(compositeMaterial);
            } else {
                compositeMaterials[indexOfId].composite_has_materials.push(compositeHasMaterial);
            }
        }
    })
    return compositeMaterials;
}

// Given a row, extracts data to construct a single compositeHasMaterial object
function createCompHasMaterial(row) {
    let compositeHasMaterial = {
        composite_material_id: row.id,
        material_id: row.material_id,
        material_name: row.material_name,
        recycle_type_id: row.material_recycle_type_id,
        recycle_type_name: row.material_recycle_type_name,
        unit_id: row.material_unit_id,
        unit_name: row.material_unit_name,
        amount: row.amount
    }
    return compositeHasMaterial;
}

// Given a row and a compositeHasMaterial, creates a compositeMaterial with one compositeHasMaterial
function createCompMaterial(row, compositeHasMaterial) {
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
    return compositeMaterial;
}

module.exports = select;

