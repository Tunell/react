const insert = {
    usedMaterial: (pool, usedMaterial) => {
        return pool.getConnection()
            .then( connection => connection.query('INSERT INTO used_material (user_id, composite_material_id, amount, comment) VALUES (?, ?, ?, ?)',
                [usedMaterial.user_id, usedMaterial.composite_material_id, usedMaterial.amount, usedMaterial.comment])
            .then( insertInfo => insertInfo.insertId.toString()))
            .catch( err => console.log(err));
    },

    material: (pool, material) => {
        return pool.getConnection()
            .then( connection => connection.query('INSERT INTO material (user_id, name) VALUES (?, ?)',
                [material.user_id, material.name])
            .then( insertInfo => insertInfo.insertId.toString()))
            .catch( err => console.log(err));
    },

    compositeMaterial: (pool, compositeMaterial) => {
        let newCompositeMaterialId;
        return pool.getConnection()
            .then( connection => connection.query('INSERT INTO composite_material (user_id, name, unit_id) VALUES (?, ?, ?)',
                [compositeMaterial.user_id, compositeMaterial.name, compositeMaterial.unit_id])
            .then( insertInfo => {
                newCompositeMaterialId = insertInfo.insertId;
                compositeMaterial.materialComposition.forEach(material =>
                    connection.query('INSERT INTO composite_has_material (composite_material_id, material_id, recycle_class_id, unit_id, amount) VALUES (?, ?, ?, ?, ?)',
                        [newCompositeMaterialId, material.material_id, material.recycle_class_id, material.unit_id, material.amount])
                );
                return newCompositeMaterialId;
            })
            .then(() => newCompositeMaterialId.toString()))
            .catch( err => console.log(err));
        }
}

module.exports = insert;
