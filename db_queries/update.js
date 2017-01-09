const update = {
    usedMaterial: (pool, usedMaterial) => {
        return pool.getConnection()
            .then( connection => connection.query('UPDATE used_material SET composite_material_id = ?, amount = ?, comment = ? WHERE id = ?',
                [usedMaterial.composite_material_id, usedMaterial.amount, usedMaterial.comment, usedMaterial.id])
            .then( updateInfo => updateInfo.changedRows.toString()))
            .catch( err => console.log(err));
    },

    material: (pool, material) => {
        return pool.getConnection()
            .then( connection => connection.query('UPDATE material SET name = ? WHERE id = ?',
                [material.name, material.id])
            .then( updateInfo => updateInfo.changedRows.toString()))
            .catch( err => console.log(err));
    },

    compositeMaterial: (pool, compositeMaterial) => {
        return pool.getConnection()
            .then( connection => connection.query('UPDATE composite_material SET name = ?, unit_id = ? WHERE id = ?',
                [compositeMaterial.name, compositeMaterial.unit_id, compositeMaterial.id])
                .then( updateInfoCompMaterial => {
                    return Promise.all(compositeMaterial.materialComposition.map(material => {
                        let query =  'UPDATE composite_has_material SET material_id = ?, recycle_class_id = ?, unit_id = ?, amount = ? WHERE (composite_material_id = ? AND material_id = ? AND recycle_class_id = ? AND unit_id = ?)';
                        let inputs = [material.new.material_id, material.new.recycle_class_id, material.new.unit_id, material.new.amount, compositeMaterial.id, material.old.material_id, material.old.recycle_class_id, material.old.unit_id];
                        return connection.query(query, inputs)
                            .then( updateInfoCompHasMaterial => {
                                return updateInfoCompHasMaterial.changedRows;
                            });
                    }))
                        .then((arrChangedRows) => {
                                let sum = arrChangedRows.reduce((sum, changedRows) => changedRows + sum, 0)
                                sum = sum + updateInfoCompMaterial.changedRows;
                                return sum.toString()
                            }
                        )
                })
                .catch( err => console.log(err)));
    }
}

module.exports = update;

